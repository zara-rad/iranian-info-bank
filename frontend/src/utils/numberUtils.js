// src/utils/numberUtils.js

// Convert digits to Persian (Farsi)
const toFarsiDigits = (str) => {
  return str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

// Main function: returns localized number based on language
export const getLocalizedNumber = (value, language = "en") => {
  if (!value && value !== 0) return "";

  // For Persian → use Farsi digits
  if (language === "fa") {
    return toFarsiDigits(value);
  }

  // For German or English → use Intl.NumberFormat
  return new Intl.NumberFormat(language).format(value);
};
