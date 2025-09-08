const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  // Personal Information
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  
  // Account Type & Status
  role: { 
    type: String, 
    enum: ['user', 'business_owner', 'admin', 'super_admin'],
    default: 'business_owner'
  },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  
  // Business Information (if business owner)
  businessName: { type: String },
  businessCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  businessSubcategories: [{ type: mongoose.Schema.Types.ObjectId }],
  
  // Payment Information
  hasActivePlan: { type: Boolean, default: false },
  planType: { 
    type: String, 
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic'
  },
  paymentHistory: [{
    amount: { type: Number },
    currency: { type: String, default: 'EUR' },
    paymentMethod: { type: String },
    paymentDate: { type: Date },
    transactionId: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
  }],
  subscriptionExpiry: { type: Date },
  
  // Profile & Preferences
  profilePicture: { type: String },
  language: { type: String, default: 'en' },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    marketing: { type: Boolean, default: false }
  },
  
  // Account Security
  lastLogin: { type: Date },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  
  // Email Verification
  emailVerificationToken: { type: String },
  emailVerificationExpires: { type: Date },
  
  // Password Reset
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  
  // Terms & Privacy
  acceptedTerms: { type: Boolean, default: false },
  acceptedPrivacy: { type: Boolean, default: false },
  acceptedAt: { type: Date },
  
  // Admin notes (for super admin use)
  adminNotes: { type: String }
}, {
  timestamps: true
})

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ role: 1, isActive: 1 })
userSchema.index({ businessCategory: 1 })
userSchema.index({ hasActivePlan: 1 })

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash password if it's been modified
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw error
  }
}

// Increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    })
  }
  
  const updates = { $inc: { loginAttempts: 1 } }
  
  // Lock account after 5 attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }
  }
  
  return this.updateOne(updates)
}

module.exports = mongoose.model('User', userSchema)