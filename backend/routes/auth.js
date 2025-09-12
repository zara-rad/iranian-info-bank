const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("fullName").trim().isLength({ min: 2 }),
    body("businessName").optional().trim(),
    body("acceptedTerms")
      .equals("true")
      .withMessage("You must accept the terms and privacy policy"),
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
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      // Create new user
      const user = new User({
        email,
        password,
        fullName,
        phone,
        businessName,
        businessCategory,
        businessSubcategories,
        acceptedTerms: true,
        acceptedPrivacy: true,
        acceptedAt: new Date(),
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Return safe response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: userResponse,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  }
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user (supports super admin via ENV)
 */
router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation failed", errors: errors.array() });
      }

      const { email, password } = req.body;

      // ✅ Super Admin Login (from .env)
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign(
          { email, role: "super_admin" },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE }
        );
        return res.json({
          message: "Super admin login successful",
          token,
          user: {
            id: "super-admin",
            email,
            fullName: "Super Admin",
            role: "super_admin",
          },
        });
      }

      // ✅ Regular User Login
      const user = await User.findOne({ email, isActive: true });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if account is locked
      if (user.isLocked) {
        return res
          .status(423)
          .json({ message: "Account temporarily locked due to failed attempts" });
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        await user.incLoginAttempts();
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Reset login attempts
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.loginAttempts;
      delete userResponse.lockUntil;

      res.json({
        message: "Login successful",
        token,
        user: userResponse,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  }
);

module.exports = router;
