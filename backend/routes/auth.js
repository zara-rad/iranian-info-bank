const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Business = require("../models/Business");
const Category = require("../models/Category");

const router = express.Router();

// 🔑 JWT
const generateToken = (userId, role = "business_owner") => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * 📝 REGISTER
 */
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("fullName").trim().isLength({ min: 2 }).withMessage("Full name must be at least 2 characters"),
    body("businessName").trim().isLength({ min: 2 }).withMessage("Business name must be at least 2 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array().map((err) => ({
            field: err.param,
            msg: err.msg,
            value: err.value,
          })),
        });
      }

      const {
        email,
        password,
        fullName,
        phone,
        businessName,
        category,
        subcategories,
        city,
        address,
        website,
        logo,
        description,
        descriptionGerman,
        descriptionPersian,
        workingHours,
      } = req.body;

      // 👤 Duplicate check
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // 👤 Create User
      const newUser = new User({
        email,
        password,
        fullName,
        phone,
        role: "business_owner",
        isActive: true,
      });
      await newUser.save();

      // 🏷️ Validate category
      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
      }

     // 🏢 Create Business with all fields
const business = new Business({
  owner: newUser._id,
  businessName,
  ownerName: fullName,
  email,
  phone,
  city: city || "",
  address: address || "",
  postalCode: req.body.postalCode || "",
  website: website || "",
  logo: logo || null,
  images: Array.isArray(req.body.images) ? req.body.images : [], // ✅ اضافه شد
  description: description || "",
  descriptionGerman: descriptionGerman || "",
  descriptionPersian: descriptionPersian || "",
  workingHours: Array.isArray(workingHours) ? workingHours : [],
  category: category || null,
  subcategories: Array.isArray(subcategories) ? subcategories : [],
  isVerified: false,
  isActive: true,
})

      await business.save();

      // 🔑 JWT
      const token = generateToken(newUser._id, newUser.role);

      res.status(201).json({
        message: "User and Business registered successfully",
        token,
        user: { id: newUser._id, email, fullName, role: newUser.role },
        business,
      });
    } catch (error) {
      console.error("❌ Registration error:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  }
);

module.exports = router;
