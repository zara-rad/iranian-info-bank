const mongoose = require('mongoose')

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
  // Localized names
  name: { type: String, required: true },
  nameGerman: { type: String, required: true },
  namePersian: { type: String, required: true },

  // Descriptions (optional, can be localized)
  description: { type: String },
  descriptionGerman: { type: String },
  descriptionPersian: { type: String },

  // Slug for clean URLs (e.g., "general-practitioners")
  slug: { type: String, required: true, unique: true },

  // Visibility
  isActive: { type: Boolean, default: true }
})

// Category Schema
const categorySchema = new mongoose.Schema({
  // Localized names
  name: { type: String, required: true },
  nameGerman: { type: String, required: true },
  namePersian: { type: String, required: true },

  // Descriptions
  description: { type: String },
  descriptionGerman: { type: String },
  descriptionPersian: { type: String },

  // Icon + Image for UI
  icon: { type: String },
  image: { type: String },

  // Slug for clean URLs (e.g., "medical-healthcare")
  slug: { type: String, required: true, unique: true },

  // Embedded subcategories
  subcategories: [subcategorySchema],

  // Visibility + ordering
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true // Automatically adds createdAt & updatedAt
})

// Indexes for faster queries
categorySchema.index({ slug: 1 })
categorySchema.index({ name: 1 })
categorySchema.index({ nameGerman: 1 })
categorySchema.index({ namePersian: 1 })
categorySchema.index({ sortOrder: 1 })

module.exports = mongoose.model('Category', categorySchema)



// const mongoose = require('mongoose')

// const subcategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   nameGerman: { type: String, required: true },
//   namePersian: { type: String, required: true },
//   description: { type: String },
//   descriptionGerman: { type: String },
//   descriptionPersian: { type: String },
//   slug: { type: String, required: true, unique: true },
//   isActive: { type: Boolean, default: true }
// })

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   nameGerman: { type: String, required: true },
//   namePersian: { type: String, required: true },
//   description: { type: String },
//   descriptionGerman: { type: String },
//   descriptionPersian: { type: String },
//   icon: { type: String },
//   image: { type: String },
//   slug: { type: String, required: true, unique: true },
//   subcategories: [subcategorySchema],
//   isActive: { type: Boolean, default: true },
//   sortOrder: { type: Number, default: 0 }
// }, {
//   timestamps: true
// })

// // Create indexes
// categorySchema.index({ slug: 1 })
// categorySchema.index({ name: 1 })
// categorySchema.index({ nameGerman: 1 })
// categorySchema.index({ namePersian: 1 })
// categorySchema.index({ sortOrder: 1 })

// module.exports = mongoose.model('Category', categorySchema)