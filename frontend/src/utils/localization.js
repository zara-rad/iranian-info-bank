export const getLocalizedField = (item, field, language) => {
  // Special case for cities (they already come in { en, de, fa })
  if (field === "city" || field === "location") {
    if (language === "de") return item.de || item.en;
    if (language === "fa") return item.fa || item.en;
    return item.en;
  }

  // Handle generic fields (title, description, etc.)
  if (language === "de") return item[`${field}German`] || item[field];
  if (language === "fa") return item[`${field}Persian`] || item[field];
  return item[field]; // default English
};
