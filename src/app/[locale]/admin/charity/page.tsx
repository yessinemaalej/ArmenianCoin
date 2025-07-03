'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Building, 
  PieChart, 
  Edit, 
  Trash2, 
  Plus, 
  Loader2, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  Home,
  Shield
} from 'lucide-react'

// Types for charity data
interface CharityStat {
  id: string
  key: string
  value: string
  label: string
  description: string
  icon: string
  color: string
}

interface CharityProject {
  id: string
  title: string
  date: string
  amount: string
  beneficiaries: string
  description: string
  status: 'COMPLETED' | 'ONGOING' | 'PLANNED'
  image: string
}

interface CharityPartner {
  id: string
  name: string
  focus: string
  established: string
  description: string
}

interface CharityAllocation {
  id: string
  category: string
  percentage: number
  description: string
  icon: string
}

export default function AdminCharityPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State for charity data
  const [stats, setStats] = useState<CharityStat[]>([])
  const [projects, setProjects] = useState<CharityProject[]>([])
  const [partners, setPartners] = useState<CharityPartner[]>([])
  const [allocations, setAllocations] = useState<CharityAllocation[]>([])
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // UI states
  const [activeTab, setActiveTab] = useState('projects')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteType, setDeleteType] = useState<string>('')
  
  // Form states
  const [editingProject, setEditingProject] = useState<CharityProject | null>(null)
  const [editingStat, setEditingStat] = useState<CharityStat | null>(null)
  const [editingPartner, setEditingPartner] = useState<CharityPartner | null>(null)
  const [editingAllocation, setEditingAllocation] = useState<CharityAllocation | null>(null)
  
  // New item forms
  const [newProject, setNewProject] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    beneficiaries: '',
    description: '',
    status: 'PLANNED',
    image: '🏠'
  })
  
  const [newStat, setNewStat] = useState({
    key: '',
    value: '',
    label: '',
    description: '',
    icon: 'Heart',
    color: 'from-amber-500 to-amber-600'
  })
  
  const [newPartner, setNewPartner] = useState({
    name: '',
    focus: '',
    established: '',
    description: ''
  })
  
  const [newAllocation, setNewAllocation] = useState({
    category: '',
    percentage: 0,
    description: '',
    icon: '🏠'
  })

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  // Fetch charity data
  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchCharityData()
    }
  }, [session])

  const fetchCharityData = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/charity')
      if (!response.ok) {
        throw new Error('Failed to fetch charity data')
      }
      
      const data = await response.json()
      setStats(data.stats || [])
      setProjects(data.projects || [])
      setPartners(data.partners || [])
      setAllocations(data.allocations || [])
    } catch (error) {
      console.error('Error fetching charity data:', error)
      setError('Failed to load charity data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Project CRUD operations
  const handleAddProject = async () => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/admin/charity/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add project')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Project added successfully')
      
      // Reset form
      setNewProject({
        title: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        beneficiaries: '',
        description: '',
        status: 'PLANNED',
        image: '🏠'
      })
    } catch (error) {
      console.error('Add project error:', error)
      setError(error instanceof Error ? error.message : 'Failed to add project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProject = async () => {
    if (!editingProject) return
    
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update project')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Project updated successfully')
      setEditingProject(null)
    } catch (error) {
      console.error('Update project error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/projects/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete project')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Project deleted successfully')
    } catch (error) {
      console.error('Delete project error:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete project')
    } finally {
      setIsSubmitting(false)
      setDeleteConfirmId(null)
    }
  }

  // Stat CRUD operations
  const handleAddStat = async () => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/admin/charity/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStat)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add stat')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Stat added successfully')
      
      // Reset form
      setNewStat({
        key: '',
        value: '',
        label: '',
        description: '',
        icon: 'Heart',
        color: 'from-amber-500 to-amber-600'
      })
    } catch (error) {
      console.error('Add stat error:', error)
      setError(error instanceof Error ? error.message : 'Failed to add stat')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStat = async () => {
    if (!editingStat) return
    
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/stats/${editingStat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: editingStat.value,
          label: editingStat.label,
          description: editingStat.description,
          icon: editingStat.icon,
          color: editingStat.color
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update stat')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Stat updated successfully')
      setEditingStat(null)
    } catch (error) {
      console.error('Update stat error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update stat')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStat = async (id: string) => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/stats/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete stat')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Stat deleted successfully')
    } catch (error) {
      console.error('Delete stat error:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete stat')
    } finally {
      setIsSubmitting(false)
      setDeleteConfirmId(null)
    }
  }

  // Partner CRUD operations
  const handleAddPartner = async () => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/admin/charity/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPartner)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add partner')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Partner added successfully')
      
      // Reset form
      setNewPartner({
        name: '',
        focus: '',
        established: '',
        description: ''
      })
    } catch (error) {
      console.error('Add partner error:', error)
      setError(error instanceof Error ? error.message : 'Failed to add partner')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdatePartner = async () => {
    if (!editingPartner) return
    
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/partners/${editingPartner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPartner)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update partner')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Partner updated successfully')
      setEditingPartner(null)
    } catch (error) {
      console.error('Update partner error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update partner')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePartner = async (id: string) => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/partners/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete partner')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Partner deleted successfully')
    } catch (error) {
      console.error('Delete partner error:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete partner')
    } finally {
      setIsSubmitting(false)
      setDeleteConfirmId(null)
    }
  }

  // Allocation CRUD operations
  const handleAddAllocation = async () => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/admin/charity/allocations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAllocation)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add allocation')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Allocation added successfully')
      
      // Reset form
      setNewAllocation({
        category: '',
        percentage: 0,
        description: '',
        icon: '🏠'
      })
    } catch (error) {
      console.error('Add allocation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to add allocation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateAllocation = async () => {
    if (!editingAllocation) return
    
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/allocations/${editingAllocation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAllocation)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update allocation')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Allocation updated successfully')
      setEditingAllocation(null)
    } catch (error) {
      console.error('Update allocation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update allocation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAllocation = async (id: string) => {
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/charity/allocations/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete allocation')
      }

      // Refresh data
      await fetchCharityData()
      setMessage('Allocation deleted successfully')
    } catch (error) {
      console.error('Delete allocation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete allocation')
    } finally {
      setIsSubmitting(false)
      setDeleteConfirmId(null)
    }
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="h-5 w-5" />;
      case 'TrendingUp': return <TrendingUp className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      case 'Building': return <Building className="h-5 w-5" />;
      case 'PieChart': return <PieChart className="h-5 w-5" />;
      default: return <Heart className="h-5 w-5" />;
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading charity data...</span>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Charity Management</h1>
            <p className="text-slate-600 mt-2">Manage charity projects, statistics, partners, and fund allocations</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Admin</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/admin/users')}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </Button>
            <Button 
              onClick={() => router.push('/charity')}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            >
              <Heart className="h-4 w-4" />
              <span>View Public Page</span>
            </Button>
          </div>
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

        {/* Tabs */}
        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Partners</span>
            </TabsTrigger>
            <TabsTrigger value="allocations" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Allocations</span>
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Charity Projects</span>
                </CardTitle>
                <CardDescription>
                  Manage charity projects and initiatives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Project Form */}
                <Card className="border-dashed border-2 border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                          placeholder="e.g., Artsakh Family Emergency Relief"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newProject.date}
                          onChange={(e) => setNewProject({...newProject, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount Distributed</Label>
                        <Input
                          id="amount"
                          value={newProject.amount}
                          onChange={(e) => setNewProject({...newProject, amount: e.target.value})}
                          placeholder="e.g., $125,000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="beneficiaries">Beneficiaries</Label>
                        <Input
                          id="beneficiaries"
                          value={newProject.beneficiaries}
                          onChange={(e) => setNewProject({...newProject, beneficiaries: e.target.value})}
                          placeholder="e.g., 350 families"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newProject.status}
                          onValueChange={(value) => setNewProject({...newProject, status: value as any})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="ONGOING">Ongoing</SelectItem>
                            <SelectItem value="PLANNED">Planned</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Image/Emoji</Label>
                        <Input
                          id="image"
                          value={newProject.image}
                          onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                          placeholder="e.g., 🏠 or 📚"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        placeholder="Describe the project and its impact"
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={handleAddProject} 
                      className="mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                      Add Project
                    </Button>
                  </CardContent>
                </Card>

                {/* Projects List */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Beneficiaries</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-slate-500">
                            No projects found. Add your first project above.
                          </TableCell>
                        </TableRow>
                      ) : (
                        projects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl">{project.image}</span>
                                <div>
                                  <div className="font-medium">{project.title}</div>
                                  <div className="text-xs text-slate-500 truncate max-w-[200px]">
                                    {project.description}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(project.date)}</TableCell>
                            <TableCell>{project.amount}</TableCell>
                            <TableCell>{project.beneficiaries}</TableCell>
                            <TableCell>
                              <div className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center ${
                                project.status === 'COMPLETED' 
                                  ? 'bg-green-100 text-green-800' 
                                  : project.status === 'ONGOING'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {project.status}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setEditingProject(project)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setDeleteConfirmId(project.id)
                                    setDeleteType('project')
                                  }}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Charity Statistics</span>
                </CardTitle>
                <CardDescription>
                  Manage impact statistics shown on the charity page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Stat Form */}
                <Card className="border-dashed border-2 border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Statistic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="key">Key (unique identifier)</Label>
                        <Input
                          id="key"
                          value={newStat.key}
                          onChange={(e) => setNewStat({...newStat, key: e.target.value})}
                          placeholder="e.g., families_supported"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          value={newStat.value}
                          onChange={(e) => setNewStat({...newStat, value: e.target.value})}
                          placeholder="e.g., 1,250"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="label">Label</Label>
                        <Input
                          id="label"
                          value={newStat.label}
                          onChange={(e) => setNewStat({...newStat, label: e.target.value})}
                          placeholder="e.g., Families Supported"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Select
                          value={newStat.icon}
                          onValueChange={(value) => setNewStat({...newStat, icon: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Heart">Heart</SelectItem>
                            <SelectItem value="Users">Users</SelectItem>
                            <SelectItem value="TrendingUp">Trending Up</SelectItem>
                            <SelectItem value="Building">Building</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">Color Gradient</Label>
                        <Select
                          value={newStat.color}
                          onValueChange={(value) => setNewStat({...newStat, color: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="from-amber-500 to-amber-600">Amber</SelectItem>
                            <SelectItem value="from-red-500 to-red-600">Red</SelectItem>
                            <SelectItem value="from-blue-500 to-blue-600">Blue</SelectItem>
                            <SelectItem value="from-green-500 to-green-600">Green</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="statDescription">Description</Label>
                      <Textarea
                        id="statDescription"
                        value={newStat.description}
                        onChange={(e) => setNewStat({...newStat, description: e.target.value})}
                        placeholder="e.g., Direct assistance to Armenian families in need"
                        rows={2}
                      />
                    </div>
                    <Button 
                      onClick={handleAddStat} 
                      className="mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                      Add Statistic
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-slate-500 border rounded-md">
                      No statistics found. Add your first statistic above.
                    </div>
                  ) : (
                    stats.map((stat) => (
                      <Card key={stat.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-white`}>
                                {getIconComponent(stat.icon)}
                              </div>
                              <div>
                                <div className="font-bold text-xl text-slate-900">{stat.value}</div>
                                <div className="font-medium text-slate-700">{stat.label}</div>
                                <div className="text-xs text-slate-500 mt-1">{stat.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setEditingStat(stat)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setDeleteConfirmId(stat.id)
                                  setDeleteType('stat')
                                }}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Charity Partners</span>
                </CardTitle>
                <CardDescription>
                  Manage partner organizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Partner Form */}
                <Card className="border-dashed border-2 border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Partner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Organization Name</Label>
                        <Input
                          id="name"
                          value={newPartner.name}
                          onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                          placeholder="e.g., Armenian Relief Society"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="focus">Focus Area</Label>
                        <Input
                          id="focus"
                          value={newPartner.focus}
                          onChange={(e) => setNewPartner({...newPartner, focus: e.target.value})}
                          placeholder="e.g., Family Support & Emergency Aid"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="established">Established Year</Label>
                        <Input
                          id="established"
                          value={newPartner.established}
                          onChange={(e) => setNewPartner({...newPartner, established: e.target.value})}
                          placeholder="e.g., 1910"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnerDescription">Description</Label>
                      <Textarea
                        id="partnerDescription"
                        value={newPartner.description}
                        onChange={(e) => setNewPartner({...newPartner, description: e.target.value})}
                        placeholder="e.g., Providing comprehensive support to Armenian families worldwide."
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={handleAddPartner} 
                      className="mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                      Add Partner
                    </Button>
                  </CardContent>
                </Card>

                {/* Partners List */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Organization</TableHead>
                        <TableHead>Focus</TableHead>
                        <TableHead>Established</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partners.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-slate-500">
                            No partners found. Add your first partner above.
                          </TableCell>
                        </TableRow>
                      ) : (
                        partners.map((partner) => (
                          <TableRow key={partner.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{partner.name}</div>
                                <div className="text-xs text-slate-500 truncate max-w-[300px]">
                                  {partner.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{partner.focus}</TableCell>
                            <TableCell>{partner.established}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setEditingPartner(partner)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setDeleteConfirmId(partner.id)
                                    setDeleteType('partner')
                                  }}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Allocations Tab */}
          <TabsContent value="allocations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Fund Allocations</span>
                </CardTitle>
                <CardDescription>
                  Manage charity fund allocation percentages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Allocation Form */}
                <Card className="border-dashed border-2 border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={newAllocation.category}
                          onChange={(e) => setNewAllocation({...newAllocation, category: e.target.value})}
                          placeholder="e.g., Artsakh Families"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="percentage">Percentage (%)</Label>
                        <Input
                          id="percentage"
                          type="number"
                          min="1"
                          max="100"
                          value={newAllocation.percentage}
                          onChange={(e) => setNewAllocation({...newAllocation, percentage: parseInt(e.target.value) || 0})}
                          placeholder="e.g., 40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon/Emoji</Label>
                        <Input
                          id="icon"
                          value={newAllocation.icon}
                          onChange={(e) => setNewAllocation({...newAllocation, icon: e.target.value})}
                          placeholder="e.g., 🏠 or 📚"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allocationDescription">Description</Label>
                      <Textarea
                        id="allocationDescription"
                        value={newAllocation.description}
                        onChange={(e) => setNewAllocation({...newAllocation, description: e.target.value})}
                        placeholder="e.g., Direct support for displaced families from Artsakh"
                        rows={2}
                      />
                    </div>
                    <Button 
                      onClick={handleAddAllocation} 
                      className="mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                      Add Allocation
                    </Button>
                  </CardContent>
                </Card>

                {/* Current Allocations */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Current Allocations</h3>
                  
                  {/* Total Percentage Check */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-amber-800">Total Allocated:</div>
                      <div className="text-xl font-bold text-amber-800">
                        {allocations.reduce((sum, allocation) => sum + allocation.percentage, 0)}%
                      </div>
                    </div>
                    <div className="text-sm text-amber-700 mt-1">
                      {allocations.reduce((sum, allocation) => sum + allocation.percentage, 0) === 100 
                        ? "Perfect! Allocations total exactly 100%." 
                        : allocations.reduce((sum, allocation) => sum + allocation.percentage, 0) > 100
                        ? "Warning: Allocations exceed 100%. Please adjust." 
                        : "Warning: Allocations are less than 100%. Please adjust."}
                    </div>
                  </div>
                  
                  {/* Allocations List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allocations.length === 0 ? (
                      <div className="col-span-2 text-center py-8 text-slate-500 border rounded-md">
                        No allocations found. Add your first allocation above.
                      </div>
                    ) : (
                      allocations.map((allocation) => (
                        <Card key={allocation.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="text-3xl">{allocation.icon}</div>
                                <div>
                                  <div className="font-bold text-xl text-slate-900">{allocation.percentage}%</div>
                                  <div className="font-medium text-slate-700">{allocation.category}</div>
                                  <div className="text-xs text-slate-500 mt-1">{allocation.description}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setEditingAllocation(allocation)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setDeleteConfirmId(allocation.id)
                                    setDeleteType('allocation')
                                  }}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Project Dialog */}
        {editingProject && (
          <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogDescription>
                  Update the details of this charity project
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Project Title</Label>
                  <Input
                    id="edit-title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={new Date(editingProject.date).toISOString().split('T')[0]}
                    onChange={(e) => setEditingProject({...editingProject, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-amount">Amount Distributed</Label>
                  <Input
                    id="edit-amount"
                    value={editingProject.amount}
                    onChange={(e) => setEditingProject({...editingProject, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-beneficiaries">Beneficiaries</Label>
                  <Input
                    id="edit-beneficiaries"
                    value={editingProject.beneficiaries}
                    onChange={(e) => setEditingProject({...editingProject, beneficiaries: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingProject.status}
                    onValueChange={(value) => setEditingProject({...editingProject, status: value as any})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="ONGOING">Ongoing</SelectItem>
                      <SelectItem value="PLANNED">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Image/Emoji</Label>
                  <Input
                    id="edit-image"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                <Button 
                  onClick={handleUpdateProject}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Stat Dialog */}
        {editingStat && (
          <Dialog open={!!editingStat} onOpenChange={(open) => !open && setEditingStat(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Statistic</DialogTitle>
                <DialogDescription>
                  Update the details of this impact statistic
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Value</Label>
                  <Input
                    id="edit-value"
                    value={editingStat.value}
                    onChange={(e) => setEditingStat({...editingStat, value: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-label">Label</Label>
                  <Input
                    id="edit-label"
                    value={editingStat.label}
                    onChange={(e) => setEditingStat({...editingStat, label: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-icon">Icon</Label>
                  <Select
                    value={editingStat.icon}
                    onValueChange={(value) => setEditingStat({...editingStat, icon: value})}
                  >
                    <SelectTrigger id="edit-icon">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Heart">Heart</SelectItem>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="TrendingUp">Trending Up</SelectItem>
                      <SelectItem value="Building">Building</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-color">Color Gradient</Label>
                  <Select
                    value={editingStat.color}
                    onValueChange={(value) => setEditingStat({...editingStat, color: value})}
                  >
                    <SelectTrigger id="edit-color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="from-amber-500 to-amber-600">Amber</SelectItem>
                      <SelectItem value="from-red-500 to-red-600">Red</SelectItem>
                      <SelectItem value="from-blue-500 to-blue-600">Blue</SelectItem>
                      <SelectItem value="from-green-500 to-green-600">Green</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-stat-description">Description</Label>
                  <Textarea
                    id="edit-stat-description"
                    value={editingStat.description}
                    onChange={(e) => setEditingStat({...editingStat, description: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingStat(null)}>Cancel</Button>
                <Button 
                  onClick={handleUpdateStat}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Partner Dialog */}
        {editingPartner && (
          <Dialog open={!!editingPartner} onOpenChange={(open) => !open && setEditingPartner(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Partner</DialogTitle>
                <DialogDescription>
                  Update the details of this partner organization
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-partner-name">Organization Name</Label>
                  <Input
                    id="edit-partner-name"
                    value={editingPartner.name}
                    onChange={(e) => setEditingPartner({...editingPartner, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-focus">Focus Area</Label>
                  <Input
                    id="edit-focus"
                    value={editingPartner.focus}
                    onChange={(e) => setEditingPartner({...editingPartner, focus: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-established">Established Year</Label>
                  <Input
                    id="edit-established"
                    value={editingPartner.established}
                    onChange={(e) => setEditingPartner({...editingPartner, established: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-partner-description">Description</Label>
                  <Textarea
                    id="edit-partner-description"
                    value={editingPartner.description}
                    onChange={(e) => setEditingPartner({...editingPartner, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingPartner(null)}>Cancel</Button>
                <Button 
                  onClick={handleUpdatePartner}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Allocation Dialog */}
        {editingAllocation && (
          <Dialog open={!!editingAllocation} onOpenChange={(open) => !open && setEditingAllocation(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Allocation</DialogTitle>
                <DialogDescription>
                  Update the details of this fund allocation
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editingAllocation.category}
                    onChange={(e) => setEditingAllocation({...editingAllocation, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-percentage">Percentage (%)</Label>
                  <Input
                    id="edit-percentage"
                    type="number"
                    min="1"
                    max="100"
                    value={editingAllocation.percentage}
                    onChange={(e) => setEditingAllocation({...editingAllocation, percentage: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-allocation-icon">Icon/Emoji</Label>
                  <Input
                    id="edit-allocation-icon"
                    value={editingAllocation.icon}
                    onChange={(e) => setEditingAllocation({...editingAllocation, icon: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-allocation-description">Description</Label>
                  <Textarea
                    id="edit-allocation-description"
                    value={editingAllocation.description}
                    onChange={(e) => setEditingAllocation({...editingAllocation, description: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingAllocation(null)}>Cancel</Button>
                <Button 
                  onClick={handleUpdateAllocation}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this {deleteType}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  if (!deleteConfirmId) return
                  
                  switch (deleteType) {
                    case 'project':
                      handleDeleteProject(deleteConfirmId)
                      break
                    case 'stat':
                      handleDeleteStat(deleteConfirmId)
                      break
                    case 'partner':
                      handleDeletePartner(deleteConfirmId)
                      break
                    case 'allocation':
                      handleDeleteAllocation(deleteConfirmId)
                      break
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Delete {deleteType}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}