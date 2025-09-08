const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleGerman: { type: String },
  titlePersian: { type: String },
  
  description: { type: String, required: true },
  descriptionGerman: { type: String },
  descriptionPersian: { type: String },
  
  image: { type: String, required: true },
  
  // Event Details
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  
  // Location
  venue: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  
  // Contact & Links
  contactPhone: { type: String },
  contactEmail: { type: String },
  website: { type: String },
  ticketLink: { type: String },
  
  // Event Type & Categories
  eventType: { 
    type: String, 
    enum: ['cultural', 'business', 'educational', 'religious', 'entertainment', 'community'],
    default: 'cultural'
  },
  tags: [{ type: String }],
  
  // Pricing
  isFree: { type: Boolean, default: true },
  ticketPrice: { type: Number },
  currency: { type: String, default: 'EUR' },
  
  // Organizer
  organizer: {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  },
  
  // Status & Visibility
  status: { 
    type: String, 
    enum: ['draft', 'published', 'cancelled', 'completed', 'expired'],
    default: 'draft'
  },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  
  // Auto-expiration (48 hours after event end)
  expirationDate: { type: Date },
  
  // Analytics
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  
  // Admin fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date }
}, {
  timestamps: true
})

// Set expiration date automatically
eventSchema.pre('save', function(next) {
  if (this.startDate && !this.expirationDate) {
    const eventEndDate = this.endDate || this.startDate
    this.expirationDate = new Date(eventEndDate.getTime() + (48 * 60 * 60 * 1000)) // 48 hours after event
  }
  next()
})

// Indexes
eventSchema.index({ startDate: 1, status: 1 })
eventSchema.index({ city: 1, status: 1 })
eventSchema.index({ eventType: 1, status: 1 })
eventSchema.index({ expirationDate: 1 })
eventSchema.index({ createdAt: -1 })
eventSchema.index({ isFeatured: -1, startDate: 1 })

module.exports = mongoose.model('Event', eventSchema)