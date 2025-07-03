import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Admin Panel - ArmenianCoin',
  description: 'ArmenianCoin administration dashboard'
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check
  const session = await getServerSession(authOptions)
  
  // If user is not authenticated or not an admin, redirect
  if (!session) {
    redirect('/auth/signin')
  }
  
  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return <>{children}</>
}