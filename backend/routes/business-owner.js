const express = require('express')
const router = express.Router()
const Business = require('../models/Business')
const Category = require('../models/Category')
const { authenticate } = require('../middleware/auth')
const { body, validationResult } = require('express-validator')

// Middleware to ensure user is business owner
const requireBusinessOwner = (req, res, next) => {
  if (req.user.role !== 'business_owner') {
    return res.status(403).json({ message: 'Business owner access required' })
  }
  next()
}

// GET /api/business-owner/dashboard - Get business owner dashboard data
router.get('/dashboard', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    // Get user's business
    const business = await Business.findOne({ userId: req.user._id })
      .populate('category', 'name nameGerman namePersian icon')

    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    // Calculate analytics
    const analytics = {
      views: business.views || 0,
      clicksPhone: business.clicksPhone || 0,
      clicksEmail: business.clicksEmail || 0,
      clicksWebsite: business.clicksWebsite || 0,
      averageRating: business.averageRating || 0,
      totalReviews: business.totalReviews || 0
    }

    // Get recent activity (mock data for now)
    const recentActivity = [
      {
        type: 'view',
        message: 'Your business was viewed 15 times today',
        timestamp: new Date()
      },
      {
        type: 'contact',
        message: 'Someone called your business',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]

    res.json({
      business,
      analytics,
      recentActivity
    })
  } catch (error) {
    console.error('Business owner dashboard error:', error)
    res.status(500).json({ message: 'Error fetching dashboard data' })
  }
})

// GET /api/business-owner/business - Get user's business details
router.get('/business', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user._id })
      .populate('category', 'name nameGerman namePersian icon subcategories')

    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    res.json(business)
  } catch (error) {
    console.error('Get business error:', error)
    res.status(500).json({ message: 'Error fetching business data' })
  }
})

// PUT /api/business-owner/business - Update user's business
router.put('/business', authenticate, requireBusinessOwner, [
  body('businessName').optional().trim().isLength({ min: 2 }),
  body('ownerName').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().trim().isLength({ min: 10 }),
  body('address').optional().trim().isLength({ min: 5 }),
  body('city').optional().trim().isLength({ min: 2 }),
  body('zipCode').optional().trim().isLength({ min: 4 }),
  body('website').optional().isURL(),
  body('description').optional().trim(),
  body('descriptionGerman').optional().trim(),
  body('descriptionPersian').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    // Update business data
    Object.assign(business, req.body)
    
    // If significant changes made, require re-verification
    if (req.body.businessName || req.body.category || req.body.address) {
      business.isVerified = false
    }

    await business.save()

    const updatedBusiness = await Business.findById(business._id)
      .populate('category', 'name nameGerman namePersian icon')

    res.json({
      message: 'Business updated successfully',
      business: updatedBusiness
    })
  } catch (error) {
    console.error('Update business error:', error)
    res.status(500).json({ message: 'Error updating business' })
  }
})

// PUT /api/business-owner/working-hours - Update working hours
router.put('/working-hours', authenticate, requireBusinessOwner, [
  body('workingHours').isArray(),
  body('workingHours.*.day').isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  body('workingHours.*.open').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('workingHours.*.close').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('workingHours.*.isClosed').isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    business.workingHours = req.body.workingHours
    await business.save()

    res.json({
      message: 'Working hours updated successfully',
      workingHours: business.workingHours
    })
  } catch (error) {
    console.error('Update working hours error:', error)
    res.status(500).json({ message: 'Error updating working hours' })
  }
})

// GET /api/business-owner/analytics - Get detailed analytics
router.get('/analytics', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    // Mock analytics data - in real app, you'd track this over time
    const analytics = {
      overview: {
        totalViews: business.views || 0,
        phoneClicks: business.clicksPhone || 0,
        emailClicks: business.clicksEmail || 0,
        websiteClicks: business.clicksWebsite || 0,
        averageRating: business.averageRating || 0,
        totalReviews: business.totalReviews || 0
      },
      trends: {
        viewsGrowth: 12, // percentage
        contactsGrowth: 8,
        ratingTrend: 0.2
      },
      topSources: [
        { source: 'Direct Search', percentage: 45 },
        { source: 'Category Browse', percentage: 30 },
        { source: 'City Search', percentage: 25 }
      ],
      monthlyData: [
        { month: 'Jan', views: 120, contacts: 15 },
        { month: 'Feb', views: 150, contacts: 18 },
        { month: 'Mar', views: 180, contacts: 22 },
        { month: 'Apr', views: 200, contacts: 25 }
      ]
    }

    res.json(analytics)
  } catch (error) {
    console.error('Get analytics error:', error)
    res.status(500).json({ message: 'Error fetching analytics' })
  }
})

// POST /api/business-owner/upload-logo - Upload business logo
router.post('/upload-logo', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    // In a real app, you'd handle file upload here
    // For now, we'll just return a mock response
    
    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    // Mock logo URL - in real app, save to cloud storage
    const logoUrl = 'https://via.placeholder.com/200x200?text=Logo'
    
    business.logo = logoUrl
    await business.save()

    res.json({
      message: 'Logo uploaded successfully',
      logoUrl: logoUrl
    })
  } catch (error) {
    console.error('Upload logo error:', error)
    res.status(500).json({ message: 'Error uploading logo' })
  }
})

// POST /api/business-owner/upload-images - Upload business images
router.post('/upload-images', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    // In a real app, you'd handle multiple file uploads here
    
    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    // Mock image URLs - in real app, save to cloud storage
    const newImages = [
      'https://via.placeholder.com/400x300?text=Image1',
      'https://via.placeholder.com/400x300?text=Image2'
    ]
    
    business.images = [...(business.images || []), ...newImages]
    await business.save()

    res.json({
      message: 'Images uploaded successfully',
      images: business.images
    })
  } catch (error) {
    console.error('Upload images error:', error)
    res.status(500).json({ message: 'Error uploading images' })
  }
})

// DELETE /api/business-owner/image/:index - Delete business image
router.delete('/image/:index', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    const imageIndex = parseInt(req.params.index)
    
    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    if (!business.images || imageIndex < 0 || imageIndex >= business.images.length) {
      return res.status(400).json({ message: 'Invalid image index' })
    }

    business.images.splice(imageIndex, 1)
    await business.save()

    res.json({
      message: 'Image deleted successfully',
      images: business.images
    })
  } catch (error) {
    console.error('Delete image error:', error)
    res.status(500).json({ message: 'Error deleting image' })
  }
})

// GET /api/business-owner/profile-completion - Get profile completion status
router.get('/profile-completion', authenticate, requireBusinessOwner, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user._id })
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' })
    }

    // Calculate profile completion percentage
    const requiredFields = [
      'businessName', 'ownerName', 'email', 'phone', 
      'address', 'city', 'category', 'description'
    ]
    
    const optionalFields = [
      'website', 'descriptionGerman', 'descriptionPersian', 
      'logo', 'workingHours'
    ]

    let completedRequired = 0
    let completedOptional = 0

    requiredFields.forEach(field => {
      if (business[field] && business[field].toString().trim()) {
        completedRequired++
      }
    })

    optionalFields.forEach(field => {
      if (field === 'workingHours') {
        if (business[field] && business[field].length > 0) {
          completedOptional++
        }
      } else if (business[field] && business[field].toString().trim()) {
        completedOptional++
      }
    })

    const requiredPercentage = (completedRequired / requiredFields.length) * 70 // 70% weight
    const optionalPercentage = (completedOptional / optionalFields.length) * 30 // 30% weight
    const totalPercentage = Math.round(requiredPercentage + optionalPercentage)

    const missingFields = requiredFields.filter(field => 
      !business[field] || !business[field].toString().trim()
    )

    res.json({
      completionPercentage: totalPercentage,
      requiredCompleted: completedRequired,
      requiredTotal: requiredFields.length,
      optionalCompleted: completedOptional,
      optionalTotal: optionalFields.length,
      missingRequiredFields: missingFields,
      isProfileComplete: completedRequired === requiredFields.length
    })
  } catch (error) {
    console.error('Profile completion error:', error)
    res.status(500).json({ message: 'Error checking profile completion' })
  }
})

module.exports = router