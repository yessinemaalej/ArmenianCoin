import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { z } from 'zod'

// This is a special endpoint that should be removed in production
// It's only for initial admin setup
const adminSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  secretKey: z.string() // A secret key to prevent unauthorized admin creation
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, secretKey } = adminSchema.parse(body)

    // Verify secret key - this should be a strong, unique value
    // In production, you would use an environment variable
    if (secretKey !== 'armenian_coin_nextauth_secret_key_2025') {
      return NextResponse.json(
        { error: 'Invalid secret key' },
        { status: 403 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      // If user exists but is not admin, update to admin
      if (existingUser.role !== 'ADMIN') {
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'ADMIN' }
        })
        
        return NextResponse.json({
          message: 'User updated to admin successfully',
          userId: updatedUser.id
        })
      }
      
      return NextResponse.json(
        { error: 'Admin user with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
        emailVerified: new Date() // Auto-verify admin email
      }
    })

    return NextResponse.json({
      message: 'Admin account created successfully',
      userId: user.id
    })
  } catch (error) {
    console.error('Admin creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}