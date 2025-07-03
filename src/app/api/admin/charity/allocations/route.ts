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

// GET all charity allocations
export async function GET() {
  try {
    const allocations = await prisma.charityAllocation.findMany({
      orderBy: { percentage: 'desc' }
    })

    return NextResponse.json(allocations)
  } catch (error) {
    console.error('Get charity allocations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST a new charity allocation
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
    const validatedData = charityAllocationSchema.parse(body)

    // Check if total percentage will exceed 100%
    const existingAllocations = await prisma.charityAllocation.findMany()
    const currentTotal = existingAllocations.reduce((sum: any, allocation: { percentage: any }) => sum + allocation.percentage, 0)
    
    if (currentTotal + validatedData.percentage > 100) {
      return NextResponse.json(
        { error: 'Total allocation percentage cannot exceed 100%' },
        { status: 400 }
      )
    }

    // Create new allocation
    const newAllocation = await prisma.charityAllocation.create({
      data: validatedData
    })

    return NextResponse.json(newAllocation)
  } catch (error) {
    console.error('Create charity allocation error:', error)
    
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