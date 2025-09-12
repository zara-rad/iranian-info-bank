// checkUsers.js
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({});
    console.log("📋 All users:", users);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
