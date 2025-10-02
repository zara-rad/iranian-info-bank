export const mapSubcategoryNames = (subcategories, categories, lang = "en") => {
  if (!Array.isArray(subcategories) || !Array.isArray(categories)) {
    console.log("⛔ Invalid input:", { subcategories, categories });
    return [];
  }

  const names = [];

  subcategories.forEach((sub) => {
    // اگر sub خودش ObjectId یا string بود
    const subId =
      typeof sub === "string"
        ? sub
        : sub?._id
        ? sub._id.toString()
        : sub.toString();

    categories.forEach((cat) => {
      if (Array.isArray(cat.subcategories)) {
        cat.subcategories.forEach((s) => {
          const catSubId =
            typeof s === "string"
              ? s
              : s?._id
              ? s._id.toString()
              : s.toString();

          if (catSubId === subId) {
            console.log("✅ Match found:", s);

            switch (lang) {
              case "de":
                names.push(s.nameGerman || s.name);
                break;
              case "fa":
                names.push(s.namePersian || s.name);
                break;
              default:
                names.push(s.name);
            }
          }
        });
      }
    });
  });

  console.log("📌 Final names:", names);
  return names;
};







// // src/utils/subcategoryUtils.js
// export const mapSubcategoryNames = (subcategoryIds, categories, lang = "en") => {
//   const names = [];
//   categories.forEach(cat => {
//     cat.subcategories.forEach(sub => {
//       if (subcategoryIds.includes(sub._id)) {
//         switch (lang) {
//           case "de":
//             names.push(sub.nameGerman);
//             break;
//           case "fa":
//             names.push(sub.namePersian);
//             break;
//           default:
//             names.push(sub.name);
//         }
//       }
//     });
//   });
//   return names;
// };
