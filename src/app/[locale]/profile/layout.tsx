import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Profile - ArmenianCoin',
  description: 'Manage your ArmenianCoin account'
}

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check
  const session = await getServerSession(authOptions)
  
  // If user is not authenticated, redirect to sign in
  if (!session) {
    redirect('/auth/signin')
  }

  return <>{children}</>
}