const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authenticate } = require("../middleware/auth");
const Business = require("../models/Business");

const router = express.Router();

// =========================
// 📂 Multer config برای آپلود
// =========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads";
    if (file.fieldname === "logo") folder = "uploads/logos";
    if (file.fieldname === "images") folder = "uploads/images";

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =========================
// 📌 گرفتن اطلاعات بیزنس
// =========================
router.get("/business", authenticate, async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id })
      .populate("category", "name nameGerman namePersian icon")
      .populate("subcategories", "name nameGerman namePersian")
      .populate("owner", "fullName email");

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json(business);
  } catch (err) {
    console.error("❌ Error fetching business owner data:", err);
    res.status(500).json({ message: "Failed to load business data" });
  }
});

// =========================
// 📌 آپدیت اطلاعات بیزنس
// =========================
router.put("/business", authenticate, async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id });
    if (!business) return res.status(404).json({ message: "Business not found" });

    // ✅ فقط فیلدهای مجاز آپدیت میشن
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
        business[field] = req.body[field];
      }
    });

    await business.save();

    const updatedBusiness = await Business.findById(business._id)
      .populate("category", "name nameGerman namePersian icon")
      .populate("subcategories", "name nameGerman namePersian")
      .populate("owner", "fullName email");

    res.json(updatedBusiness);
  } catch (err) {
    console.error("❌ Error updating business owner data:", err);
    res.status(500).json({ message: "Failed to update business data" });
  }
});

// =========================
// 📌 حذف بیزنس
// =========================
router.delete("/business", authenticate, async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json({ message: "Business deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting business owner data:", err);
    res.status(500).json({ message: "Failed to delete business data" });
  }
});

// =========================
// 📌 آپلود لوگو
// =========================
router.post(
  "/business/logo",
  authenticate,
  upload.single("logo"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No logo uploaded" });

      const logoPath = `/${req.file.path.replace(/\\/g, "/")}`;

      const business = await Business.findOneAndUpdate(
        { owner: req.user._id },
        { logo: logoPath },
        { new: true }
      )
        .populate("category", "name nameGerman namePersian icon")
        .populate("subcategories", "name nameGerman namePersian")
        .populate("owner", "fullName email");

      res.json(business);
    } catch (err) {
      console.error("❌ Error uploading logo:", err);
      res.status(500).json({ message: "Failed to upload logo" });
    }
  }
);

// =========================
// 📌 آپلود تصاویر گالری
// =========================
router.post(
  "/business/images",
  authenticate,
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images uploaded" });
      }

      const imagePaths = req.files.map((file) =>
        `/${file.path.replace(/\\/g, "/")}`
      );

      const business = await Business.findOne({ owner: req.user._id });
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      business.images = [...(business.images || []), ...imagePaths];
      await business.save();

      const updatedBusiness = await Business.findById(business._id)
        .populate("category", "name nameGerman namePersian icon")
        .populate("subcategories", "name nameGerman namePersian")
        .populate("owner", "fullName email");

      res.json(updatedBusiness);
    } catch (err) {
      console.error("❌ Error uploading images:", err);
      res.status(500).json({ message: "Failed to upload images" });
    }
  }
);

module.exports = router;







// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload"); // ✅ import your upload middleware

// // Example: Get business info for the logged-in owner
// router.get("/business", (req, res) => {
//   res.json({ message: "Business data fetched successfully!" });
// });

// // Example: Update business info
// router.put("/business", (req, res) => {
//   res.json({ message: "Business info updated!", data: req.body });
// });

// // Upload logo
// router.post("/business/logo", upload.single("logo"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   res.json({
//     message: "Logo uploaded successfully",
//     file: req.file.filename,
//   });
// });

// // Upload multiple gallery images
// router.post("/business/images", upload.array("images", 5), (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: "No images uploaded" });
//   }
//   res.json({
//     message: "Images uploaded successfully",
//     files: req.files.map((f) => f.filename),
//   });
// });

// module.exports = router;






