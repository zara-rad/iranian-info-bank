const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameGerman: { type: String },
    namePersian: { type: String },

    description: { type: String },
    descriptionGerman: { type: String },
    descriptionPersian: { type: String },

    slug: { type: String, required: true, unique: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

subcategorySchema.index({ slug: 1 });
subcategorySchema.index({ category: 1 });

module.exports = mongoose.model("Subcategory", subcategorySchema);
