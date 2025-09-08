const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

// GET /api/categories - Get all active categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .select('-__v')
    
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Error fetching categories' })
  }
})

// GET /api/categories/:id - Get category by ID with subcategories
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).select('-__v')
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    res.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ message: 'Error fetching category' })
  }
})

// GET /api/categories/slug/:slug - Get category by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).select('-__v')
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    res.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ message: 'Error fetching category' })
  }
})

module.exports = router