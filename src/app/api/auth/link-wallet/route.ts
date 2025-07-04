import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendWalletLinkEmail } from '@/lib/email'
import { SiweMessage } from 'siwe'
import { getAddress } from 'ethers'

export async function POST(request: NextRequest) {
  try {
    console.log('Link wallet API route called')
    
    const session = await getServerSession(authOptions)
    console.log('Session user:', session?.user?.id || 'no session')
    
    if (!session?.user?.id) {
      console.log('Unauthorized: No session user')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { message, signature } = await request.json()
    console.log('Request data:', {
      message: message ? 'present' : 'missing',
      signature: signature ? 'present' : 'missing'
    })

    if (!message || !signature) {
      console.log('Bad request: Missing message or signature')
      return NextResponse.json(
        { error: 'Message and signature are required' },
        { status: 400 }
      )
    }

    // Verify the signature
    console.log('Parsing SIWE message')
    const siwe = new SiweMessage(JSON.parse(message))
    console.log('SIWE message parsed:', {
      address: siwe.address,
      domain: siwe.domain,
      statement: siwe.statement
    })
    
    // Log the address format
    console.log('Address from SIWE message:', siwe.address)
    console.log('Address is checksummed:', siwe.address === getAddress(siwe.address))
    
    console.log('Verifying signature')
    // Verify without any address conversion
    const result = await siwe.verify({ 
      signature
    })

    console.log('Verification result:', result)

    if (!result.success) {
      console.log('Verification failed:', result)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Always use lowercase for wallet addresses in our database
    const walletAddress = siwe.address.toLowerCase()
    console.log('Normalized wallet address (lowercase for DB):', walletAddress)

    // Check if wallet is already linked to another user
    const existingUser = await prisma.user.findFirst({
      where: { walletAddress }
    })

    if (existingUser && existingUser.id !== session.user.id) {
      console.log('Wallet already linked to another user:', existingUser.id)
      return NextResponse.json(
        { error: 'This wallet is already linked to another account' },
        { status: 400 }
      )
    }

    // Get user details for email
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true }
    })
    console.log('User email for notification:', user?.email || 'no email')

    // Link wallet to current user
    console.log('Updating user with wallet address')
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        walletAddress,
        walletVerified: true
      }
    })
    console.log('User updated successfully')

    // Send wallet link email notification
    if (user?.email) {
      try {
        console.log('Sending wallet link email notification')
        await sendWalletLinkEmail(user.email, walletAddress)
        console.log('Email sent successfully')
      } catch (emailError) {
        console.error('Failed to send wallet link email:', emailError)
        // Continue with the process even if email sending fails
      }
    }

    console.log('Wallet linked successfully')
    return NextResponse.json({
      message: 'Wallet linked successfully',
      walletAddress
    })
  } catch (error) {
    console.error('Link wallet error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}