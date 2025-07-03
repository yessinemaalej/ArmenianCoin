'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader2,
  ArrowLeft,
  Mail,
  Smartphone,
  Globe
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

interface LoginHistoryItem {
  id: string
  method: 'EMAIL' | 'WALLET' | 'GOOGLE' | 'GITHUB'
  ipAddress?: string
  userAgent?: string
  success: boolean
  failureReason?: string
  timestamp: string
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export default function LoginHistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch login history
  useEffect(() => {
    if (session?.user?.id) {
      fetchLoginHistory(1)
    }
  }, [session])

  const fetchLoginHistory = async (page: number) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/user/login-history?page=${page}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setLoginHistory(data.loginHistory)
        setPagination(data.pagination)
      } else {
        setError('Failed to load login history')
      }
    } catch (error) {
      setError('Failed to load login history')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    fetchLoginHistory(page)
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'EMAIL':
        return <Mail className="h-4 w-4 text-blue-500" />
      case 'WALLET':
        return <Smartphone className="h-4 w-4 text-amber-500" />
      default:
        return <Globe className="h-4 w-4 text-slate-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
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
          <span>Loading login history...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Login History</h1>
            <p className="text-slate-600 mt-2">View your recent account access activity</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/profile')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Profile</span>
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Login History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Account Access Log</span>
            </CardTitle>
            <CardDescription>
              A record of all login attempts to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loginHistory.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No login history found
              </div>
            ) : (
              <>
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
                            <div className="flex items-center space-x-2">
                              {getMethodIcon(item.method)}
                              <span>{item.method}</span>
                            </div>
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