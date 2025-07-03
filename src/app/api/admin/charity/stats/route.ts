import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validating charity stat data
const charityStatSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(1, 'Label is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().min(1, 'Color is required')
})

// GET all charity stats
export async function GET() {
  try {
    const stats = await prisma.charityStat.findMany({
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Get charity stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST a new charity stat
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
    const validatedData = charityStatSchema.parse(body)

    // Check if key already exists
    const existingStat = await prisma.charityStat.findUnique({
      where: { key: validatedData.key }
    })

    if (existingStat) {
      return NextResponse.json(
        { error: 'A stat with this key already exists' },
        { status: 400 }
      )
    }

    // Create new stat
    const newStat = await prisma.charityStat.create({
      data: validatedData
    })

    return NextResponse.json(newStat)
  } catch (error) {
    console.error('Create charity stat error:', error)
    
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