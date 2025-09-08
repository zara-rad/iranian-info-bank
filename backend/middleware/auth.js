const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'super_admin')) {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

// Middleware to check if user is super admin
const requireSuperAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Super admin access required' })
  }
  next()
}

// Middleware to check if user owns the resource or is admin
const requireOwnershipOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin'
    const isOwner = req.user._id.toString() === req[resourceUserIdField]?.toString()
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    next()
  }
}

module.exports = {
  authenticate,
  requireAdmin,
  requireSuperAdmin,
  requireOwnershipOrAdmin
}