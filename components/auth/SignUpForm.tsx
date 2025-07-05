'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Mail, Eye, EyeOff, Loader2, CheckCircle, Wallet } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'
import { useWallet } from '@/contexts/WalletContext'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations } from 'next-intl';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export default function SignUpForm() {
    const t = useTranslations('SignUpPage');

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [linkWallet, setLinkWallet] = useState(false)
  
  const router = useRouter()
  const { isConnected, address, connectWallet, isConnecting } = useWallet()

  // Handle wallet connection when linkWallet is toggled
  useEffect(() => {
    const handleWalletConnection = async () => {
      if (linkWallet && !isConnected && !isConnecting) {
        try {
          await connectWallet();
        } catch (error) {
          console.error("Wallet connection error:", error);
          setError('Failed to connect wallet. Please try again.');
          setLinkWallet(false);
        }
      }
    };

    handleWalletConnection();
  }, [linkWallet, isConnected, isConnecting, connectWallet]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate form data
      const formData = { name, email, password, confirmPassword }
      signupSchema.parse(formData)

      // Check if wallet should be linked but isn't connected
      if (linkWallet && !isConnected) {
        try {
          await connectWallet();
        } catch (error) {
          throw new Error('Failed to connect wallet. Please try again or disable wallet linking.');
        }
      }

      // Get wallet address and convert to lowercase if available
      const walletAddressToUse = linkWallet && isConnected && address 
        ? address.toLowerCase() 
        : null;

      // Submit to API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          password,
          walletAddress: walletAddressToUse
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

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

 if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <span>{t('accountCreated')}</span>
          </CardTitle>
          <CardDescription>
            {t('accountCreatedDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              {t('verificationSent', { email })}
            </AlertDescription>
          </Alert>
          <div className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="/auth/signin">
                {t('signIn')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                {t('returnHome')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
 <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>{t('signUp')}</span>
        </CardTitle>
        <CardDescription>
          {t('signUpDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
 <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          {/* Wallet Linking Option */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="linkWallet"
              checked={linkWallet}
              onCheckedChange={(checked) => setLinkWallet(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="linkWallet" className="text-sm cursor-pointer">
              <div className="flex items-center">
                <Wallet className="h-4 w-4 mr-1 text-amber-600" />
                {t('linkWallet')}
              </div>
            </Label>
          </div>

         {linkWallet && !isConnected && (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertDescription className="text-amber-800">
                {isConnecting ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t('connectingWallet')}
                  </div>
                ) : (
                  <>
                    {t('connectWalletPrompt')}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 border-amber-600 text-amber-700"
                      onClick={connectWallet}
                    >
                      <Wallet className="h-4 w-4 mr-1" />
                      {t('connectWallet')}
                    </Button>
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}
          {linkWallet && isConnected && address && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                {t('walletConnected', { address: `${address.slice(0, 6)}...${address.slice(-4)}` })}
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || (linkWallet && !isConnected && !isConnecting)}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('createAccount')}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/auth/signin" className="text-amber-600 hover:underline">
            {t('signIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}