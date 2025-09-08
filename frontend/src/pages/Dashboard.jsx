import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { 
  Users, Building, Calendar, BarChart3, Settings, 
  Shield, Eye, Edit, Trash2, Plus, Search, Filter,
  CheckCircle, XCircle, Clock, Mail, Phone
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import GlobalSearch from '../components/global-search/GlobalSearch.jsx'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [businesses, setBusinesses] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data
  const sampleUsers = [
    {
      id: 1,
      fullName: 'Ahmad Hosseini',
      email: 'ahmad@example.com',
      role: 'business_owner',
      businessName: 'Dr. Hosseini Medical Practice',
      isActive: true,
      isVerified: true,
      hasActivePlan: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-12-20'
    },
    {
      id: 2,
      fullName: 'Maryam Karimi',
      email: 'maryam@example.com',
      role: 'business_owner',
      businessName: 'Karimi Beauty Salon',
      isActive: true,
      isVerified: false,
      hasActivePlan: true,
      createdAt: '2024-02-10',
      lastLogin: '2024-12-19'
    },
    {
      id: 3,
      fullName: 'Ali Rezaei',
      email: 'ali@example.com',
      role: 'admin',
      businessName: null,
      isActive: true,
      isVerified: true,
      hasActivePlan: true,
      createdAt: '2024-01-01',
      lastLogin: '2024-12-20'
    }
  ]

  const sampleBusinesses = [
    {
      id: 1,
      businessName: 'Dr. Hosseini Medical Practice',
      ownerName: 'Ahmad Hosseini',
      email: 'ahmad@example.com',
      phone: '+49 30 12345678',
      city: 'Berlin',
      category: 'Medical & Healthcare',
      isVerified: true,
      isActive: true,
      isPaid: true,
      createdAt: '2024-01-15',
      views: 1250,
      averageRating: 4.8
    },
    {
      id: 2,
      businessName: 'Karimi Beauty Salon',
      ownerName: 'Maryam Karimi',
      email: 'maryam@example.com',
      phone: '+49 40 87654321',
      city: 'Hamburg',
      category: 'Beauty & Wellness',
      isVerified: false,
      isActive: true,
      isPaid: true,
      createdAt: '2024-02-10',
      views: 890,
      averageRating: 4.6
    }
  ]

  const sampleEvents = [
    {
      id: 1,
      title: 'Nowruz Celebration 2025',
      organizer: 'Persian Cultural Association',
      city: 'Berlin',
      startDate: '2025-03-20',
      status: 'published',
      isFeatured: true,
      views: 2340,
      createdAt: '2024-12-01'
    },
    {
      id: 2,
      title: 'Business Networking Event',
      organizer: 'Iranian Business Network',
      city: 'Hamburg',
      startDate: '2025-02-15',
      status: 'draft',
      isFeatured: false,
      views: 156,
      createdAt: '2024-12-10'
    }
  ]

  useEffect(() => {
    // Check if user has admin access
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      navigate('/login')
      return
    }

    // Load data
    setTimeout(() => {
      setUsers(sampleUsers)
      setBusinesses(sampleBusinesses)
      setEvents(sampleEvents)
      setLoading(false)
    }, 1000)
  }, [user, navigate])

  const breadcrumbItems = [
    { label: 'Admin Dashboard', link: null }
  ]

  const isSuperAdmin = user?.role === 'super_admin'

  const stats = {
    totalUsers: users.length,
    totalBusinesses: businesses.length,
    totalEvents: events.length,
    pendingVerifications: businesses.filter(b => !b.isVerified).length,
    activeUsers: users.filter(u => u.isActive).length,
    paidBusinesses: businesses.filter(b => b.isPaid).length
  }

  const handleUserAction = (userId, action) => {
    const user = users.find(u => u.id === userId)
    switch (action) {
      case 'verify':
        toast.success(`${user.fullName} has been verified`)
        break
      case 'deactivate':
        toast.success(`${user.fullName} has been deactivated`)
        break
      case 'activate':
        toast.success(`${user.fullName} has been activated`)
        break
      case 'delete':
        toast.success(`${user.fullName} has been deleted`)
        break
    }
  }

  const handleBusinessAction = (businessId, action) => {
    const business = businesses.find(b => b.id === businessId)
    switch (action) {
      case 'verify':
        toast.success(`${business.businessName} has been verified`)
        break
      case 'reject':
        toast.error(`${business.businessName} verification rejected`)
        break
      case 'feature':
        toast.success(`${business.businessName} is now featured`)
        break
    }
  }

  const handleEventAction = (eventId, action) => {
    const event = events.find(e => e.id === eventId)
    switch (action) {
      case 'publish':
        toast.success(`${event.title} has been published`)
        break
      case 'feature':
        toast.success(`${event.title} is now featured`)
        break
      case 'delete':
        toast.success(`${event.title} has been deleted`)
        break
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">{stats.activeUsers} active</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Businesses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBusinesses}</p>
            </div>
            <Building className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">{stats.paidBusinesses} paid</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
            </div>
            <Calendar className="h-12 w-12 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pendingVerifications}</p>
            </div>
            <Clock className="h-12 w-12 text-orange-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Requires attention</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-green-600">€2,400</p>
            </div>
            <BarChart3 className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-lg font-bold text-green-600">All Systems Operational</p>
            </div>
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Last checked: 2 min ago</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">New business registered</p>
              <p className="text-sm text-gray-600">Karimi Beauty Salon - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Calendar className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">New event created</p>
              <p className="text-sm text-gray-600">Nowruz Celebration 2025 - 5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <Clock className="text-orange-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Verification pending</p>
              <p className="text-sm text-gray-600">3 businesses awaiting verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">User Management</h3>
        {isSuperAdmin && (
          <button className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={18} />
            <span>Add User</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.businessName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.isActive ? (
                        <CheckCircle className="text-green-600" size={16} />
                      ) : (
                        <XCircle className="text-red-600" size={16} />
                      )}
                      <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUserAction(user.id, 'view')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      {isSuperAdmin && (
                        <>
                          <button
                            onClick={() => handleUserAction(user.id, user.isActive ? 'deactivate' : 'activate')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'delete')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderBusinesses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Business Management</h3>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={18} />
            <span>Add Business</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{business.businessName}</div>
                      <div className="text-sm text-gray-500">⭐ {business.averageRating}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{business.ownerName}</div>
                      <div className="text-sm text-gray-500">{business.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {business.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {business.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {business.isVerified ? (
                        <CheckCircle className="text-green-600" size={16} />
                      ) : (
                        <Clock className="text-orange-600" size={16} />
                      )}
                      <span className={`text-sm ${business.isVerified ? 'text-green-600' : 'text-orange-600'}`}>
                        {business.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {business.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBusinessAction(business.id, 'view')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      {!business.isVerified && (
                        <button
                          onClick={() => handleBusinessAction(business.id, 'verify')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleBusinessAction(business.id, 'feature')}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <Settings size={16} />
                      </button>
                      {isSuperAdmin && (
                        <button
                          onClick={() => handleBusinessAction(business.id, 'delete')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Event Management</h3>
        <button className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Event</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      {event.isFeatured && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gold-100 text-gold-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.organizer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(event.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'published' ? 'bg-green-100 text-green-800' :
                      event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEventAction(event.id, 'view')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      {event.status === 'draft' && (
                        <button
                          onClick={() => handleEventAction(event.id, 'publish')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleEventAction(event.id, 'feature')}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <Settings size={16} />
                      </button>
                      {isSuperAdmin && (
                        <button
                          onClick={() => handleEventAction(event.id, 'delete')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Global Search Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalSearch />
        </div>
      </section>
      
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Dashboard Header */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.fullName} ({isSuperAdmin ? 'Super Admin' : 'Admin'})
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className={`${isSuperAdmin ? 'text-red-600' : 'text-blue-600'}`} size={24} />
              <span className={`font-medium ${isSuperAdmin ? 'text-red-600' : 'text-blue-600'}`}>
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3 size={18} />
                    <span>Overview</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users size={18} />
                    <span>Users</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('businesses')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'businesses'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Building size={18} />
                    <span>Businesses</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'events'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>Events</span>
                  </div>
                </button>
                {isSuperAdmin && (
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'settings'
                        ? 'border-persian-500 text-persian-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Settings size={18} />
                      <span>Settings</span>
                    </div>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'businesses' && renderBusinesses()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'settings' && isSuperAdmin && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">System Settings</h3>
                <p className="text-gray-600">Super Admin settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard