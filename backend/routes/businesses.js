const express = require("express");
const { body, validationResult } = require("express-validator");
const { authenticate } = require("../middleware/auth");
const Business = require("../models/Business");
const Category = require("../models/Category");

const router = express.Router();

// GET all businesses
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

// GET business by id
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

// CREATE
router.post(
  "/",
  authenticate,
  [
    body("businessName").trim().isLength({ min: 2 }),
    body("email").isEmail(),
    body("phone").trim().isLength({ min: 10 }),
    body("address").trim().isLength({ min: 5 }),
    body("city").trim().isLength({ min: 2 }),
    body("category").isMongoId(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).json({ message: "Invalid category" });

      const business = new Business({
        ...req.body,
        owner: req.user._id,
      });

      await business.save();
      res.status(201).json(business);
    } catch (err) {
      res.status(500).json({ message: "Error creating business" });
    }
  }
);

// UPDATE
router.put("/:id", authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const isOwner = business.owner.toString() === req.user._id.toString();
    const isAdmin = ["admin", "super_admin"].includes(req.user.role);
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Access denied" });

    Object.assign(business, req.body);
    await business.save();

    res.json(business);
  } catch (err) {
    res.status(500).json({ message: "Error updating business" });
  }
});

// DELETE
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    const isOwner = business.owner.toString() === req.user._id.toString();
    const isAdmin = ["admin", "super_admin"].includes(req.user.role);
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Access denied" });

    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting business" });
  }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Business = require("../models/Business");
// const Category = require("../models/Category");
// const { authenticate } = require("../middleware/auth");
// const { body, validationResult } = require("express-validator");

// /**
//  * ✅ GET /api/businesses
//  * لیست همه بیزنس‌ها با فیلتر و صفحه‌بندی
//  */
// router.get("/", async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 20,
//       search,
//       category,
//       subcategory,
//       businessCategory,
//       businessSubcategories,
//       city,
//       verified,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//     } = req.query;

//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     let query = { isActive: true };

//     if (search) {
//       query.$or = [
//         { businessName: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//         { descriptionGerman: { $regex: search, $options: "i" } },
//         { descriptionPersian: { $regex: search, $options: "i" } },
//       ];
//     }

//     if (category || businessCategory) {
//       query.category = category || businessCategory;
//     }

//     if (subcategory || businessSubcategories) {
//       query.subcategories = { $in: [subcategory || businessSubcategories] };
//     }

//     if (city) {
//       query.city = { $regex: city, $options: "i" };
//     }

//     if (verified !== undefined) {
//       query.isVerified = verified === "true";
//     }

//     const sort = {};
//     sort[sortBy] = sortOrder === "desc" ? -1 : 1;

//     const businesses = await Business.find(query)
//       .populate("category", "name nameGerman namePersian icon")
//       .populate("subcategories", "name nameGerman namePersian") // ✅ populate subcategories
//       .populate("owner", "fullName email")
//       .sort(sort)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .select("-__v");

//     const total = await Business.countDocuments(query);

//     res.json({
//       businesses,
//       pagination: {
//         current: parseInt(page),
//         pages: Math.ceil(total / parseInt(limit)),
//         total,
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     console.error("Get businesses error:", error);
//     res.status(500).json({ message: "Error fetching businesses" });
//   }
// });

// /**
//  * ✅ GET /api/businesses/:id
//  * دریافت جزئیات یک بیزنس
//  */
// router.get("/:id", async (req, res) => {
//   try {
//     const business = await Business.findOne({
//       _id: req.params.id,
//       isActive: true,
//     })
//       .populate("category", "name nameGerman namePersian icon")
//       .populate("subcategories", "name nameGerman namePersian")
//       .populate("owner", "fullName email phone")
//       .select("-__v");

//     if (!business) {
//       return res.status(404).json({ message: "Business not found" });
//     }

//     await Business.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

//     res.json(business);
//   } catch (error) {
//     console.error("Get business error:", error);
//     res.status(500).json({ message: "Error fetching business" });
//   }
// });

// /**
//  * ✅ POST /api/businesses
//  * ایجاد بیزنس جدید
//  */
// router.post(
//   "/",
//   authenticate,
//   [
//     body("businessName").trim().isLength({ min: 2 }),
//     body("ownerName").trim().isLength({ min: 2 }),
//     body("email").isEmail().normalizeEmail(),
//     body("phone").trim().isLength({ min: 5 }),
//     body("category").isMongoId(),
//     body("subcategories").optional().isArray(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res
//           .status(400)
//           .json({ message: "Validation failed", errors: errors.array() });
//       }

//       const category = await Category.findById(req.body.category);
//       if (!category) {
//         return res.status(400).json({ message: "Invalid category" });
//       }

//       const business = new Business({
//         ...req.body,
//         owner: req.user._id,
//         isVerified: false,
//         isActive: true,
//       });

//       await business.save();

//       const populatedBusiness = await Business.findById(business._id)
//         .populate("category", "name nameGerman namePersian")
//         .populate("subcategories", "name nameGerman namePersian")
//         .populate("owner", "fullName email");

//       res.status(201).json({
//         message: "Business created successfully. Pending verification.",
//         business: populatedBusiness,
//       });
//     } catch (error) {
//       console.error("Create business error:", error);
//       res.status(500).json({ message: "Error creating business" });
//     }
//   }
// );

// /**
//  * ✅ PUT /api/businesses/:id
//  * بروزرسانی بیزنس
//  */
// router.put(
//   "/:id",
//   authenticate,
//   [
//     body("businessName").optional().trim().isLength({ min: 2 }),
//     body("ownerName").optional().trim().isLength({ min: 2 }),
//     body("email").optional().isEmail().normalizeEmail(),
//     body("phone").optional().trim().isLength({ min: 5 }),
//     body("subcategories").optional().isArray(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res
//           .status(400)
//           .json({ message: "Validation failed", errors: errors.array() });
//       }

//       const business = await Business.findById(req.params.id);
//       if (!business) {
//         return res.status(404).json({ message: "Business not found" });
//       }

//       const isOwner = business.owner.toString() === req.user._id.toString();
//       const isAdmin =
//         req.user.role === "admin" || req.user.role === "super_admin";

//       if (!isOwner && !isAdmin) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       Object.assign(business, req.body);

//       if (
//         isOwner &&
//         (req.body.businessName || req.body.category || req.body.address)
//       ) {
//         business.isVerified = false;
//       }

//       await business.save();

//       const updatedBusiness = await Business.findById(business._id)
//         .populate("category", "name nameGerman namePersian")
//         .populate("subcategories", "name nameGerman namePersian")
//         .populate("owner", "fullName email");

//       res.json({
//         message: "Business updated successfully",
//         business: updatedBusiness,
//       });
//     } catch (error) {
//       console.error("Update business error:", error);
//       res.status(500).json({ message: "Error updating business" });
//     }
//   }
// );

// /**
//  * ✅ DELETE /api/businesses/:id
//  * حذف بیزنس
//  */
// router.delete("/:id", authenticate, async (req, res) => {
//   try {
//     const business = await Business.findById(req.params.id);
//     if (!business) {
//       return res.status(404).json({ message: "Business not found" });
//     }

//     const isOwner = business.owner.toString() === req.user._id.toString();
//     const isAdmin =
//       req.user.role === "admin" || req.user.role === "super_admin";

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     await Business.findByIdAndDelete(req.params.id);

//     res.json({ message: "Business deleted successfully" });
//   } catch (error) {
//     console.error("Delete business error:", error);
//     res.status(500).json({ message: "Error deleting business" });
//   }
// });

// module.exports = router;
