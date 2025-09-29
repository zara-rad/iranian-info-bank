const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// 📂 مسیر ذخیره عکس‌ها (لوگو + تصاویر)
const uploadDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// ✅ ساختار نام‌گذاری و مسیر ذخیره
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subDir = "others";
    if (file.fieldname === "logo") subDir = "logos";
    if (file.fieldname === "images") subDir = "images";

    const finalDir = path.join(uploadDir, subDir);
    fs.mkdirSync(finalDir, { recursive: true });

    cb(null, finalDir);
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
router.post("/logo", upload.single("logo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${baseUrl}/uploads/logos/${req.file.filename}`;

    res.json({
      success: true,
      type: "logo",
      imageUrl, // همیشه کامل ذخیره بشه
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  } catch (err) {
    console.error("Upload error (logo):", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// ✅ آپلود عکس‌های نمونه کار (حداکثر ۳ تا)
router.post("/images", upload.array("images", 3), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageUrls = req.files.map(
      (file) => `${baseUrl}/uploads/images/${file.filename}`
    );

    res.json({
      success: true,
      type: "images",
      count: req.files.length,
      imageUrls, // همه با baseUrl
    });
  } catch (err) {
    console.error("Upload error (images):", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;


//29sep code zir ok boode balaee teste
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const router = express.Router();

// // 📂 مسیر ذخیره عکس‌ها (لوگو + تصاویر)
// const uploadDir = path.join(process.cwd(), "uploads");
// fs.mkdirSync(uploadDir, { recursive: true });

// // ✅ ساختار نام‌گذاری و مسیر ذخیره
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // جدا کردن مسیر لوگو و تصاویر
//     let subDir = "others";
//     if (file.fieldname === "logo") subDir = "logos";
//     if (file.fieldname === "images") subDir = "images";

//     const finalDir = path.join(uploadDir, subDir);
//     fs.mkdirSync(finalDir, { recursive: true });

//     cb(null, finalDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname || "");
//     const uniqueName =
//       Date.now() + "_" + Math.random().toString(36).slice(2) + ext;
//     cb(null, uniqueName);
//   },
// });

// // ✅ فقط تصاویر مجاز
// const allowedMimeTypes = [
//   "image/png",
//   "image/jpeg",
//   "image/jpg",
//   "image/webp",
//   "image/gif",
//   "image/svg+xml",
// ];

// const fileFilter = (req, file, cb) => {
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// // ✅ آپلود لوگو
// router.post("/logo", upload.single("logo"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const baseUrl = `${req.protocol}://${req.get("host")}`;
//     const imageUrl = `${baseUrl}/uploads/logos/${req.file.filename}`;

//     res.json({
//       success: true,
//       type: "logo",
//       imageUrl,
//       filename: req.file.filename,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//     });
//   } catch (err) {
//     console.error("Upload error (logo):", err);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// });

// // ✅ آپلود عکس‌های نمونه کار (حداکثر ۳ تا)
// router.post("/images", upload.array("images", 3), (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }

//     const baseUrl = `${req.protocol}://${req.get("host")}`;
//     const imageUrls = req.files.map(
//       (file) => `${baseUrl}/uploads/images/${file.filename}`
//     );

//     res.json({
//       success: true,
//       type: "images",
//       count: req.files.length,
//       imageUrls,
//     });
//   } catch (err) {
//     console.error("Upload error (images):", err);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// });

// module.exports = router;
