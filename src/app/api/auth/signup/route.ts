import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { sendVerificationEmail, sendWelcomeEmail } from '@/lib/email'
import crypto from 'crypto'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  walletAddress: z.string().optional().nullable()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, walletAddress } = signupSchema.parse(body)

    // Check if user already exists with this email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Check if wallet address is already linked to another account
    if (walletAddress) {
      const existingUserByWallet = await prisma.user.findUnique({
        where: { walletAddress }
      })

      if (existingUserByWallet) {
        return NextResponse.json(
          { error: 'This wallet address is already linked to another account' },
          { status: 400 }
        )
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        walletAddress: walletAddress || null,
        walletVerified: !!walletAddress // Set to true if wallet address is provided
      }
    })

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expires
      }
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken)
      
      // Send welcome email
      await sendWelcomeEmail(email, name || email.split('@')[0])
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Continue with the signup process even if email sending fails
      // In production, you might want to log this to a monitoring service
    }

    return NextResponse.json({
      message: 'Account created successfully. Please check your email to verify your account.',
      userId: user.id
    })
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    // Handle Prisma unique constraint errors
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as any).code === 'P2002'
    ) {
      const target = (error as any).meta?.target;
      if (Array.isArray(target) && target.includes('walletAddress')) {
        return NextResponse.json(
          { error: 'This wallet address is already linked to another account' },
          { status: 400 }
        )
      } else if (Array.isArray(target) && target.includes('email')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}