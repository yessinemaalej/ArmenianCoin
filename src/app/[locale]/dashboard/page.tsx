'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Mail, 
  Wallet, 
  Shield, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader2,
  Home,
  Settings,
  CreditCard,
  BarChart,
  Link as LinkIcon
} from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import EmailVerificationBanner from '@/components/auth/EmailVerificationBanner'
import WalletEmailPrompt from '@/components/auth/WalletEmailPrompt'

interface UserProfile {
  id: string
  email?: string
  name?: string
  role: string
  walletAddress?: string
  walletVerified: boolean
  twoFactorEnabled: boolean
  emailVerified?: Date
  createdAt: Date
  lastLoginAt?: Date
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { isConnected, address, balance, chainId } = useWallet()
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch user profile
  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      } else {
        setError('Failed to load profile')
      }
    } catch (error) {
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    return `${parseFloat(balance).toFixed(4)} ETH`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, {profile.name || 'User'}</p>
        </div>

        {/* Email Verification Banner */}
        <EmailVerificationBanner />

        {/* Wallet Email Prompt */}
        <WalletEmailPrompt />

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{profile.name || 'User'}</p>
                    <p className="text-xs text-slate-500">{profile.email || 'No email'}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Badge variant={profile.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                    {profile.role === 'ADMIN' ? (
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
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-amber-700"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => router.push('/profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => router.push('/profile/settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  {profile.role === 'ADMIN' && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => router.push('/admin')}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  )}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome to ArmenianCoin</h2>
                <p className="opacity-90 mb-4">
                  Your account is ready. Explore the features and manage your ARMT tokens.
                </p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-amber-700 hover:bg-amber-50"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy ARMT Tokens
                </Button>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {profile.emailVerified ? 'Verified' : 'Unverified'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Email verification</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Wallet Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {profile.walletAddress ? 'Linked' : 'Not Linked'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {profile.walletAddress 
                      ? formatAddress(profile.walletAddress) 
                      : 'Connect your wallet'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Security Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {profile.twoFactorEnabled ? 'Enhanced' : 'Basic'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {profile.twoFactorEnabled ? '2FA is active' : 'Enable 2FA for better security'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Wallet Info */}
            {isConnected && address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>Connected Wallet</span>
                  </CardTitle>
                  <CardDescription>
                    Your Ethereum wallet information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-500">Address</p>
                      <p className="text-sm font-mono break-all">{address}</p>
                    </div>
                    
                    {balance && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500">Balance</p>
                        <p className="text-slate-900 font-semibold">{formatBalance(balance)}</p>
                      </div>
                    )}
                    
                    {chainId && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500">Network</p>
                        <p className="text-slate-900">
                          {chainId === 1 ? 'Ethereum Mainnet' : `Chain ID: ${chainId}`}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Link wallet button if not already linked */}
                  {!profile.walletAddress && address && (
                    <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Link Wallet to Account
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Activity Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5" />
                  <span>Token Activity</span>
                </CardTitle>
                <CardDescription>
                  Your ARMT token activity and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-500">Token activity data will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}