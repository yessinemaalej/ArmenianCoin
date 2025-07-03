import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validating charity stat data
const charityStatSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required')
})

// GET a specific charity stat
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stat = await prisma.charityStat.findUnique({
      where: { id: params.id }
    })

    if (!stat) {
      return NextResponse.json(
        { error: 'Charity stat not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(stat)
  } catch (error) {
    console.error('Get charity stat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT (update) a charity stat
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

    // Check if stat exists
    const existingStat = await prisma.charityStat.findUnique({
      where: { id: params.id }
    })

    if (!existingStat) {
      return NextResponse.json(
        { error: 'Charity stat not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = charityStatSchema.parse(body)

    // Update stat
    const updatedStat = await prisma.charityStat.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(updatedStat)
  } catch (error) {
    console.error('Update charity stat error:', error)
    
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

// DELETE a charity stat
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

    // Check if stat exists
    const existingStat = await prisma.charityStat.findUnique({
      where: { id: params.id }
    })

    if (!existingStat) {
      return NextResponse.json(
        { error: 'Charity stat not found' },
        { status: 404 }
      )
    }

    // Delete stat
    await prisma.charityStat.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Charity stat deleted successfully'
    })
  } catch (error) {
    console.error('Delete charity stat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}