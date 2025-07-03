'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut, Shield, Wallet, ChevronDown, Home, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useWallet } from '@/contexts/WalletContext'

export default function ProfileButton() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { disconnectWallet } = useWallet()
  const [isSigningOut, setIsSigningOut] = useState(false)

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse" />
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      // Disconnect wallet if connected
      disconnectWallet()
      
      // Sign out from NextAuth
      await signOut({ redirect: false })
      
      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border-2 border-amber-200 hover:border-amber-400 transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
            <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-white text-sm font-semibold">
              {session.user?.name ? getInitials(session.user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name || 'User'}
            </p>
            {session.user?.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            )}
            {session.user?.walletAddress && (
              <p className="text-xs leading-none text-muted-foreground flex items-center">
                <Wallet className="h-3 w-3 mr-1" />
                {formatAddress(session.user.walletAddress)}
              </p>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                session.user?.role === 'ADMIN' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {session.user?.role === 'ADMIN' ? (
                  <>
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </>
                ) : (
                  <>
                    <User className="h-3 w-3 mr-1" />
                    User
                  </>
                )}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
          <Home className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => router.push('/profile/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/profile/login-history')} className="cursor-pointer">
          <History className="mr-2 h-4 w-4" />
          <span>Login History</span>
        </DropdownMenuItem>

        {session.user?.role === 'ADMIN' && (
          <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer">
            <Shield className="mr-2 h-4 w-4" />
            <span>Admin Panel</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600" disabled={isSigningOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

