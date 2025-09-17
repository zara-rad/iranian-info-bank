const express = require("express");
const Subcategory = require("../models/Subcategory");

const router = express.Router();

// 📌 گرفتن اطلاعات یک subcategory با ID
router.get("/:id", async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("category", "name nameGerman namePersian slug");
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (err) {
    console.error("Error fetching subcategory:", err);
    res.status(500).json({ message: "Error fetching subcategory" });
  }
});

module.exports = router;
