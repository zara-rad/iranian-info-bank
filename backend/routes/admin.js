const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Business = require('../models/Business')
const Event = require('../models/Event')
const Category = require('../models/Category')
const { body, validationResult } = require('express-validator')

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)
    
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      return res.status(403).json({ message: 'Admin access required' })
    }
    
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Middleware to check if user is super admin
const requireSuperAdmin = async (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Super admin access required' })
  }
  next()
}

// GET /api/admin/dashboard - Get dashboard statistics
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalBusinesses = await Business.countDocuments()
    const totalEvents = await Event.countDocuments()
    const activeUsers = await User.countDocuments({ isActive: true })
    const verifiedBusinesses = await Business.countDocuments({ isVerified: true })
    const pendingBusinesses = await Business.countDocuments({ isVerified: false })
    const publishedEvents = await Event.countDocuments({ status: 'published' })
    const paidBusinesses = await Business.countDocuments({ isPaid: true })

    // Calculate monthly revenue (mock calculation)
    const monthlyRevenue = paidBusinesses * 12 // €12 per business

    // Recent activity (last 10 activities)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5)
    const recentBusinesses = await Business.find().sort({ createdAt: -1 }).limit(5)
    const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(5)

    const stats = {
      totalUsers,
      totalBusinesses,
      totalEvents,
      activeUsers,
      verifiedBusinesses,
      pendingBusinesses,
      publishedEvents,
      paidBusinesses,
      monthlyRevenue,
      recentActivity: {
        users: recentUsers,
        businesses: recentBusinesses,
        events: recentEvents
      }
    }

    res.json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ message: 'Error fetching dashboard statistics' })
  }
})

// GET /api/admin/users - Get all users with pagination
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    const search = req.query.search || ''
    const role = req.query.role || ''

    let query = {}
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } }
      ]
    }
    if (role) {
      query.role = role
    }

    const users = await User.find(query)
      .select('-password')
      .populate('businessCategory', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments(query)

    res.json({
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Error fetching users' })
  }
})

// PUT /api/admin/users/:id/verify - Verify a user
router.put('/users/:id/verify', requireAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User verified successfully', user })
  } catch (error) {
    console.error('Verify user error:', error)
    res.status(500).json({ message: 'Error verifying user' })
  }
})

// PUT /api/admin/users/:id/toggle-active - Toggle user active status
router.put('/users/:id/toggle-active', requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.isActive = !user.isActive
    await user.save()

    res.json({ 
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, 
      user: { ...user.toObject(), password: undefined }
    })
  } catch (error) {
    console.error('Toggle user active error:', error)
    res.status(500).json({ message: 'Error updating user status' })
  }
})

// DELETE /api/admin/users/:id - Delete user (Super Admin only)
router.delete('/users/:id', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Also delete associated businesses
    await Business.deleteMany({ userId: req.params.id })

    res.json({ message: 'User and associated data deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Error deleting user' })
  }
})

// GET /api/admin/businesses - Get all businesses with pagination
router.get('/businesses', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    const search = req.query.search || ''
    const category = req.query.category || ''
    const city = req.query.city || ''
    const verified = req.query.verified

    let query = {}
    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { ownerName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    if (category) {
      query.category = category
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }
    if (verified !== undefined) {
      query.isVerified = verified === 'true'
    }

    const businesses = await Business.find(query)
      .populate('category', 'name nameGerman namePersian')
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Business.countDocuments(query)

    res.json({
      businesses,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Get businesses error:', error)
    res.status(500).json({ message: 'Error fetching businesses' })
  }
})

// PUT /api/admin/businesses/:id/verify - Verify a business
router.put('/businesses/:id/verify', requireAdmin, async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).populate('category', 'name')

    if (!business) {
      return res.status(404).json({ message: 'Business not found' })
    }

    res.json({ message: 'Business verified successfully', business })
  } catch (error) {
    console.error('Verify business error:', error)
    res.status(500).json({ message: 'Error verifying business' })
  }
})

// PUT /api/admin/businesses/:id/reject - Reject business verification
router.put('/businesses/:id/reject', requireAdmin, async (req, res) => {
  try {
    const { reason } = req.body
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { 
        isVerified: false,
        rejectionReason: reason,
        isActive: false
      },
      { new: true }
    )

    if (!business) {
      return res.status(404).json({ message: 'Business not found' })
    }

    res.json({ message: 'Business verification rejected', business })
  } catch (error) {
    console.error('Reject business error:', error)
    res.status(500).json({ message: 'Error rejecting business' })
  }
})

// DELETE /api/admin/businesses/:id - Delete business (Super Admin only)
router.delete('/businesses/:id', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id)
    if (!business) {
      return res.status(404).json({ message: 'Business not found' })
    }

    res.json({ message: 'Business deleted successfully' })
  } catch (error) {
    console.error('Delete business error:', error)
    res.status(500).json({ message: 'Error deleting business' })
  }
})

// GET /api/admin/events - Get all events with pagination
router.get('/events', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    const search = req.query.search || ''
    const status = req.query.status || ''
    const city = req.query.city || ''

    let query = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'organizer.name': { $regex: search, $options: 'i' } }
      ]
    }
    if (status) {
      query.status = status
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }

    const events = await Event.find(query)
      .populate('createdBy', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Event.countDocuments(query)

    res.json({
      events,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ message: 'Error fetching events' })
  }
})

// PUT /api/admin/events/:id/publish - Publish an event
router.put('/events/:id/publish', requireAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'published',
        approvedBy: req.user._id,
        approvedAt: new Date()
      },
      { new: true }
    )

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json({ message: 'Event published successfully', event })
  } catch (error) {
    console.error('Publish event error:', error)
    res.status(500).json({ message: 'Error publishing event' })
  }
})

// PUT /api/admin/events/:id/feature - Toggle event featured status
router.put('/events/:id/feature', requireAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    event.isFeatured = !event.isFeatured
    await event.save()

    res.json({ 
      message: `Event ${event.isFeatured ? 'featured' : 'unfeatured'} successfully`, 
      event 
    })
  } catch (error) {
    console.error('Feature event error:', error)
    res.status(500).json({ message: 'Error updating event featured status' })
  }
})

// DELETE /api/admin/events/:id - Delete event (Super Admin only)
router.delete('/events/:id', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ message: 'Error deleting event' })
  }
})

// POST /api/admin/users - Create new user (Super Admin only)
router.post('/users', requireAdmin, requireSuperAdmin, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('fullName').trim().isLength({ min: 2 }),
  body('role').isIn(['user', 'business_owner', 'admin', 'super_admin'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { email, password, fullName, role, businessName, phone } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    const user = new User({
      email,
      password,
      fullName,
      role,
      businessName,
      phone,
      isActive: true,
      isVerified: true,
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedAt: new Date()
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    })
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({ message: 'Error creating user' })
  }
})

// GET /api/admin/analytics - Get detailed analytics (Super Admin only)
router.get('/analytics', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // User analytics
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Business analytics
    const businessGrowth = await Business.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Category distribution
    const categoryStats = await Business.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      { $unwind: '$categoryInfo' },
      {
        $group: {
          _id: '$categoryInfo.name',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ])

    // City distribution
    const cityStats = await Business.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])

    res.json({
      userGrowth,
      businessGrowth,
      categoryStats,
      cityStats,
      period: days
    })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ message: 'Error fetching analytics' })
  }
})

module.exports = router