const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
  // Basic Information
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  
  // Descriptions in multiple languages
  description: { type: String },
  descriptionGerman: { type: String },
  descriptionPersian: { type: String },
  
  // Location
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  
  // Categories
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId }],
  
  // Business Details
  workingHours: [{
    day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    open: { type: String },
    close: { type: String },
    isClosed: { type: Boolean, default: false }
  }],
  
  // Media
  logo: { type: String },
  images: [{ type: String }],
  
  // Ratings & Reviews
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  
  // Verification & Status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isPaid: { type: Boolean, default: false },
  paymentDate: { type: Date },
  expirationDate: { type: Date },
  
  // User Association
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // SEO
  slug: { type: String, unique: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: [{ type: String }],
  
  // Analytics
  views: { type: Number, default: 0 },
  clicksPhone: { type: Number, default: 0 },
  clicksEmail: { type: Number, default: 0 },
  clicksWebsite: { type: Number, default: 0 }
}, {
  timestamps: true
})

// Indexes
businessSchema.index({ businessName: 'text', description: 'text' })
businessSchema.index({ city: 1 })
businessSchema.index({ category: 1 })
businessSchema.index({ subcategories: 1 })
businessSchema.index({ isActive: 1, isVerified: 1 })
businessSchema.index({ averageRating: -1 })
businessSchema.index({ createdAt: -1 })
businessSchema.index({ slug: 1 })

// Generate slug before saving
businessSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.businessName
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') + '-' + this.city.toLowerCase()
  }
  next()
})

module.exports = mongoose.model('Business', businessSchema)