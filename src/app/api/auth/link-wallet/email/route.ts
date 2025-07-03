import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendWalletLinkEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
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

    // Send wallet link email
    try {
      await sendWalletLinkEmail(user.email, walletAddress)
    } catch (emailError) {
      console.error('Failed to send wallet link email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send wallet link notification' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Wallet link notification sent successfully'
    })
  } catch (error) {
    console.error('Wallet link email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}