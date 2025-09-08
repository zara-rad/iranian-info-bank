const express = require('express')
const router = express.Router()
const Business = require('../models/Business')
const Event = require('../models/Event')
const Category = require('../models/Category')

// GET /api/search - Global search across businesses, events, and categories
router.get('/', async (req, res) => {
  try {
    const { 
      q: query, 
      type = 'all', 
      city, 
      category,
      page = 1, 
      limit = 20 
    } = req.query

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' })
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const searchRegex = { $regex: query, $options: 'i' }
    
    let results = {
      businesses: [],
      events: [],
      categories: [],
      total: 0
    }

    // Search businesses
    if (type === 'all' || type === 'businesses') {
      let businessQuery = {
        isActive: true,
        isVerified: true,
        $or: [
          { businessName: searchRegex },
          { description: searchRegex },
          { descriptionGerman: searchRegex },
          { descriptionPersian: searchRegex },
          { ownerName: searchRegex }
        ]
      }

      if (city) {
        businessQuery.city = { $regex: city, $options: 'i' }
      }

      if (category) {
        businessQuery.category = category
      }

      const businesses = await Business.find(businessQuery)
        .populate('category', 'name nameGerman namePersian icon')
        .populate('userId', 'fullName')
        .sort({ averageRating: -1, views: -1 })
        .skip(type === 'businesses' ? skip : 0)
        .limit(type === 'businesses' ? parseInt(limit) : 10)

      results.businesses = businesses
    }

    // Search events
    if (type === 'all' || type === 'events') {
      let eventQuery = {
        status: 'published',
        isActive: true,
        startDate: { $gte: new Date() },
        $or: [
          { title: searchRegex },
          { titleGerman: searchRegex },
          { titlePersian: searchRegex },
          { description: searchRegex },
          { descriptionGerman: searchRegex },
          { descriptionPersian: searchRegex },
          { 'organizer.name': searchRegex }
        ]
      }

      if (city) {
        eventQuery.city = { $regex: city, $options: 'i' }
      }

      const events = await Event.find(eventQuery)
        .populate('createdBy', 'fullName')
        .sort({ isFeatured: -1, startDate: 1 })
        .skip(type === 'events' ? skip : 0)
        .limit(type === 'events' ? parseInt(limit) : 5)

      results.events = events
    }

    // Search categories
    if (type === 'all' || type === 'categories') {
      const categories = await Category.find({
        isActive: true,
        $or: [
          { name: searchRegex },
          { nameGerman: searchRegex },
          { namePersian: searchRegex },
          { description: searchRegex },
          { descriptionGerman: searchRegex },
          { descriptionPersian: searchRegex }
        ]
      })
      .sort({ sortOrder: 1, name: 1 })
      .limit(type === 'categories' ? parseInt(limit) : 5)

      results.categories = categories
    }

    // Calculate total results
    results.total = results.businesses.length + results.events.length + results.categories.length

    // Add search suggestions if no results found
    if (results.total === 0) {
      const suggestions = await generateSearchSuggestions(query)
      results.suggestions = suggestions
    }

    res.json({
      query,
      results,
      pagination: {
        current: parseInt(page),
        limit: parseInt(limit),
        total: results.total
      }
    })

  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ message: 'Error performing search' })
  }
})

// GET /api/search/suggestions - Get search suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { q: query } = req.query

    if (!query || query.length < 2) {
      return res.json({ suggestions: [] })
    }

    const searchRegex = { $regex: query, $options: 'i' }
    
    // Get business name suggestions
    const businessSuggestions = await Business.find({
      isActive: true,
      isVerified: true,
      businessName: searchRegex
    })
    .select('businessName city')
    .limit(5)

    // Get city suggestions
    const citySuggestions = await Business.distinct('city', {
      isActive: true,
      city: searchRegex
    })

    // Get category suggestions
    const categorySuggestions = await Category.find({
      isActive: true,
      $or: [
        { name: searchRegex },
        { nameGerman: searchRegex }
      ]
    })
    .select('name nameGerman')
    .limit(3)

    const suggestions = [
      ...businessSuggestions.map(b => ({
        type: 'business',
        text: b.businessName,
        subtitle: b.city
      })),
      ...citySuggestions.slice(0, 5).map(city => ({
        type: 'city',
        text: city,
        subtitle: 'City'
      })),
      ...categorySuggestions.map(c => ({
        type: 'category',
        text: c.name,
        subtitle: c.nameGerman
      }))
    ]

    res.json({ suggestions: suggestions.slice(0, 10) })

  } catch (error) {
    console.error('Search suggestions error:', error)
    res.status(500).json({ message: 'Error fetching search suggestions' })
  }
})

// Helper function to generate search suggestions when no results found
async function generateSearchSuggestions(query) {
  try {
    // Get popular cities
    const popularCities = await Business.aggregate([
      { $match: { isActive: true, isVerified: true } },
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    // Get popular categories
    const popularCategories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .limit(5)
      .select('name nameGerman')

    return {
      cities: popularCities.map(c => c._id),
      categories: popularCategories.map(c => c.name),
      message: `No results found for "${query}". Try searching for:`
    }
  } catch (error) {
    console.error('Generate suggestions error:', error)
    return { cities: [], categories: [], message: 'No results found' }
  }
}

module.exports = router