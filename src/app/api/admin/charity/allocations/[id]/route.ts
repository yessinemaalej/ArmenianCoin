
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validating charity allocation data
const charityAllocationSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  percentage: z.number().min(1).max(100),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required')
})

// GET a specific charity allocation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allocation = await prisma.charityAllocation.findUnique({
      where: { id: params.id }
    })

    if (!allocation) {
      return NextResponse.json(
        { error: 'Charity allocation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(allocation)
  } catch (error) {
    console.error('Get charity allocation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT (update) a charity allocation
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

    // Check if allocation exists
    const existingAllocation = await prisma.charityAllocation.findUnique({
      where: { id: params.id }
    })

    if (!existingAllocation) {
      return NextResponse.json(
        { error: 'Charity allocation not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = charityAllocationSchema.parse(body)

    // Check if total percentage will exceed 100%
    const allAllocations = await prisma.charityAllocation.findMany({
      where: { id: { not: params.id } }
    })
    
    const otherTotal = allAllocations.reduce((sum: any, allocation: { percentage: any }) => sum + allocation.percentage, 0)
    
    if (otherTotal + validatedData.percentage > 100) {
      return NextResponse.json(
        { error: 'Total allocation percentage cannot exceed 100%' },
        { status: 400 }
      )
    }

    // Update allocation
    const updatedAllocation = await prisma.charityAllocation.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(updatedAllocation)
  } catch (error) {
    console.error('Update charity allocation error:', error)
    
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

// DELETE a charity allocation
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

    // Check if allocation exists
    const existingAllocation = await prisma.charityAllocation.findUnique({
      where: { id: params.id }
    })

    if (!existingAllocation) {
      return NextResponse.json(
        { error: 'Charity allocation not found' },
        { status: 404 }
      )
    }

    // Delete allocation
    await prisma.charityAllocation.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Charity allocation deleted successfully'
    })
  } catch (error) {
    console.error('Delete charity allocation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add this export to fix the Vercel build error
export const dynamic = 'force-dynamic'
