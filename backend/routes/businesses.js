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
      .populate("subcategories", "name nameGerman namePersian")
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
      .populate("subcategories", "name nameGerman namePersian")
      .populate("owner", "fullName email");

    if (!business) return res.status(404).json({ message: "Business not found" });
   console.log("📌 Business fetched:", business);
    await Business.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: "Error fetching business" });
  }
});
// =========================
// TEST populate subcategories
// =========================
router.get("/test/:id", async (req, res) => {
  try {
    const biz = await Business.findById(req.params.id)
      .populate({
        path: "subcategories",
        model: "Subcategory",
        select: "name nameGerman namePersian"
      });

    res.json(biz);
  } catch (err) {
    console.error("❌ Populate test failed:", err);
    res.status(500).json({ message: "Populate test failed" });
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
    body("phone").trim().isLength({ min: 5 }),
    body("address").trim().isLength({ min: 2 }),
    body("city").trim().isLength({ min: 2 }),
    body("postalCode").trim().isLength({ min: 3 }),
    body("category").isMongoId(),

    // optional fields
    body("website").optional().isString(),
    body("logo").optional().isString(),
    body("images").optional().isArray(),
    body("description").optional().isString(),
    body("descriptionGerman").optional().isString(),
    body("descriptionPersian").optional().isString(),
    body("workingHours").optional().isArray(),
    body("paymentMethod").optional().isString(),
  ],
  async (req, res) => {
    try {
            console.log("📥 Incoming business POST body:", req.body);  // 👈 اینجا اضافه کن
 // ✅ اطمینان از آرایه بودن subcategories
      if (req.body.subcategories && !Array.isArray(req.body.subcategories)) {
        req.body.subcategories = [req.body.subcategories];
      }
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).json({ message: "Invalid category" });

      const business = new Business({
        ...req.body,
        owner: req.user._id,
        ownerName: req.user.fullName,
      });

      await business.save();

      const fullBusiness = await Business.findById(business._id)
        .populate("category", "name nameGerman namePersian icon")
        .populate("subcategories", "name nameGerman namePersian")
        .populate("owner", "fullName email");

      res.status(201).json(fullBusiness);
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
    console.log("📥 Incoming business UPDATE body:", req.body);

    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const isOwner = business.owner.toString() === req.user._id.toString();
    const isAdmin = ["admin", "super_admin"].includes(req.user.role);
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Access denied" });

    const allowedFields = [
      "businessName",
      "ownerName",
      "email",
      "phone",
      "website",
      "address",
      "city",
      "state",
      "postalCode",
      "description",
      "descriptionGerman",
      "descriptionPersian",
      "workingHours",
      "category",
      "subcategories",
      "logo",
      "images",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "subcategories") {
          // ✅ فقط اگر آرایه خالی نباشه، آپدیت کن
          if (Array.isArray(req.body.subcategories) && req.body.subcategories.length > 0) {
            business.subcategories = req.body.subcategories;
          }
        } else {
          business[field] = req.body[field];
        }
      }
    });

    await business.save();

    // ✅ sync user
    const User = require("../models/User");
    await User.findByIdAndUpdate(
      business.owner,
      {
        fullName: business.ownerName || req.user.fullName,
        email: business.email,
        phone: business.phone,
      },
      { new: true }
    );

    const fullBusiness = await Business.findById(business._id)
      .populate("category", "name nameGerman namePersian icon")
      .populate("subcategories", "name nameGerman namePersian")
      .populate("owner", "fullName email");

    res.json(fullBusiness);
  } catch (err) {
    console.error("Error updating business:", err);
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
