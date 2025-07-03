import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validating charity project data
const charityProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  amount: z.string().min(1, 'Amount is required'),
  beneficiaries: z.string().min(1, 'Beneficiaries is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['COMPLETED', 'ONGOING', 'PLANNED']),
  image: z.string().min(1, 'Image is required')
})

// GET all charity projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit
    const status = searchParams.get('status')

    const where = status ? { status: status as any } : {}

    const [projects, total] = await Promise.all([
      prisma.charityProject.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit,
        include: {
          createdBy: {
            select: { name: true }
          }
        }
      }),
      prisma.charityProject.count({ where })
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get charity projects error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST a new charity project
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
    const validatedData = charityProjectSchema.parse(body)

    // Create new project
    const newProject = await prisma.charityProject.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        createdById: session.user.id
      }
    })

    return NextResponse.json(newProject)
  } catch (error) {
    console.error('Create charity project error:', error)
    
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