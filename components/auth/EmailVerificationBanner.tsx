'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, XCircle } from 'lucide-react'

export default function EmailVerificationBanner() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Don't show banner if:
  // - User is not logged in
  // - User has no email
  // - User's email is already verified
  // - Banner was dismissed
  if (!session?.user || 
      !session.user.email || 
      session.user.emailVerified || 
      dismissed) {
    return null
  }

  const handleResendVerification = async () => {
    setIsResending(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email })
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to resend verification email')
      }
    } catch (error) {
      setError('Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Alert className="bg-amber-50 border-amber-200 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <AlertDescription className="text-amber-800 mb-2 sm:mb-0">
          {success ? (
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Verification email sent! Please check your inbox.
            </span>
          ) : (
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-2" /> Not verified
            </span>
          )}
          {error && (
            <span className="flex items-center text-red-600 mt-1">
              <XCircle className="h-4 w-4 mr-1" />
              {error}
            </span>
          )}
        </AlertDescription>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResendVerification}
            disabled={isResending || success}
            className="border-amber-600 text-amber-700 hover:bg-amber-100"
          >
            {isResending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            {success ? 'Sent' : 'Resend'}
          </Button>
          {/*<Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDismissed(true)}
            className="text-amber-700 hover:bg-amber-100"
          >
            Dismiss
          </Button>*/}
        </div>
      </div>
    </Alert>
  )
}