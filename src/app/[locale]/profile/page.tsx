'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
  Settings,
  History,
  Edit,
  Save,
  Plus
} from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { SiweMessage } from 'siwe'
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

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const { isConnected, address, connectWallet } = useWallet()
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  
  const [isEditingName, setIsEditingName] = useState(false)
  const [name, setName] = useState('')
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  
  const [isLinkingWallet, setIsLinkingWallet] = useState(false)

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
        setName(data.name || '')
      } else {
        setError('Failed to load profile')
      }
    } catch (error) {
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateName = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    setIsUpdatingName(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setMessage('Name updated successfully')
        setIsEditingName(false)
        
        // Update session
        await update({ name: updatedProfile.name })
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update name')
      }
    } catch (error) {
      setError('Failed to update name')
    } finally {
      setIsUpdatingName(false)
    }
  }

  const handleLinkWallet = async () => {
    if (!isConnected) {
      try {
        await connectWallet()
      } catch (error) {
        setError('Failed to connect wallet')
        return
      }
    }

    if (!address) {
      setError('No wallet address available')
      return
    }

    setIsLinkingWallet(true)
    setError('')
    setMessage('')

    try {
      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Link wallet to ArmenianCoin account',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: Math.random().toString(36).substring(7)
      })

      const messageString = message.prepareMessage()

      // Request signature
      if (!window.ethereum) {
        throw new Error('MetaMask not found')
      }

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [messageString, address]
      })

      // Link wallet
      const response = await fetch('/api/auth/link-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: JSON.stringify(message),
          signature
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update profile
        await fetchProfile()
        
        // Update session
        await update({ walletAddress: data.walletAddress })
        
        setMessage('Wallet linked successfully')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to link wallet')
      }
    } catch (error: any) {
      console.error('Link wallet error:', error)
      setError(error.message || 'Failed to link wallet')
    } finally {
      setIsLinkingWallet(false)
    }
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-600 mt-2">Manage your account information and settings</p>
        </div>

        {/* Email Verification Banner */}
        <EmailVerificationBanner />

        {/* Wallet Email Prompt */}
        <WalletEmailPrompt />

        {/* Messages */}
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Name</Label>
                  {!isEditingName && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditingName(true)}
                      className="h-8 px-2 text-slate-600"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
                
                {isEditingName ? (
                  <div className="flex space-x-2">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1"
                      disabled={isUpdatingName}
                    />
                    <Button 
                      onClick={handleUpdateName} 
                      disabled={isUpdatingName}
                      size="sm"
                    >
                      {isUpdatingName ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditingName(false)
                        setName(profile.name || '')
                      }}
                      disabled={isUpdatingName}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <p className="text-slate-900 font-medium">{profile.name || 'Not set'}</p>
                )}
              </div>

              <Separator />

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                {profile.email ? (
                  <div className="flex items-center space-x-2">
                    <p className="text-slate-900 font-medium">{profile.email}</p>
                    {profile.emailVerified ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <p className="text-slate-500">No email address added</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => router.push('/profile/add-email')}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Email
                    </Button>
                  </div>
                )}
                {!profile.emailVerified && profile.email && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => router.push('/auth/resend-verification')}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Resend Verification Email
                  </Button>
                )}
              </div>

              <Separator />

              {/* Wallet */}
              <div className="space-y-2">
                <Label>Wallet Address</Label>
                {profile.walletAddress ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <p className="text-slate-900 font-mono text-sm break-all">
                        {profile.walletAddress}
                      </p>
                      {profile.walletVerified ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <XCircle className="h-3 w-3 mr-1" />
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-slate-500">No wallet linked to your account</p>
                    <Button 
                      onClick={handleLinkWallet} 
                      disabled={isLinkingWallet}
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                    >
                      {isLinkingWallet ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Wallet className="h-4 w-4 mr-2" />
                      )}
                      Link Wallet
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div>
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
                </div>
                
                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center space-x-2">
                    {profile.twoFactorEnabled ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <XCircle className="h-3 w-3 mr-1" />
                        Disabled
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Created</Label>
                  <p className="text-slate-900">{formatDate(profile.createdAt)}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Last Login</Label>
                  <p className="text-slate-900">{formatDate(profile.lastLoginAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => router.push('/profile/settings')}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
            
            <Button 
              onClick={() => router.push('/profile/login-history')}
              variant="outline"
              className="border-amber-600 text-amber-700 hover:bg-amber-50"
            >
              <History className="h-4 w-4 mr-2" />
              View Login History
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}