'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Settings, 
  Globe, 
  Mail, 
  Shield, 
  Database, 
  Server, 
  Key,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'

export default function AdminSettingsPage() {
  const router = useRouter()
  
  // Site settings
  const [siteName, setSiteName] = useState('ArmenianCoin')
  const [siteDescription, setSiteDescription] = useState('ArmenianCoin (ARMT) - With Heart, Soul and By the Law')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  
  // Email settings
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com')
  const [smtpPort, setSmtpPort] = useState('587')
  const [smtpUser, setSmtpUser] = useState('your-email@gmail.com')
  const [smtpPassword, setSmtpPassword] = useState('••••••••••••')
  const [emailFrom, setEmailFrom] = useState('noreply@armeniancoin.org')
  
  // Security settings
  const [jwtSecret, setJwtSecret] = useState('••••••••••••••••••••••••••••••••')
  const [nextAuthSecret, setNextAuthSecret] = useState('••••••••••••••••••••••••••••••••')
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)
  
  // Database settings
  const [databaseUrl, setDatabaseUrl] = useState('mongodb://localhost:27017/armeniancoin')
  
  // UI state
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSaveSettings = async (tab: string) => {
    setIsLoading(true)
    setError('')
    setMessage('')

    // In a real app, this would send the settings to an API endpoint
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      setMessage(`${tab.charAt(0).toUpperCase() + tab.slice(1)} settings updated successfully`)
      setIsLoading(false)
    }, 1000)
  }

  const generateRandomSecret = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
            <p className="text-slate-600 mt-2">Configure global system settings and preferences</p>
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
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Database</span>
            </TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure basic site settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-slate-500">Temporarily disable the site for maintenance</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  onClick={() => handleSaveSettings('general')} 
                  disabled={isLoading}
                  className="mt-4"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure email server settings for notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">SMTP Username</Label>
                    <Input
                      id="smtpUser"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={smtpPassword}
                      onChange={(e) => setSmtpPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailFrom">From Email Address</Label>
                  <Input
                    id="emailFrom"
                    value={emailFrom}
                    onChange={(e) => setEmailFrom(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  onClick={() => handleSaveSettings('email')} 
                  disabled={isLoading}
                  className="mt-4"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure security settings and authentication options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="jwtSecret">JWT Secret</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setJwtSecret(generateRandomSecret())}
                      disabled={isLoading}
                    >
                      <Key className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                  <Input
                    id="jwtSecret"
                    value={jwtSecret}
                    onChange={(e) => setJwtSecret(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="nextAuthSecret">NextAuth Secret</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setNextAuthSecret(generateRandomSecret())}
                      disabled={isLoading}
                    >
                      <Key className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                  <Input
                    id="nextAuthSecret"
                    value={nextAuthSecret}
                    onChange={(e) => setNextAuthSecret(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                    <p className="text-sm text-slate-500">Users must verify their email before accessing the site</p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={requireEmailVerification}
                    onCheckedChange={setRequireEmailVerification}
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  onClick={() => handleSaveSettings('security')} 
                  disabled={isLoading}
                  className="mt-4"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Database Settings */}
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure database connection and backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="databaseUrl">Database URL</Label>
                  <Input
                    id="databaseUrl"
                    value={databaseUrl}
                    onChange={(e) => setDatabaseUrl(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Note: Changing this will require a server restart
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Database Management</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Server className="h-4 w-4 mr-2" />
                      Create Backup
                    </Button>
                    
                    <Button variant="outline" className="justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Restore Backup
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('database')} 
                  disabled={isLoading}
                  className="mt-4"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Database Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}