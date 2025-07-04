import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validating charity partner data
const charityPartnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  focus: z.string().min(1, 'Focus is required'),
  established: z.string().min(1, 'Established year is required'),
  description: z.string().min(1, 'Description is required')
})

// GET all charity partners
export async function GET() {
  try {
    const partners = await prisma.charityPartner.findMany({
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error('Get charity partners error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST a new charity partner
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = charityPartnerSchema.parse(body)

    // Create new partner
    const newPartner = await prisma.charityPartner.create({
      data: validatedData
    })

    return NextResponse.json(newPartner)
  } catch (error) {
    console.error('Create charity partner error:', error)
    
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