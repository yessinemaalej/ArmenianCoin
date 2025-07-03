'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Shield, 
  Loader2,
  CheckCircle, 
  XCircle,
  User,
  Wallet,
  Heart,
  Settings,
  BarChart,
  Database
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [users, setUsers] = useState<UserData[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/profile')
    }
  }, [status, session, router])

  // Fetch users
  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchUsers(1)
    }
  }, [session])

  const fetchUsers = async (page: number) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/users?page=${page}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setPagination(data.pagination)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to load users')
      }
    } catch (error) {
      setError('Failed to load users')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    fetchUsers(page)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading admin panel...</span>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          </div>
          <p className="text-slate-600 mt-2">Manage users, charity data, and system settings</p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Admin Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">View and manage user accounts, roles, and permissions</p>
              <Button 
                onClick={() => router.push('/admin/users')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Charity Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Manage charity projects, statistics, partners, and allocations</p>
              <Button 
                onClick={() => router.push('/admin/charity')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                Manage Charity Data
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Settings className="h-5 w-5 text-slate-600" />
                <span>System Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Configure system settings, security, and site preferences</p>
              <Button 
                onClick={() => router.push('/admin/settings')}
                className="w-full"
              >
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Users</p>
                  <p className="text-3xl font-bold text-slate-900">{pagination.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Admins</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {users.filter(user => user.role === 'ADMIN').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Wallet Users</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {users.filter(user => user.walletAddress).length}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-amber-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">2FA Enabled</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {users.filter(user => user.twoFactorEnabled).length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start text-left h-auto py-3"
                  onClick={() => router.push('/admin/charity')}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-red-600" />
                      <span className="font-medium">Manage Charity</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 ml-6">
                      Update projects and impact data
                    </span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start text-left h-auto py-3"
                  onClick={() => router.push('/admin/users')}
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">Manage Users</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 ml-6">
                      View and edit user accounts
                    </span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start text-left h-auto py-3"
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">Database</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 ml-6">
                      Manage database and backups
                    </span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start text-left h-auto py-3"
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-slate-600" />
                      <span className="font-medium">Site Settings</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 ml-6">
                      Configure global settings
                    </span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Admin Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .filter(user => user.role === 'ADMIN')
                      .slice(0, 3)
                      .map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell className="font-medium">{admin.name || 'Unnamed'}</TableCell>
                          <TableCell>{admin.email || 'No email'}</TableCell>
                          <TableCell>
                            {admin.lastLoginAt 
                              ? new Date(admin.lastLoginAt).toLocaleDateString() 
                              : 'Never'}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Recent Users</span>
            </CardTitle>
            <CardDescription>
              View and manage recent user accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No users found
              </div>
            ) : (
              <>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>2FA</TableHead>
                        <TableHead>Email Verified</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.slice(0, 5).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.name || 'Unnamed'}</span>
                              <span className="text-xs text-slate-500">{user.email || 'No email'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.walletAddress ? (
                              <div className="flex items-center space-x-1">
                                <Wallet className="h-3 w-3 text-green-600" />
                                <span className="text-xs font-mono">
                                  {`${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-500">Not linked</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.twoFactorEnabled ? (
                              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                            ) : (
                              <Badge variant="outline">Disabled</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.emailVerified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => router.push(`/admin/users/${user.id}`)}
                            >
                              <User className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button 
                    onClick={() => router.push('/admin/users')}
                    variant="outline"
                  >
                    View All Users
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}