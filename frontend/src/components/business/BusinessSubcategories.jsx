import React from "react";
import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mapSubcategoryNames } from "../../utils/subcategoryUtils";

const BusinessSubcategories = ({ subcategories, categories }) => {
  const { t, i18n } = useTranslation();

  if (!Array.isArray(subcategories) || subcategories.length === 0) {
    console.log("⛔ No subcategories for this business");
    return null;
  }

  console.log("📌 Biz.subcategories (raw):", subcategories);
  console.log("📌 Categories (raw):", categories);

  const names = mapSubcategoryNames(subcategories, categories, i18n.language);

  console.log("✅ Final mapped names:", names);

  return (
    <div className="mt-6">
      <div className="flex items-center mb-2">
        <Tag className="w-5 h-5 text-pink-500 mr-2" />
        <strong>{t("Subcategories")}:</strong>
      </div>
      <ul className="list-disc list-inside text-gray-600">
        {names.length > 0 ? (
          names.map((name, idx) => <li key={idx}>{name}</li>)
        ) : (
          subcategories.map((id, idx) => (
            <li key={idx} className="text-gray-400">
              {id.toString()} {/* فقط برای تست نمایش ID */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BusinessSubcategories;



// import React from "react";
// import { Tag } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { mapSubcategoryNames } from "../../utils/subcategoryUtils";

// const BusinessSubcategories = ({ subcategories, categories }) => {
//   const { t, i18n } = useTranslation();

//   if (!subcategories || subcategories.length === 0) return null;

//   const names = mapSubcategoryNames(subcategories, categories, i18n.language);
// console.log("Biz.subcategories:", subcategories);
// console.log("Categories:", categories);

//   return (
//     <div className="mt-6">
//       <div className="flex items-center mb-2">
//         <Tag className="w-5 h-5 text-pink-500 mr-2" />
//         <strong>{t("Subcategories")}:</strong>
//       </div>
//       <ul className="list-disc list-inside text-gray-600">
//         {names.map((name, idx) => (
//           <li key={idx}>{name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BusinessSubcategories;
