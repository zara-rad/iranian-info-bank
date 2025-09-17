const express = require("express");
const { body, validationResult } = require("express-validator");
const { authenticate } = require("../middleware/auth");
const Business = require("../models/Business");
const Category = require("../models/Category");

const router = express.Router();

// =========================
// GET all businesses
// =========================
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      subcategory,
      businessCategory,
      businessSubcategories,
      city,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = { isActive: true };

    if (category || businessCategory) query.category = category || businessCategory;
    if (subcategory || businessSubcategories)
      query.subcategories = { $in: [subcategory || businessSubcategories] };
    if (city) query.city = { $regex: city, $options: "i" };

    const businesses = await Business.find(query)
      .populate("category", "name nameGerman namePersian icon")
      .populate("owner", "fullName email")
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Business.countDocuments(query);

    res.json({ businesses, total, page: parseInt(page) });
  } catch (err) {
    console.error("Get businesses error:", err);
    res.status(500).json({ message: "Error fetching businesses" });
  }
});

// =========================
// GET business by id
// =========================
router.get("/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate("category", "name nameGerman namePersian icon")
      .populate("owner", "fullName email");

    if (!business) return res.status(404).json({ message: "Business not found" });

    await Business.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: "Error fetching business" });
  }
});

// =========================
// CREATE
// =========================
router.post(
  "/",
  authenticate,
  [
    body("businessName").trim().isLength({ min: 2 }),
    body("email").isEmail(),
    body("phone").trim().isLength({ min: 10 }),
    body("address").trim().isLength({ min: 2 }),
    body("city").trim().isLength({ min: 2 }),
    body("category").isMongoId(),

    // optional fields
    body("website").optional().isString(),
    body("logo").optional().isString(),
    body("images").optional().isArray(),
    body("description").optional().isString(),
    body("descriptionGerman").optional().isString(),
    body("descriptionPersian").optional().isString(),
    body("workingHours").optional().isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).json({ message: "Invalid category" });

      const business = new Business({
        owner: req.user._id,
        businessName: req.body.businessName,
        ownerName: req.user.fullName,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website || "",
        description: req.body.description || "",
        descriptionGerman: req.body.descriptionGerman || "",
        descriptionPersian: req.body.descriptionPersian || "",
        address: req.body.address || "",
        city: req.body.city || "",
        category: req.body.category,
        subcategories: req.body.subcategories || [],
        workingHours: req.body.workingHours || [],
        logo: req.body.logo || null,
        images: req.body.images || [],
      });

      await business.save();
      res.status(201).json(business);
    } catch (err) {
      console.error("Error creating business:", err);
      res.status(500).json({ message: "Error creating business" });
    }
  }
);

// =========================
// UPDATE
// =========================
router.put("/:id", authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const isOwner = business.owner.toString() === req.user._id.toString();
    const isAdmin = ["admin", "super_admin"].includes(req.user.role);
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Access denied" });

    Object.assign(business, req.body);
    await business.save();

    res.json(business);
  } catch (err) {
    res.status(500).json({ message: "Error updating business" });
  }
});

// =========================
// DELETE
// =========================
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const isOwner = business.owner.toString() === req.user._id.toString();
    const isAdmin = ["admin", "super_admin"].includes(req.user.role);
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Access denied" });

    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting business" });
  }
});

module.exports = router;
