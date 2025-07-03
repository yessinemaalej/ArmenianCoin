import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all charity data for public display
export async function GET() {
  try {
    console.log('Charity API route called')
    
    // Fetch all charity data in parallel
    const [stats, projects, partners, allocations] = await Promise.all([
      prisma.charityStat.findMany({
        orderBy: { createdAt: 'asc' }
      }),
      prisma.charityProject.findMany({
        orderBy: { date: 'desc' },
        take: 4 // Limit to most recent projects
      }),
      prisma.charityPartner.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.charityAllocation.findMany({
        orderBy: { percentage: 'desc' }
      })
    ]);

    console.log('Charity data fetched successfully:', {
      statsCount: stats.length,
      projectsCount: projects.length,
      partnersCount: partners.length,
      allocationsCount: allocations.length
    });

    return NextResponse.json({
      stats,
      projects,
      partners,
      allocations
    })
  } catch (error) {
    console.error('Get charity data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}