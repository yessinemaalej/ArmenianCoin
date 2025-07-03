import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendTwoFactorEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user email
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true }
    })

    if (!user?.email) {
      return NextResponse.json(
        { error: 'User has no email address' },
        { status: 400 }
      )
    }

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString()
    const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Delete any existing 2FA tokens for this user
    await prisma.twoFactorToken.deleteMany({
      where: { userId: session.user.id }
    })

    // Create new 2FA token
    await prisma.twoFactorToken.create({
      data: {
        userId: session.user.id,
        token: code,
        expires
      }
    })

    // Send 2FA email
    try {
      await sendTwoFactorEmail(user.email, code)
    } catch (emailError) {
      console.error('Failed to send 2FA email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send 2FA code' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: '2FA code sent successfully'
    })
  } catch (error) {
    console.error('2FA email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}