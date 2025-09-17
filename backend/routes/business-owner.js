const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // ✅ import your upload middleware

// Example: Get business info for the logged-in owner
router.get("/business", (req, res) => {
  res.json({ message: "Business data fetched successfully!" });
});

// Example: Update business info
router.put("/business", (req, res) => {
  res.json({ message: "Business info updated!", data: req.body });
});

// Upload logo
router.post("/business/logo", upload.single("logo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "Logo uploaded successfully",
    file: req.file.filename,
  });
});

// Upload multiple gallery images
router.post("/business/images", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }
  res.json({
    message: "Images uploaded successfully",
    files: req.files.map((f) => f.filename),
  });
});

module.exports = router;






