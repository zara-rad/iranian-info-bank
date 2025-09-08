import React, { useState, useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Building, User, Phone, Mail, MapPin, Globe, Camera, 
  Edit, Save, X, Plus, Trash2, Eye, BarChart3, 
  Calendar, Star, TrendingUp, Users, Clock
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import GlobalSearch from '../components/GlobalSearch'
import toast from 'react-hot-toast'

const BusinessDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState(false)
  
  // Business data
  const [businessData, setBusinessData] = useState(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({})
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  
  // Analytics data
  const [analytics, setAnalytics] = useState({
    views: 0,
    clicksPhone: 0,
    clicksEmail: 0,
    clicksWebsite: 0,
    averageRating: 0,
    totalReviews: 0
  })

  useEffect(() => {
    if (!user || user.role !== 'business_owner') {
      navigate('/login')
      return
    }
    
    loadBusinessData()
    loadCategories()
  }, [user, navigate])

  const loadBusinessData = async () => {
    try {
      // Mock API call - replace with actual API
      const mockBusiness = {
        id: 1,
        businessName: user.businessName || 'My Business',
        ownerName: user.fullName,
        email: user.email,
        phone: '+49 170 1234567',
        website: 'www.mybusiness.de',
        description: 'Professional services for the Iranian community in Germany.',
        descriptionGerman: 'Professionelle Dienstleistungen für die iranische Gemeinde in Deutschland.',
        descriptionPersian: 'خدمات حرفه‌ای برای جامعه ایرانی در آلمان.',
        address: 'Hauptstraße 123',
        city: 'Berlin',
        state: 'Berlin',
        zipCode: '10115',
        category: 1,
        subcategories: [11, 12],
        logo: null,
        images: [],
        workingHours: [
          { day: 'monday', open: '09:00', close: '17:00', isClosed: false },
          { day: 'tuesday', open: '09:00', close: '17:00', isClosed: false },
          { day: 'wednesday', open: '09:00', close: '17:00', isClosed: false },
          { day: 'thursday', open: '09:00', close: '17:00', isClosed: false },
          { day: 'friday', open: '09:00', close: '17:00', isClosed: false },
          { day: 'saturday', open: '10:00', close: '14:00', isClosed: false },
          { day: 'sunday', open: '', close: '', isClosed: true }
        ],
        isVerified: true,
        isActive: true,
        createdAt: '2024-01-15'
      }
      
      const mockAnalytics = {
        views: 1250,
        clicksPhone: 89,
        clicksEmail: 45,
        clicksWebsite: 156,
        averageRating: 4.8,
        totalReviews: 127
      }
      
      setBusinessData(mockBusiness)
      setFormData(mockBusiness)
      setAnalytics(mockAnalytics)
      setSelectedSubcategories(mockBusiness.subcategories || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading business data:', error)
      toast.error('Error loading business data')
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      // Import categories from data file
      const { categories: allCategories } = await import('../data/categories')
      setCategories(allCategories)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleWorkingHoursChange = (dayIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      workingHours: prev.workingHours.map((day, index) => 
        index === dayIndex ? { ...day, [field]: value } : day
      )
    }))
  }

  const handleSubcategoryToggle = (subcategoryId) => {
    setSelectedSubcategories(prev => {
      if (prev.includes(subcategoryId)) {
        return prev.filter(id => id !== subcategoryId)
      } else {
        return [...prev, subcategoryId]
      }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Mock API call - replace with actual API
      const updatedData = {
        ...formData,
        subcategories: selectedSubcategories
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBusinessData(updatedData)
      setEditMode(false)
      toast.success('Business information updated successfully!')
    } catch (error) {
      console.error('Error saving business data:', error)
      toast.error('Error saving business data')
    }
    setSaving(false)
  }

  const handleCancel = () => {
    setFormData(businessData)
    setSelectedSubcategories(businessData.subcategories || [])
    setEditMode(false)
  }

  const breadcrumbItems = [
    { label: 'Business Dashboard', link: null }
  ]

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

  const selectedCategory = categories.find(cat => cat.id === formData.category)

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-blue-600">{analytics.views.toLocaleString()}</p>
            </div>
            <Eye className="h-12 w-12 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Phone Clicks</p>
              <p className="text-3xl font-bold text-green-600">{analytics.clicksPhone}</p>
            </div>
            <Phone className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Email Clicks</p>
              <p className="text-3xl font-bold text-purple-600">{analytics.clicksEmail}</p>
            </div>
            <Mail className="h-12 w-12 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-3xl font-bold text-yellow-600">{analytics.averageRating}</p>
            </div>
            <Star className="h-12 w-12 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">{analytics.totalReviews} reviews</p>
        </div>
      </div>

      {/* Business Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Business Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${businessData.isVerified ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <div>
              <p className="font-medium text-gray-900">Verification Status</p>
              <p className={`text-sm ${businessData.isVerified ? 'text-green-600' : 'text-orange-600'}`}>
                {businessData.isVerified ? 'Verified' : 'Pending Verification'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${businessData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div>
              <p className="font-medium text-gray-900">Listing Status</p>
              <p className={`text-sm ${businessData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {businessData.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Member Since</p>
              <p className="text-sm text-gray-600">
                {new Date(businessData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('business-info')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="text-persian-600" size={20} />
            <div className="text-left">
              <p className="font-medium text-gray-900">Edit Business Info</p>
              <p className="text-sm text-gray-600">Update your business details</p>
            </div>
          </button>
          
          <button
            onClick={() => window.open(`/business/${businessData.id}`, '_blank')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="text-blue-600" size={20} />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Public Profile</p>
              <p className="text-sm text-gray-600">See how customers see you</p>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="text-green-600" size={20} />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-600">Track your performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Business Information</h3>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Edit size={18} />
            <span>Edit Information</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">Basic Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">Location</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode || ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Category Selection */}
        {editMode && selectedCategory && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-4">Category & Services</h4>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Category:</p>
              <div className="flex items-center space-x-2 p-3 bg-persian-50 rounded-lg">
                <span className="text-2xl">{selectedCategory.icon}</span>
                <div>
                  <p className="font-medium text-persian-800">{selectedCategory.name}</p>
                  <p className="text-sm text-persian-600">{selectedCategory.nameGerman}</p>
                </div>
              </div>
            </div>

            {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Select Your Services:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCategory.subcategories.map((subcategory) => (
                    <label key={subcategory.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategory.id)}
                        onChange={() => handleSubcategoryToggle(subcategory.id)}
                        className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{subcategory.name}</p>
                        <p className="text-sm text-gray-600">{subcategory.nameGerman}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Descriptions */}
        <div className="mt-6 pt-6 border-t space-y-4">
          <h4 className="font-medium text-gray-900">Business Descriptions</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              disabled={!editMode}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (German)</label>
            <textarea
              name="descriptionGerman"
              value={formData.descriptionGerman || ''}
              onChange={handleInputChange}
              disabled={!editMode}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Persian)</label>
            <textarea
              name="descriptionPersian"
              value={formData.descriptionPersian || ''}
              onChange={handleInputChange}
              disabled={!editMode}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100 text-right"
              dir="rtl"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderWorkingHours = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Working Hours</h3>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Edit size={18} />
            <span>Edit Hours</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4">
          {formData.workingHours?.map((day, index) => (
            <div key={day.day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-24">
                <p className="font-medium text-gray-900 capitalize">{day.day}</p>
              </div>
              
              {editMode ? (
                <>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={day.isClosed}
                      onChange={(e) => handleWorkingHoursChange(index, 'isClosed', e.target.checked)}
                      className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500"
                    />
                    <span className="text-sm text-gray-600">Closed</span>
                  </label>
                  
                  {!day.isClosed && (
                    <>
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={day.open}
                          onChange={(e) => handleWorkingHoursChange(index, 'open', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={day.close}
                          onChange={(e) => handleWorkingHoursChange(index, 'close', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex-1">
                  {day.isClosed ? (
                    <span className="text-red-600 font-medium">Closed</span>
                  ) : (
                    <span className="text-gray-900">{day.open} - {day.close}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Analytics & Performance</h3>
      
      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.views.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Phone Calls</p>
              <p className="text-2xl font-bold text-green-600">{analytics.clicksPhone}</p>
            </div>
            <Phone className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +8% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Email Contacts</p>
              <p className="text-2xl font-bold text-purple-600">{analytics.clicksEmail}</p>
            </div>
            <Mail className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +15% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Website Visits</p>
              <p className="text-2xl font-bold text-orange-600">{analytics.clicksWebsite}</p>
            </div>
            <Globe className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +22% from last month</p>
        </div>
      </div>

      {/* Rating & Reviews */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Customer Feedback</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">{analytics.averageRating}</div>
            <div className="flex justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= Math.floor(analytics.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{analytics.totalReviews}</div>
            <p className="text-gray-600">Total Reviews</p>
            <p className="text-sm text-green-600 mt-1">↗ +5 new this month</p>
          </div>
        </div>
      </div>

      {/* Tips for Improvement */}
      <div className="bg-persian-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-persian-800 mb-4">Tips to Improve Your Listing</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-persian-600 rounded-full mt-2"></div>
            <p className="text-persian-700">Add more photos of your business to increase customer engagement</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-persian-600 rounded-full mt-2"></div>
            <p className="text-persian-700">Update your working hours regularly to help customers find you</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-persian-600 rounded-full mt-2"></div>
            <p className="text-persian-700">Respond to customer reviews to build trust and credibility</p>
          </div>
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
              <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.fullName}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="text-persian-600" size={24} />
              <span className="font-medium text-persian-600">Business Owner</span>
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
                  onClick={() => setActiveTab('business-info')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'business-info'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Building size={18} />
                    <span>Business Info</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('working-hours')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'working-hours'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Clock size={18} />
                    <span>Working Hours</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-persian-500 text-persian-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={18} />
                    <span>Analytics</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'business-info' && renderBusinessInfo()}
            {activeTab === 'working-hours' && renderWorkingHours()}
            {activeTab === 'analytics' && renderAnalytics()}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BusinessDashboard