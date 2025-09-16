const mongoose = require("mongoose");

// 🕒 اسکیمای ساعت کاری
const workingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    required: true,
  },
  open: { type: String },
  close: { type: String },
  isClosed: { type: Boolean, default: false },
});

// 🏢 اسکیمای اصلی بیزنس
const businessSchema = new mongoose.Schema(
  {
    // ارتباط با کاربر
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // اطلاعات پایه
    businessName: { type: String, required: true },
    ownerName: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String },

    // توضیحات چندزبانه
    description: { type: String },
    descriptionGerman: { type: String },
    descriptionPersian: { type: String },

    // لوکیشن
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },

    // دسته‌بندی‌ها
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" } // ✅ اصلاح شد
    ],

    // ساعت کاری
    workingHours: [workingHoursSchema],

    // رسانه
    logo: { type: String },
    images: [{ type: String }],

    // امتیازدهی
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },

    // وضعیت
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isPaid: { type: Boolean, default: false },
    paymentDate: { type: Date },
    expirationDate: { type: Date },

    // سئو
    slug: { type: String, unique: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],

    // آنالیتیکس
    views: { type: Number, default: 0 },
    clicksPhone: { type: Number, default: 0 },
    clicksEmail: { type: Number, default: 0 },
    clicksWebsite: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ایندکس‌ها
businessSchema.index({ businessName: "text", description: "text" });
businessSchema.index({ city: 1 });
businessSchema.index({ category: 1 });
businessSchema.index({ subcategories: 1 });
businessSchema.index({ isActive: 1, isVerified: 1 });
businessSchema.index({ averageRating: -1 });
businessSchema.index({ createdAt: -1 });
businessSchema.index({ slug: 1 });

// ساخت slug خودکار
businessSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug =
      this.businessName
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") +
      "-" +
      (this.city ? this.city.toLowerCase() : "no-city");
  }
  next();
});

module.exports = mongoose.model("Business", businessSchema);
