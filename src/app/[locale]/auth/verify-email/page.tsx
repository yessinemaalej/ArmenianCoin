'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [isVerifying, setIsVerifying] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Verify token on page load
  useEffect(() => {
    if (!token) {
      setError('Verification token is missing')
      setIsVerifying(false)
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        if (response.ok) {
          setSuccess(true)
        } else {
          const data = await response.json()
          setError(data.error || 'Failed to verify email')
        }
      } catch (error) {
        setError('Failed to verify email')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-400 via-red-500 to-blue-600 p-1 animate-pulse-glow shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="/logonobb.png"
                    alt="ArmenianCoin Logo"
                    width={56}
                    height={56}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Email Verification</h1>
          <p className="text-slate-600">Verifying your email address</p>
        </div>

        <Card>
          {isVerifying ? (
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
              <p className="text-slate-700">Verifying your email address...</p>
            </CardContent>
          ) : success ? (
            <>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Email Verified</span>
                </CardTitle>
                <CardDescription>
                  Your email address has been successfully verified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    Thank you for verifying your email address. Your account is now fully activated.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col space-y-2">
                  <Button asChild>
                    <Link href="/auth/signin">
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">
                      Return to Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  <span>Verification Failed</span>
                </CardTitle>
                <CardDescription>
                  We couldn't verify your email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertDescription>
                    {error || 'The verification link is invalid or has expired. Please request a new verification link.'}
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col space-y-2">
                  <Button asChild>
                    <Link href="/auth/resend-verification">
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/signin">
                      Return to Sign In
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}