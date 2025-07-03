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

// GET a specific charity partner
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const partner = await prisma.charityPartner.findUnique({
      where: { id: params.id }
    })

    if (!partner) {
      return NextResponse.json(
        { error: 'Charity partner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(partner)
  } catch (error) {
    console.error('Get charity partner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT (update) a charity partner
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if partner exists
    const existingPartner = await prisma.charityPartner.findUnique({
      where: { id: params.id }
    })

    if (!existingPartner) {
      return NextResponse.json(
        { error: 'Charity partner not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = charityPartnerSchema.parse(body)

    // Update partner
    const updatedPartner = await prisma.charityPartner.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(updatedPartner)
  } catch (error) {
    console.error('Update charity partner error:', error)
    
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

// DELETE a charity partner
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if partner exists
    const existingPartner = await prisma.charityPartner.findUnique({
      where: { id: params.id }
    })

    if (!existingPartner) {
      return NextResponse.json(
        { error: 'Charity partner not found' },
        { status: 404 }
      )
    }

    // Delete partner
    await prisma.charityPartner.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Charity partner deleted successfully'
    })
  } catch (error) {
    console.error('Delete charity partner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}