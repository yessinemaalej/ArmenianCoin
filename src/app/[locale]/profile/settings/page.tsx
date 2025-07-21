'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl';

import { 
  Shield, 
  Key, 
  Smartphone, 
  Eye, 
  EyeOff,
  CheckCircle, 
  XCircle,
  Loader2,
  Copy,
  Download,
  User,
  Wallet,
  Bell,
  Languages,
  Clock,
  ArrowLeft,
  Mail
} from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { SiweMessage } from 'siwe'

interface TwoFactorSetup {
  secret: string
  qrCode: string
  backupCodes: string[]
}

interface UserProfile {
  id: string
  email?: string
  name?: string
  role: string
  walletAddress?: string
  walletVerified: boolean
  twoFactorEnabled: boolean
  emailVerified?: Date
  createdAt: Date
  lastLoginAt?: Date
}

export default function SettingsPage() {
  const t = useTranslations('SettingsPage');
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const { isConnected, address, connectWallet } = useWallet()
  
  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [name, setName] = useState('')
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [twoFactorSetup, setTwoFactorSetup] = useState<TwoFactorSetup | null>(null)
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [isSettingUp2FA, setIsSettingUp2FA] = useState(false)
  const [isEnabling2FA, setIsEnabling2FA] = useState(false)
  const [isDisabling2FA, setIsDisabling2FA] = useState(false)
  
  // Wallet state
  const [isLinkingWallet, setIsLinkingWallet] = useState(false)
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false)
  
  // UI state
  const [activeTab, setActiveTab] = useState('account')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch user profile
  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setName(data.name || '')
        setTwoFactorEnabled(data.twoFactorEnabled)
        
        // Set notification preferences (in a real app, these would come from the API)
        // For now, we'll use default values
        setEmailNotifications(true)
        setSecurityAlerts(true)
        setMarketingEmails(false)
      } else {
        setError('Failed to load profile')
      }
    } catch (error) {
      setError('Failed to load profile')
    }
  }

  const handleUpdateName = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    setIsUpdatingName(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setMessage('Name updated successfully')
        
        // Update session
        await update({ name: updatedProfile.name })
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update name')
      }
    } catch (error) {
      setError('Failed to update name')
    } finally {
      setIsUpdatingName(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return
    }

    setIsChangingPassword(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      })

      if (response.ok) {
        setMessage('Password changed successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to change password')
      }
    } catch (error) {
      setError('Failed to change password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleSetup2FA = async () => {
    setIsSettingUp2FA(true)
    setError('')

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST'
      })

      if (response.ok) {
        const data = await response.json()
        setTwoFactorSetup(data)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to setup 2FA')
      }
    } catch (error) {
      setError('Failed to setup 2FA')
    } finally {
      setIsSettingUp2FA(false)
    }
  }

  const handleEnable2FA = async () => {
    if (!twoFactorCode) {
      setError('Please enter the 6-digit code from your authenticator app')
      return
    }

    setIsEnabling2FA(true)
    setError('')

    try {
      const response = await fetch('/api/auth/2fa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: twoFactorCode })
      })

      if (response.ok) {
        setMessage('2FA enabled successfully')
        setTwoFactorEnabled(true)
        setTwoFactorSetup(null)
        setTwoFactorCode('')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to enable 2FA')
      }
    } catch (error) {
      setError('Failed to enable 2FA')
    } finally {
      setIsEnabling2FA(false)
    }
  }

  const handleDisable2FA = async () => {
    if (!twoFactorCode) {
      setError('Please enter your 2FA code or backup code')
      return
    }

    setIsDisabling2FA(true)
    setError('')

    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: twoFactorCode })
      })

      if (response.ok) {
        setMessage('2FA disabled successfully')
        setTwoFactorEnabled(false)
        setTwoFactorCode('')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to disable 2FA')
      }
    } catch (error) {
      setError('Failed to disable 2FA')
    } finally {
      setIsDisabling2FA(false)
    }
  }

  const handleLinkWallet = async () => {
    if (!isConnected) {
      try {
        await connectWallet()
      } catch (error) {
        setError('Failed to connect wallet')
        return
      }
    }

    if (!address) {
      setError('No wallet address available')
      return
    }

    setIsLinkingWallet(true)
    setError('')
    setMessage('')

    try {
      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Link wallet to ArmenianToken account',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: Math.random().toString(36).substring(7)
      })

      const messageString = message.prepareMessage()

      // Request signature
      if (!window.ethereum) {
        throw new Error('MetaMask not found')
      }

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [messageString, address]
      })

      // Link wallet
      const response = await fetch('/api/auth/link-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: JSON.stringify(message),
          signature
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update profile
        await fetchProfile()
        
        // Update session
        await update({ walletAddress: data.walletAddress })
        
        setMessage('Wallet linked successfully')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to link wallet')
      }
    } catch (error: any) {
      console.error('Link wallet error:', error)
      setError(error.message || 'Failed to link wallet')
    } finally {
      setIsLinkingWallet(false)
    }
  }

  const handleUpdatePreferences = async () => {
    setIsUpdatingPreferences(true)
    setError('')
    setMessage('')

    // In a real app, you would send these preferences to the server
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      setMessage('Notification preferences updated successfully')
      setIsUpdatingPreferences(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setMessage('Copied to clipboard')
  }

  const downloadBackupCodes = () => {
    if (!twoFactorSetup?.backupCodes) return
    
    const content = `ArmenianToken 2FA Backup Codes\n\nGenerated: ${new Date().toISOString()}\n\n${twoFactorSetup.backupCodes.join('\n')}\n\nKeep these codes safe! Each code can only be used once.`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'armeniancoin-backup-codes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t('accountSettings')}</h1>
            <p className="text-slate-600 mt-2">{t('manageAccount')}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/profile')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('backToProfile')}</span>
          </Button>
        </div>

        {/* Messages */}
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Settings Tabs */}
        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{t('account')}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>{t('security')}</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center space-x-2">
              <Wallet className="h-4 w-4" />
              <span>{t('wallet.title')}</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>{t('preferences.title')}</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{t('accountInformation')}</span>
                </CardTitle>
                <CardDescription>
                  {t('updatePersonalInfo')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t('displayName')}</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1"
                      disabled={isUpdatingName}
                    />
                    <Button 
                      onClick={handleUpdateName} 
                      disabled={isUpdatingName}
                    >
                      {isUpdatingName ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      {t('updateName')}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Email */}
                <div className="space-y-2">
                  <Label>{t('emailAddress')}</Label>
                  <div className="flex items-center space-x-2">
                    <p className="text-slate-900 font-medium">{profile?.email || t('notSet')}</p>
                    {profile?.emailVerified ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('verified')}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        {t('unverified')}
                      </Badge>
                    )}
                  </div>
                  {!profile?.emailVerified && profile?.email && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => router.push('/auth/resend-verification')}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      {t('resendVerification')}
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Account Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{t('accountType')}</Label>
                    <div>
                      <Badge variant={profile?.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                        {profile?.role === 'ADMIN' ? (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            {t('admin')}
                          </>
                        ) : (
                          <>
                            <User className="h-3 w-3 mr-1" />
                            {t('user')}
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('accountCreated')}</Label>
                    <p className="text-slate-900">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : t('unknown')}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Delete Account */}
                <div className="pt-4">
                  <Button variant="destructive">
                    {t('deleteAccount')}
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                   {t('deleteWarning')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>{t('changePassword')}</span>
                  </CardTitle>
                  <CardDescription>
{t('updatePassword')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t('newPassword')}</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t('confirmNewPassword')}</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength={8}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" disabled={isChangingPassword}>
                      {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t('changePassword')}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5" />
                    <span>{t('twoFactorAuth')}</span>
                  </CardTitle>
                  <CardDescription>
                   {t('addSecurity')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('2faStatus')}</p>
                      <p className="text-sm text-slate-600">
                        {twoFactorEnabled ? t('2faEnabled'): t('2faDisabled')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {twoFactorEnabled ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  <Separator />

                  {!twoFactorEnabled && !twoFactorSetup && (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                       {t('enable2fa')}
                      </p>
                      <Button onClick={handleSetup2FA} disabled={isSettingUp2FA}>
                        {isSettingUp2FA && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('setup2fa')}
                      </Button>
                    </div>
                  )}

{twoFactorSetup && (
  <div className="space-y-6">
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <h4 className="font-semibold text-amber-800 mb-2">
        {t('2fa.setupTitle')}
      </h4>
      <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
        <li>{t('2fa.step1')}</li>
        <li>{t('2fa.step2')}</li>
        <li>{t('2fa.step3')}</li>
        <li>{t('2fa.step4')}</li>
      </ol>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label>{t('2fa.qrCode')}</Label>
          <div className="mt-2 p-4 bg-white rounded-lg border">
            <img src={twoFactorSetup.qrCode} alt="2FA QR Code" className="mx-auto" />
          </div>
        </div>

        <div>
          <Label>{t('2fa.manualSecret')}</Label>
          <div className="flex mt-2">
            <Input
              value={twoFactorSetup.secret}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => copyToClipboard(twoFactorSetup.secret)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>{t('2fa.backupCodes')}</Label>
          <div className="mt-2 p-4 bg-slate-50 rounded-lg border">
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              {twoFactorSetup.backupCodes.map((code, index) => (
                <div key={index} className="text-center py-1">
                  {code}
                </div>
              ))}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={downloadBackupCodes}
          >
            <Download className="h-4 w-4 mr-2" />
            {t('2fa.downloadBackup')}
          </Button>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <Label htmlFor="twoFactorCode">{t('2fa.verificationCode')}</Label>
        <Input
          id="twoFactorCode"
          type="text"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          placeholder={t('2fa.placeholder')}
          maxLength={6}
          className="mt-2"
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleEnable2FA} disabled={isEnabling2FA}>
          {isEnabling2FA && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('2fa.enable')}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setTwoFactorSetup(null)
            setTwoFactorCode('')
          }}
        >
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  </div>
)}

{twoFactorEnabled && (
  <div className="space-y-4">
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <p className="text-green-800 text-sm">
        {t('2fa.enabledMessage')}
      </p>
    </div>

    <div className="space-y-4">
      <div>
        <Label htmlFor="disable2FACode">
          {t('2fa.disablePrompt')}
        </Label>
        <Input
          id="disable2FACode"
          type="text"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          placeholder={t('2fa.disablePlaceholder')}
          className="mt-2"
        />
      </div>
      <Button 
        variant="destructive" 
        onClick={handleDisable2FA} 
        disabled={isDisabling2FA}
      >
        {isDisabling2FA && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t('2fa.disable')}
      </Button>
    </div>
  </div>
)}
                </CardContent>
              </Card>

              {/* Login History */}
     <Card>
  <CardHeader>
    <CardTitle className="flex items-center space-x-2">
      <Clock className="h-5 w-5" />
      <span>{t('loginHistory.title')}</span>
    </CardTitle>
    <CardDescription>
      {t('loginHistory.description')}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Button 
      onClick={() => router.push('/profile/login-history')}
      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
    >
      {t('loginHistory.button')}
    </Button>
  </CardContent>
</Card>

            </div>
          </TabsContent>
          
          {/* Wallet Tab */}
 <TabsContent value="wallet">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>{t('wallet.title')}</span>
          </CardTitle>
          <CardDescription>
            {t('wallet.description')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Wallet Status */}
          <div className="space-y-2">
            <Label>{t('wallet.walletStatus')}</Label>
            {profile?.walletAddress ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <p className="text-slate-900 font-mono text-sm break-all">
                    {profile.walletAddress}
                  </p>
                  {profile.walletVerified ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {t('wallet.verified')}
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <XCircle className="h-3 w-3 mr-1" />
                      {t('wallet.unverified')}
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(profile.walletAddress!)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t('wallet.copy')}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-500">{t('wallet.noWalletLinked')}</p>
                <Button 
                  onClick={handleLinkWallet} 
                  disabled={isLinkingWallet}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                >
                  {isLinkingWallet ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wallet className="h-4 w-4 mr-2" />
                  )}
                  {t('wallet.linkWallet')}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Connected Wallet */}
          {isConnected && address && (
            <div className="space-y-4">
              <Label>{t('wallet.connectedWallet')}</Label>
              <div className="p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{t('wallet.address')}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(address)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="font-mono text-sm break-all text-slate-700">{address}</p>
              </div>

              {/* Link wallet button if not already linked */}
              {!profile?.walletAddress && (
                <Button 
                  onClick={handleLinkWallet} 
                  disabled={isLinkingWallet}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                >
                  {isLinkingWallet ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wallet className="h-4 w-4 mr-2" />
                  )}
                  {t('wallet.linkThisWallet')}
                </Button>
              )}
            </div>
          )}

          {/* Wallet Security */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">{t('wallet.securityTipsTitle')}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{t('wallet.tip1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{t('wallet.tip2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{t('wallet.tip3')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{t('wallet.tip4')}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  
          
          {/* Preferences Tab */}
 <TabsContent value="preferences">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>{t('preferences.title')}</span>
          </CardTitle>
          <CardDescription>
            {t('preferences.description')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">{t('preferences.emailNotifications.label')}</Label>
                <p className="text-sm text-slate-500">{t('preferences.emailNotifications.description')}</p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="security-alerts">{t('preferences.securityAlerts.label')}</Label>
                <p className="text-sm text-slate-500">{t('preferences.securityAlerts.description')}</p>
              </div>
              <Switch
                id="security-alerts"
                checked={securityAlerts}
                onCheckedChange={setSecurityAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">{t('preferences.marketingEmails.label')}</Label>
                <p className="text-sm text-slate-500">{t('preferences.marketingEmails.description')}</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </div>

          <Separator />

          {/* Language Preferences */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('preferences.language.label')}</Label>
                <p className="text-sm text-slate-500">{t('preferences.language.description')}</p>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Languages className="h-4 w-4" />
                <span>{t('preferences.language.change')}</span>
              </Button>
            </div>
          </div>

          <Button
            onClick={handleUpdatePreferences}
            disabled={isUpdatingPreferences}
            className="mt-4"
          >
            {isUpdatingPreferences && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('preferences.save')}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}