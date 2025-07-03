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

// GET a specific charity project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.charityProject.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: { name: true }
        },
        updatedBy: {
          select: { name: true }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Charity project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Get charity project error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT (update) a charity project
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

    // Check if project exists
    const existingProject = await prisma.charityProject.findUnique({
      where: { id: params.id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Charity project not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = charityProjectSchema.parse(body)

    // Update project
    const updatedProject = await prisma.charityProject.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        updatedAt: new Date(),
        updatedById: session.user.id
      }
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Update charity project error:', error)
    
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

// DELETE a charity project
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

    // Check if project exists
    const existingProject = await prisma.charityProject.findUnique({
      where: { id: params.id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Charity project not found' },
        { status: 404 }
      )
    }

    // Delete project
    await prisma.charityProject.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Charity project deleted successfully'
    })
  } catch (error) {
    console.error('Delete charity project error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}