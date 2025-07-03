'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Wallet, ArrowRight } from 'lucide-react'

export default function WalletEmailPrompt() {
  const { data: session } = useSession()
  const router = useRouter()
  const [dismissed, setDismissed] = useState(false)
  
  // Check if this component should be shown
  const shouldShow = session?.user?.walletAddress && !session?.user?.email && !dismissed

  // Store dismissal in localStorage
  useEffect(() => {
    if (dismissed) {
      localStorage.setItem('walletEmailPromptDismissed', 'true')
    }
  }, [dismissed])

  // Check if previously dismissed
  useEffect(() => {
    const wasDismissed = localStorage.getItem('walletEmailPromptDismissed')
    if (wasDismissed === 'true') {
      setDismissed(true)
    }
  }, [])

  if (!shouldShow) {
    return null
  }

  return (
    <Card className="mb-6 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-amber-800">
          <Wallet className="h-5 w-5 mr-2" />
          Add Email to Your Wallet Account
        </CardTitle>
        <CardDescription className="text-amber-700">
          Secure your account and enable additional features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="bg-white border-amber-200 mb-4">
          <AlertDescription className="text-slate-700">
            Your account is currently accessible only via your wallet. Adding an email address will:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Allow you to recover your account if you lose access to your wallet</li>
              <li>Enable important security notifications</li>
              <li>Let you receive updates about your account and transactions</li>
            </ul>
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={() => setDismissed(true)}
            className="border-amber-600 text-amber-700 hover:bg-amber-100"
          >
            Remind Me Later
          </Button>
          <Button 
            onClick={() => router.push('/profile/add-email')}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            Add Email Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}