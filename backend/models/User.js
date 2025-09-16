const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },

    // 👤 نقش کاربر
    role: {
      type: String,
      enum: ["super_admin", "admin", "business_owner"],
      default: "business_owner",
    },

    // ⚡ وضعیت و امنیت
    isActive: { type: Boolean, default: true },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// 🛠️ هش کردن پسورد قبل از ذخیره
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🛠️ متد مقایسه پسورد
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 🛠️ شمارش دفعات لاگین ناموفق
userSchema.methods.incLoginAttempts = async function () {
  this.loginAttempts += 1;
  if (this.loginAttempts >= 5) {
    this.lockUntil = Date.now() + 60 * 60 * 1000; // 1 ساعت قفل
  }
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
