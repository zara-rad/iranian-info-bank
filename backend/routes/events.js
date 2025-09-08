const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const { authenticate, requireAdmin } = require('../middleware/auth')
const { body, validationResult } = require('express-validator')

// GET /api/events - Get all active events
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      city,
      eventType,
      featured,
      upcoming = 'true',
      sortBy = 'startDate',
      sortOrder = 'asc'
    } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Build query
    let query = { 
      status: 'published',
      isActive: true
    }
    
    // Only show upcoming events by default
    if (upcoming === 'true') {
      query.startDate = { $gte: new Date() }
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleGerman: { $regex: search, $options: 'i' } },
        { titlePersian: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'organizer.name': { $regex: search, $options: 'i' } }
      ]
    }
    
    if (city) {
      query.city = { $regex: city, $options: 'i' }
    }
    
    if (eventType) {
      query.eventType = eventType
    }
    
    if (featured !== undefined) {
      query.isFeatured = featured === 'true'
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1

    const events = await Event.find(query)
      .populate('createdBy', 'fullName email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v')

    const total = await Event.countDocuments(query)

    res.json({
      events,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    })
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ message: 'Error fetching events' })
  }
})

// GET /api/events/:id - Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ 
      _id: req.params.id,
      status: 'published',
      isActive: true 
    })
    .populate('createdBy', 'fullName email')
    .select('-__v')

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Increment view count
    await Event.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })

    res.json(event)
  } catch (error) {
    console.error('Get event error:', error)
    res.status(500).json({ message: 'Error fetching event' })
  }
})

// POST /api/events - Create new event (authenticated users only)
router.post('/', authenticate, [
  body('title').trim().isLength({ min: 5 }),
  body('description').trim().isLength({ min: 20 }),
  body('startDate').isISO8601(),
  body('venue').trim().isLength({ min: 3 }),
  body('address').trim().isLength({ min: 10 }),
  body('city').trim().isLength({ min: 2 }),
  body('organizer.name').trim().isLength({ min: 2 }),
  body('eventType').isIn(['cultural', 'business', 'educational', 'religious', 'entertainment', 'community'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const event = new Event({
      ...req.body,
      createdBy: req.user._id,
      status: 'draft' // Requires admin approval
    })

    await event.save()
    
    const populatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'fullName email')

    res.status(201).json({
      message: 'Event created successfully. Pending approval.',
      event: populatedEvent
    })
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ message: 'Error creating event' })
  }
})

// PUT /api/events/:id - Update event (creator or admin only)
router.put('/:id', authenticate, [
  body('title').optional().trim().isLength({ min: 5 }),
  body('description').optional().trim().isLength({ min: 20 }),
  body('startDate').optional().isISO8601(),
  body('venue').optional().trim().isLength({ min: 3 }),
  body('address').optional().trim().isLength({ min: 10 }),
  body('city').optional().trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Check ownership or admin rights
    const isCreator = event.createdBy.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin'
    
    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' })
    }

    // Update event
    Object.assign(event, req.body)
    
    // If significant changes made by creator, require re-approval
    if (isCreator && (req.body.title || req.body.startDate || req.body.venue)) {
      event.status = 'draft'
    }

    await event.save()

    const updatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'fullName email')

    res.json({
      message: 'Event updated successfully',
      event: updatedEvent
    })
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({ message: 'Error updating event' })
  }
})

// DELETE /api/events/:id - Delete event (creator or admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Check ownership or admin rights
    const isCreator = event.createdBy.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin'
    
    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' })
    }

    await Event.findByIdAndDelete(req.params.id)

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ message: 'Error deleting event' })
  }
})

// GET /api/events/user/:userId - Get events by user ID
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    // Check if requesting own events or admin
    const isOwner = req.params.userId === req.user._id.toString()
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin'
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' })
    }

    const events = await Event.find({ 
      createdBy: req.params.userId,
      isActive: true 
    })
    .sort({ createdAt: -1 })

    res.json(events)
  } catch (error) {
    console.error('Get user events error:', error)
    res.status(500).json({ message: 'Error fetching user events' })
  }
})

// POST /api/events/:id/click - Track event clicks
router.post('/:id/click', async (req, res) => {
  try {
    await Event.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } }
    )

    res.json({ message: 'Event click tracked' })
  } catch (error) {
    console.error('Track event click error:', error)
    res.status(500).json({ message: 'Error tracking event click' })
  }
})

// GET /api/events/featured/list - Get featured events
router.get('/featured/list', async (req, res) => {
  try {
    const events = await Event.find({
      status: 'published',
      isActive: true,
      isFeatured: true,
      startDate: { $gte: new Date() }
    })
    .populate('createdBy', 'fullName')
    .sort({ startDate: 1 })
    .limit(5)

    res.json(events)
  } catch (error) {
    console.error('Get featured events error:', error)
    res.status(500).json({ message: 'Error fetching featured events' })
  }
})

module.exports = router