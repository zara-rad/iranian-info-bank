const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Business = require("../models/Business");

// ✅ GET /api/categories - Get all active categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .select("-__v");

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// ✅ GET /api/categories/slug/:slug - Get category by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    }).lean();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Count businesses in this category
    const totalBusinesses = await Business.countDocuments({
      category: category._id,
      isActive: true,
    });

    category.businessCount = totalBusinesses;

    // Count for each subcategory
    const subsWithCounts = await Promise.all(
      category.subcategories.map(async (sub) => {
        const count = await Business.countDocuments({
          subcategories: sub._id,
          isActive: true,
        });
        return { ...sub, businessCount: count };
      })
    );

    category.subcategories = subsWithCounts;

    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Error fetching category" });
  }
});

// ✅ GET /api/categories/:id - Get category by ObjectId with subcategories + business counts
router.get("/:id([0-9a-fA-F]{24})", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Count total businesses in this category
    const totalBusinesses = await Business.countDocuments({
      category: category._id,
      isActive: true,
    });

    category.businessCount = totalBusinesses;

    // Count businesses for each subcategory
    const subsWithCounts = await Promise.all(
      category.subcategories.map(async (sub) => {
        const count = await Business.countDocuments({
          subcategories: sub._id,
          isActive: true,
        });
        return { ...sub, businessCount: count };
      })
    );

    category.subcategories = subsWithCounts;

    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Error fetching category" });
  }
});

module.exports = router;
