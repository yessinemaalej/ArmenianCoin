'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  User, 
  Mail, 
  Wallet, 
  Shield, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader2,
  UserCog
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserData {
  id: string
  email?: string
  name?: string
  role: string
  walletAddress?: string
  walletVerified: boolean
  twoFactorEnabled: boolean
  emailVerified?: Date | null
  createdAt: Date
  lastLoginAt?: Date | null
}

interface LoginHistoryItem {
  id: string
  method: 'EMAIL' | 'WALLET' | 'GOOGLE' | 'GITHUB'
  ipAddress?: string
  userAgent?: string
  success: boolean
  failureReason?: string
  timestamp: string
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userId = params.id
  
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('')

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/profile')
    }
  }, [status, session, router])

  // Fetch user data
  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchUserData()
    }
  }, [session, userId])

  const fetchUserData = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
        setLoginHistory(data.loginHistory)
        setSelectedRole(data.user.role)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to load user data')
      }
    } catch (error) {
      setError('Failed to load user data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleChange = async (role: string) => {
    setIsUpdating(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUserData(updatedUser)
        setMessage(`User role updated to ${role}`)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update user role')
      }
    } catch (error) {
      setError('Failed to update user role')
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user data...</span>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN' || !userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserCog className="h-8 w-8 text-amber-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">User Details</h1>
              <p className="text-slate-600 mt-1">
                {userData.name || 'Unnamed User'} ({userData.email || 'No email'})
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Admin</span>
          </Button>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>User Profile</span>
                </CardTitle>
                <CardDescription>
                  User account details and verification status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">User ID</p>
                    <p className="text-sm font-mono break-all">{userData.id}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Name</p>
                    <p className="text-slate-900">{userData.name || 'Not set'}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-slate-900">{userData.email || 'Not set'}</p>
                      {userData.emailVerified ? (
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
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Role</p>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={selectedRole}
                        onValueChange={handleRoleChange}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Wallet */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Wallet Address</p>
                  {userData.walletAddress ? (
                    <div className="flex items-center space-x-2">
                      <p className="text-slate-900 font-mono text-sm break-all">
                        {userData.walletAddress}
                      </p>
                      {userData.walletVerified ? (
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
                  ) : (
                    <p className="text-slate-500">No wallet linked</p>
                  )}
                </div>

                <Separator />

                {/* Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Two-Factor Authentication</p>
                    <div className="flex items-center space-x-2">
                      {userData.twoFactorEnabled ? (
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
                    <p className="text-sm font-medium text-slate-500">Account Created</p>
                    <p className="text-slate-900">{formatDate(userData.createdAt)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Last Login</p>
                    <p className="text-slate-900">{formatDate(userData.lastLoginAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Email Verified</span>
                  {userData.emailVerified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Wallet Linked</span>
                  {userData.walletAddress ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">2FA Enabled</span>
                  {userData.twoFactorEnabled ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Admin Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-amber-700 border-amber-200 hover:bg-amber-50"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Password Reset
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-blue-700 border-blue-200 hover:bg-blue-50"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify Email
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Disable Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login History */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Login Activity</span>
              </CardTitle>
              <CardDescription>
                Last 10 login attempts for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loginHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No login history found
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {formatDate(item.timestamp)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {item.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item.ipAddress || 'Unknown'}
                          </TableCell>
                          <TableCell>
                            {item.success ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Success
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.failureReason || 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}