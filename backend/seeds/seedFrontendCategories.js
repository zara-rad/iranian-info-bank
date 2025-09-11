const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

// Import your frontend categories
const { categories } = require("../data/categories"); // adjust path if needed

const seedFrontendCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🌱 Connected to MongoDB");

    // Clear old categories
    await Category.deleteMany({});
    console.log("🗑️  Cleared old categories");

    // Transform frontend categories into schema-compatible docs
    const docs = categories.map((cat) => ({
      name: cat.name,
      nameGerman: cat.nameGerman,
      namePersian: cat.namePersian,
      description: cat.description || "",
      icon: cat.icon,
      image: cat.image,
      slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
      sortOrder: cat.id, // use your frontend id as order
      subcategories: cat.subcategories.map((sub) => ({
        name: sub.name,
        nameGerman: sub.nameGerman,
        namePersian: sub.namePersian,
        description: sub.description || "",
        slug: sub.name.toLowerCase().replace(/\s+/g, "-"),
        isActive: true,
      })),
      isActive: true,
    }));

    await Category.insertMany(docs);
    console.log(`✅ Inserted ${docs.length} categories into DB`);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding categories:", err);
    process.exit(1);
  }
};

seedFrontendCategories();
