// resetPassword.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = "zahra.rafieirad1980@gmail.com";
    const plainPassword = "123456";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.updateOne(
  { email },
  { $set: { password: await bcrypt.hash("123456", 10) } },
  { runValidators: false }
);

    console.log("✅ Password reset successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
