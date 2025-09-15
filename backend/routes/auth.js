const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Business = require("../models/Business");
const Category = require("../models/Category");

const router = express.Router();

// Generate JWT
const generateToken = (userId, role = "business_owner") => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * REGISTER
 */
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail({ gmail_remove_dots: false }),
    body("password").isLength({ min: 6 }),
    body("fullName").trim().isLength({ min: 2 }),
    body("businessName").trim().isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation failed", errors: errors.array() });
      }

      const {
        email,
        password,
        fullName,
        phone,
        businessName,
        businessCategory,
        businessSubcategories,
        city,
        address,
      } = req.body;

      // Check duplicate
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create user
      const newUser = new User({
        email,
        password,
        fullName,
        phone,
        role: "business_owner",
        isActive: true,
      });
      await newUser.save();
      console.log("✅ User saved:", newUser._id);

      // Validate category ID
      if (businessCategory) {
        const categoryExists = await Category.findById(businessCategory);
        if (!categoryExists) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
      }

      // Create business
      const business = new Business({
        owner: newUser._id,
        businessName,
        ownerName: fullName,
        email,
        phone,
        city: city || "",
        address: address || "",
        category: businessCategory || null,
        subcategories: businessSubcategories || [],
        isVerified: false,
        isActive: true,
      });
      await business.save();
      console.log("✅ Business saved:", business._id);

      // Generate token
      const token = generateToken(newUser._id, newUser.role);

      res.status(201).json({
        message: "User and Business registered successfully",
        token,
        user: { id: newUser._id, email, fullName, role: newUser.role },
        business,
      });
    } catch (error) {
      console.error("❌ Registration error:", error);
      res.status(500).json({ message: "Error registering user and business" });
    }
  }
);

/**
 * LOGIN
 */
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, isActive: true }).select(
        "+password"
      );

      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user._id, user.role);
      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({ message: "Login successful", token, user: userResponse });
    } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  }
);

module.exports = router;
