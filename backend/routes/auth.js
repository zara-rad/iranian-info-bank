const express = require('express')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const router = express.Router()

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// POST /api/auth/register - User registration
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('fullName').trim().isLength({ min: 2 }),
  body('businessName').optional().trim(),
  body('acceptedTerms').equals('true').withMessage('You must accept the terms and privacy policy')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { 
      email, 
      password, 
      fullName, 
      phone, 
      businessName, 
      businessCategory,
      businessSubcategories,
      acceptedTerms
    } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    // Create new user
    const user = new User({
      email,
      password,
      fullName,
      phone,
      businessName,
      businessCategory,
      businessSubcategories,
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedAt: new Date()
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Error registering user' })
  }
})

// POST /api/auth/login - User login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { email, password } = req.body

    // Find user and include password for comparison
    const user = await User.findOne({ email, isActive: true })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({ message: 'Account temporarily locked due to too many failed login attempts' })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts()
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 },
        $set: { lastLogin: new Date() }
      })
    }

    // Generate token
    const token = generateToken(user._id)

    // Remove sensitive data from response
    const userResponse = user.toObject()
    delete userResponse.password
    delete userResponse.loginAttempts
    delete userResponse.lockUntil

    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Error logging in' })
  }
})

module.exports = router