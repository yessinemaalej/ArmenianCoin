'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { XCircle, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  useEffect(() => {
    const error = searchParams.get('error')
    
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setErrorMessage('Invalid email or password. Please try again.')
          break
        case 'OAuthAccountNotLinked':
          setErrorMessage('This account is already linked to another sign-in method.')
          break
        case 'OAuthSignInError':
          setErrorMessage('Error signing in with this provider. Please try again.')
          break
        case 'OAuthCallbackError':
          setErrorMessage('Error during authentication callback. Please try again.')
          break
        case 'AccessDenied':
          setErrorMessage('Access denied. You do not have permission to access this resource.')
          break
        case 'Verification':
          setErrorMessage('The verification token is invalid or has expired.')
          break
        default:
          setErrorMessage('An unexpected authentication error occurred. Please try again.')
      }
    } else {
      setErrorMessage('An unexpected authentication error occurred. Please try again.')
    }
  }, [searchParams])

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Authentication Error</h1>
          <p className="text-slate-600">There was a problem with your sign-in attempt</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <XCircle className="h-5 w-5" />
              <span>Sign In Failed</span>
            </CardTitle>
            <CardDescription>
              We encountered an error during authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/auth/signin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Return to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}