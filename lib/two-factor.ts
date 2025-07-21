import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { prisma } from './prisma'
import crypto from 'crypto'

export async function generateTwoFactorSecret(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const secret = speakeasy.generateSecret({
    name: `ArmenianToken (${user.email || user.name})`,
    issuer: 'ArmenianToken',
    length: 32
  })

  // Generate backup codes
  const backupCodes = Array.from({ length: 10 }, () => 
    crypto.randomBytes(4).toString('hex').toUpperCase()
  )

  // Store secret (but don't enable 2FA yet)
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorSecret: secret.base32,
      twoFactorBackupCodes: backupCodes
    }
  })

  // Generate QR code
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!)

  return {
    secret: secret.base32,
    qrCode: qrCodeUrl,
    backupCodes
  }
}

export async function enableTwoFactor(userId: string, token: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { twoFactorSecret: true }
  })

  if (!user?.twoFactorSecret) {
    throw new Error('2FA secret not found')
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token,
    window: 2
  })

  if (!verified) {
    throw new Error('Invalid 2FA code')
  }

  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorEnabled: true }
  })

  return true
}

export async function disableTwoFactor(userId: string, token: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { twoFactorSecret: true, twoFactorBackupCodes: true }
  })

  if (!user?.twoFactorSecret) {
    throw new Error('2FA not enabled')
  }

  // Verify with either TOTP or backup code
  const totpValid = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token,
    window: 2
  })

  const backupCodeValid = user.twoFactorBackupCodes.includes(token.toUpperCase())

  if (!totpValid && !backupCodeValid) {
    throw new Error('Invalid 2FA code')
  }

  // If backup code was used, remove it
  let updatedBackupCodes = user.twoFactorBackupCodes
  if (backupCodeValid) {
    updatedBackupCodes = user.twoFactorBackupCodes.filter((code: string) => code !== token.toUpperCase())
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: false,
      twoFactorSecret: null,
      twoFactorBackupCodes: updatedBackupCodes
    }
  })

  return true
}

export async function verifyTwoFactorCode(userId: string, token: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { twoFactorSecret: true, twoFactorBackupCodes: true }
  })

  if (!user?.twoFactorSecret) {
    return false
  }

  // Try TOTP first
  const totpValid = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token,
    window: 2
  })

  if (totpValid) {
    return true
  }

  // Try backup codes
  const backupCodeValid = user.twoFactorBackupCodes.includes(token.toUpperCase())
  
  if (backupCodeValid) {
    // Remove used backup code
    const updatedBackupCodes = user.twoFactorBackupCodes.filter(
        (      code: string) => code !== token.toUpperCase()
    )
    
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorBackupCodes: updatedBackupCodes }
    })
    
    return true
  }

  return false
}