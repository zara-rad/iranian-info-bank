const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// 📂 مسیر ذخیره لوگوها
const uploadDir = path.join(process.cwd(), "uploads", "logos");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const uniqueName =
      Date.now() + "_" + Math.random().toString(36).slice(2) + ext;
    cb(null, uniqueName);
  },
});

// ✅ فقط تصاویر مجاز
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ✅ آپلود لوگو
router.post("/", upload.single("logo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // آدرس کامل بسازیم
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${baseUrl}/uploads/logos/${req.file.filename}`;

    res.json({
      success: true,
      imageUrl, // 👉 حالا URL کامل میاد
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;
