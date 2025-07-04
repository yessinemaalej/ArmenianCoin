'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Filter, 
  ArrowLeft, 
  User, 
  Mail, 
  Wallet, 
  Shield, 
  CheckCircle, 
  XCircle,
  Loader2
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

export default function AdminUsersPage() {
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
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the search term to the API
    // For now, we'll just filter the users client-side
    console.log('Searching for:', searchTerm)
  }

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value)
    // In a real app, you would send the filter to the API
    // For now, we'll just log it
    console.log('Filtering by role:', value)
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading users...</span>
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
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
              <p className="text-slate-600 mt-1">View and manage user accounts</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="USER">Users</SelectItem>
                    <SelectItem value="ADMIN">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Accounts</span>
            </CardTitle>
            <CardDescription>
              Total users: {pagination.total}
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
                        <TableHead>Email</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>2FA</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{user.name || 'Unnamed'}</p>
                                <p className="text-xs text-slate-500">{user.id.substring(0, 8)}...</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                              {user.role === 'ADMIN' ? (
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
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{user.email || 'No email'}</span>
                              {user.email && (
                                user.emailVerified ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )
                              )}
                            </div>
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
                            {formatDate(user.createdAt)}
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

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                            className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                          .filter(page => {
                            // Show current page, first, last, and pages around current
                            return page === 1 || 
                                  page === pagination.pages || 
                                  Math.abs(page - pagination.page) <= 1
                          })
                          .map((page, i, array) => {
                            // Add ellipsis
                            if (i > 0 && page - array[i - 1] > 1) {
                              return (
                                <PaginationItem key={`ellipsis-${page}`}>
                                  <span className="px-4">...</span>
                                </PaginationItem>
                              )
                            }
                            
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  isActive={page === pagination.page}
                                  onClick={() => handlePageChange(page)}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
                            className={pagination.page >= pagination.pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}