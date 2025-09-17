const path = require("path");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Routes
const businessOwnerRoutes = require("./routes/business-owner");
const uploadRoutes = require("./routes/upload"); // ✅ اضافه شد

const app = express();

// ----------------------------------
// 📂 ساخت فولدر آپلود اگر وجود نداره
// ----------------------------------
const logosDir = path.join(process.cwd(), "uploads", "logos");
fs.mkdirSync(logosDir, { recursive: true });

// ----------------------------------
// 🛡 Middleware
// ----------------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: false, // ⬅️ اجازه بده تصاویر cross-origin لود بشن
  })
);

app.use(cors()); // 🔑 کل API
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 100, // هر IP حداکثر 100 درخواست
});
app.use("/api/", limiter);

// ----------------------------------
// 📦 اتصال به دیتابیس
// ----------------------------------
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://localhost:27017/iranian-directory",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------------------
// 🛣 Routes
// ----------------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/businesses", require("./routes/businesses"));
app.use("/api/events", require("./routes/events"));
app.use("/api/search", require("./routes/search"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/business-owner", businessOwnerRoutes);

// ✅ مسیر آپلود
app.use("/api/upload", uploadRoutes);

// ----------------------------------
// 📂 Static files with CORS headers
// ----------------------------------
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // یا محدود کن به http://localhost:3000
    res.header("Access-Control-Allow-Methods", "GET,HEAD");
    next();
  },
  express.static("uploads")
);

// ----------------------------------
// ❤️ Health check
// ----------------------------------
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ----------------------------------
// 🛑 Error handling middleware
// ----------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ----------------------------------
// 🔎 404 handler
// ----------------------------------
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ----------------------------------
// 🚀 Start server
// ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
