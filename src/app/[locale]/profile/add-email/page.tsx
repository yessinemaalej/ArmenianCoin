'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

export default function AddEmailPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate email
      emailSchema.parse({ email })

      // Submit to API
      const response = await fetch('/api/user/add-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add email')
      }

      // Update session with new email
      await update({ email })

      // Show success message
      setSuccess(true)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      } else if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-400 via-red-500 to-blue-600 p-1 animate-pulse-glow shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="ArmenianToken Logo"
                    width={56}
                    height={56}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add Email Address</h1>
          <p className="text-slate-600">Connect an email to your wallet-based account</p>
        </div>

        <Card>
          {success ? (
            <>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Verification Email Sent</span>
                </CardTitle>
                <CardDescription>
                  Please check your inbox to verify your email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    We've sent a verification email to <strong>{email}</strong>. 
                    Please check your inbox and click the verification link to complete the process.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col space-y-2">
                  <Button onClick={() => router.push('/profile')} className="w-full">
                    Return to Profile
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Add Email Address</span>
                </CardTitle>
                <CardDescription>
                  Adding an email allows you to recover your account and receive important notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col space-y-2">
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Add Email
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => router.push('/profile')}
                      className="w-full"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Profile
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}