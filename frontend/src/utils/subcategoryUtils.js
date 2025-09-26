// src/utils/subcategoryUtils.js
export const mapSubcategoryNames = (subcategoryIds, categories, lang = "en") => {
  const names = [];
  categories.forEach(cat => {
    cat.subcategories.forEach(sub => {
      if (subcategoryIds.includes(sub._id)) {
        switch (lang) {
          case "de":
            names.push(sub.nameGerman);
            break;
          case "fa":
            names.push(sub.namePersian);
            break;
          default:
            names.push(sub.name);
        }
      }
    });
  });
  return names;
};
