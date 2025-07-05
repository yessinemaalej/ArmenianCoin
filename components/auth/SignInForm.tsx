'use client'

import { useState } from 'react'
import { signIn, getSession, getCsrfToken } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Wallet, Mail, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { SiweMessage } from 'siwe'
import { useWallet } from '@/contexts/WalletContext'
import { getAddress } from 'ethers'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWalletLoading, setIsWalletLoading] = useState(false)
  const [error, setError] = useState('')
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false)
  
  const router = useRouter()
  const { connectWallet, address, isConnected } = useWallet()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('Attempting email sign in with:', { email, password: '***', twoFactorCode: twoFactorCode || 'none' })
      
      const result = await signIn('credentials', {
        email,
        password,
        twoFactorCode,
        redirect: false
      })

      console.log('Email sign in result:', result)

      if (result?.error) {
        if (result.error === '2FA code required') {
          setNeedsTwoFactor(true)
        } else {
          setError(result.error)
        }
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Email sign in error:', error)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletSignIn = async () => {
    setIsWalletLoading(true)
    setError('')

    try {
const walletAddress = isConnected ? address : await connectWallet()
if (!walletAddress) throw new Error('No wallet address available')



console.log('Original wallet address:', walletAddress)


      console.log('Original wallet address:', walletAddress)
      
      // Format address using EIP-55 checksum
      const checksummedAddress = getAddress(walletAddress)
      console.log('Checksummed address (EIP-55):', checksummedAddress)
      
      // Get CSRF token for nonce
      const csrfToken = await getCsrfToken()
      console.log('CSRF token for nonce:', csrfToken)
      
      // Create SIWE message with checksummed address
      const message = new SiweMessage({
        domain: window.location.host,
        address: checksummedAddress, // Use checksummed address
        statement: 'Sign in to ArmenianCoin',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: csrfToken || Math.random().toString(36).substring(7)
      })

      console.log('SIWE message created:', {
        domain: message.domain,
        address: message.address,
        statement: message.statement,
        uri: message.uri,
        version: message.version,
        chainId: message.chainId,
        nonce: message.nonce
      })

      const messageString = message.prepareMessage()
      console.log('Prepared message string:', messageString)

      // Request signature
      if (!window.ethereum) {
        console.error('MetaMask not found')
        throw new Error('MetaMask not found')
      }

      console.log('Requesting signature from address:', checksummedAddress)
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [messageString, walletAddress] // Use original address for signing
      })
      console.log('Signature received:', signature.substring(0, 20) + '...')

      // Sign in with SIWE
      console.log('Signing in with SIWE message and signature')
      const result = await signIn('ethereum', {
        message: JSON.stringify(message),
        signature,
        redirect: false
      })

      console.log('Wallet sign in result:', result)

      if (result?.error) {
        console.error('Sign in error from server:', result.error)
        setError(result.error)
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Wallet sign in error:', error)
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        type: error.type,
        expected: error.expected,
        received: error.received
      })
      setError(error.message || 'Failed to sign in with wallet')
    } finally {
      setIsWalletLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Email Sign In */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Sign In with Email</span>
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
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

            {needsTwoFactor && (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">2FA Code</Label>
                <Input
                  id="twoFactorCode"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link href="/auth/forgot-password" className="text-amber-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Wallet Sign In */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Sign In with Wallet</span>
          </CardTitle>
          <CardDescription>
            Connect your MetaMask wallet to sign in securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleWalletSignIn} 
            className="w-full" 
            variant="outline"
            disabled={isWalletLoading}
          >
            {isWalletLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Wallet className="mr-2 h-4 w-4" />
            {isConnected ? 'Sign In with Wallet' : 'Connect Wallet'}
          </Button>
        </CardContent>
      </Card>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-amber-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}