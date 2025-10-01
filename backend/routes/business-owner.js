const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authenticate } = require("../middleware/auth");
const Business = require("../models/Business");

const router = express.Router();

// =========================
// 📂 Multer config
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
// 🛠 helper → همیشه populate کن
// =========================
const populateBusiness = (query) => {
  return query
    .populate("category", "name nameGerman namePersian icon")
    .populate("subcategories", "name nameGerman namePersian")
    .populate("owner", "fullName email");
};

// =========================
// 📌 GET business (owner dashboard)
// =========================
router.get("/business", authenticate, async (req, res) => {
  try {
    const business = await populateBusiness(
      Business.findOne({ owner: req.user._id })
    );

    if (!business) return res.status(404).json({ message: "Business not found" });
    res.json(business);
  } catch (err) {
    console.error("❌ Error fetching business owner data:", err);
    res.status(500).json({ message: "Failed to load business data" });
  }
});

// =========================
// 📌 UPDATE business
// =========================
router.put("/business", authenticate, async (req, res) => {
  try {
    let business = await Business.findOne({ owner: req.user._id });
    if (!business) return res.status(404).json({ message: "Business not found" });

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
          // ✅ فقط اگر آرایه خالی نباشه
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

    const updatedBusiness = await populateBusiness(
      Business.findById(business._id)
    );
    res.json(updatedBusiness);
  } catch (err) {
    console.error("❌ Error updating business owner data:", err);
    res.status(500).json({ message: "Failed to update business data" });
  }
});

// =========================
// 📌 DELETE business
// =========================
router.delete("/business", authenticate, async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({ owner: req.user._id });
    if (!business) return res.status(404).json({ message: "Business not found" });

    res.json({ message: "Business deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting business:", err);
    res.status(500).json({ message: "Failed to delete business data" });
  }
});

// =========================
// 📌 UPLOAD logo
// =========================
router.post(
  "/business/logo",
  authenticate,
  upload.single("logo"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No logo uploaded" });

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const logoPath = `${baseUrl}/uploads/logos/${req.file.filename}`;

      await Business.findOneAndUpdate(
        { owner: req.user._id },
        { logo: logoPath }
      );

      const updatedBusiness = await populateBusiness(
        Business.findOne({ owner: req.user._id })
      );

      res.json(updatedBusiness);
    } catch (err) {
      console.error("❌ Error uploading logo:", err);
      res.status(500).json({ message: "Failed to upload logo" });
    }
  }
);

// =========================
// 📌 UPLOAD gallery images
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

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imagePaths = req.files.map(
        (file) => `${baseUrl}/uploads/images/${file.filename}`
      );

      const business = await Business.findOne({ owner: req.user._id });
      if (!business) return res.status(404).json({ message: "Business not found" });

      business.images = [...(business.images || []), ...imagePaths];
      await business.save();

      const updatedBusiness = await populateBusiness(
        Business.findById(business._id)
      );
      res.json(updatedBusiness);
    } catch (err) {
      console.error("❌ Error uploading images:", err);
      res.status(500).json({ message: "Failed to upload images" });
    }
  }
);

// =========================
// 📌 DELETE image from gallery
// =========================
router.delete("/business/images", authenticate, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const business = await Business.findOne({ owner: req.user._id });
    if (!business) return res.status(404).json({ message: "Business not found" });

    business.images = (business.images || []).filter((img) => img !== imageUrl);

    const relativePath = imageUrl.replace(`${req.protocol}://${req.get("host")}`, "");
    const filePath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await business.save();

    const updatedBusiness = await populateBusiness(
      Business.findById(business._id)
    );
    res.json(updatedBusiness);
  } catch (err) {
    console.error("❌ Error deleting image:", err);
    res.status(500).json({ message: "Failed to delete image" });
  }
});

module.exports = router;
