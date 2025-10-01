import React from "react";
import BusinessLogo from "./business/BusinessLogo";
import BusinessImages from "./business/BusinessImages";
import BusinessDescription from "./business/BusinessDescription";
import BusinessContact from "./business/BusinessContact";
import BusinessHours from "./business/BusinessHours";
import BusinessSubcategories from "./business/BusinessSubcategories";

const BusinessCard = ({ biz, categories = [] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <BusinessLogo biz={biz} />
      <BusinessImages images={biz.images} />
      <BusinessDescription biz={biz} />
      <BusinessContact biz={biz} />
      <BusinessHours workingHours={biz.workingHours} />
      <BusinessSubcategories subcategories={biz.subcategories} categories={categories} />
    </div>
  );
};

export default BusinessCard;









// import React, { useState } from "react";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   User,
//   Tag,
//   Clock,
//   ChevronDown,
//   Home,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import { mapSubcategoryNames } from "../utils/subcategoryUtils"; // ✅ فقط اینو اضافه کردیم
// import BusinessLogo from "../components/business/BusinessLogo"; 
// import BusinessImages from "../components/business/BusinessImages";

// const BusinessCard = ({ biz, categories = [] }) => {
//   const { t, i18n } = useTranslation();
//   const [showHours, setShowHours] = useState(false);

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
//       {/* لوگو و اسم */}
//      <BusinessLogo biz={biz} />

//       {/* 📷 تصاویر */}
//      <BusinessImages images={biz.images} />

//       {/* توضیحات چندزبانه */}
//       <div className="mb-6">
//         {i18n.language === "de" && biz.descriptionGerman && (
//           <div className="p-4 rounded-lg shadow bg-green-50 hover:shadow-lg transition">
//             <p className="text-gray-700">{biz.descriptionGerman}</p>
//           </div>
//         )}

//         {i18n.language === "fa" && biz.descriptionPersian && (
//           <div className="p-4 rounded-lg shadow bg-purple-50 hover:shadow-lg transition">
//             <p className="text-gray-700 text-right">{biz.descriptionPersian}</p>
//           </div>
//         )}

//         {(i18n.language === "en" || !["de", "fa"].includes(i18n.language)) &&
//           biz.description && (
//             <div className="p-4 rounded-lg shadow bg-blue-50 hover:shadow-lg transition">
//               <p className="text-gray-700">{biz.description}</p>
//             </div>
//           )}
//       </div>

//       {/* اطلاعات تماس */}
//       <div className="space-y-3 text-gray-700">
//         {biz.ownerName && (
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
//             <User className="w-5 h-5 text-blue-500 mr-2" />
//             <strong>{t("Owner")}:</strong> {biz.ownerName}
//           </div>
//         )}

//         {biz.phone && (
//           <a
//             href={`tel:${biz.phone}`}
//             className="flex items-center p-3 bg-green-50 rounded-lg shadow hover:shadow-md transition"
//           >
//             <Phone className="w-5 h-5 text-green-600 mr-2" /> {biz.phone}
//           </a>
//         )}

//         {biz.email && (
//           <a
//             href={`mailto:${biz.email}`}
//             className="flex items-center p-3 bg-blue-50 rounded-lg shadow hover:shadow-md transition"
//           >
//             <Mail className="w-5 h-5 text-blue-600 mr-2" /> {biz.email}
//           </a>
//         )}

//         {biz.website && (
//           <a
//             href={
//               biz.website.startsWith("http")
//                 ? biz.website
//                 : `http://${biz.website}`
//             }
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center p-3 bg-purple-50 rounded-lg shadow hover:shadow-md transition"
//           >
//             <Globe className="w-5 h-5 text-purple-600 mr-2" /> {biz.website}
//           </a>
//         )}

//         {(biz.city || biz.postalCode) && (
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
//             <MapPin className="w-5 h-5 text-red-500 mr-2" />
//             {biz.city && <span>{biz.city}</span>}
//             {biz.postalCode && (
//               <span className="ml-2 text-gray-500">({biz.postalCode})</span>
//             )}
//           </div>
//         )}

//         {biz.address && (
//           <div className="flex items-center p-3 bg-orange-50 rounded-lg shadow hover:shadow-md transition">
//             <Home className="w-5 h-5 text-orange-600 mr-2" />
//             {biz.address}
//           </div>
//         )}
//       </div>

//       {/* 🕒 ساعات کاری */}
//       {biz.workingHours && biz.workingHours.length > 0 && (
//         <div className="mt-6 border rounded-lg overflow-hidden">
//           <button
//             onClick={() => setShowHours(!showHours)}
//             className="flex justify-between items-center w-full p-4 text-left font-bold bg-gray-100 hover:bg-gray-200 transition"
//           >
//             <span className="flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-gray-600" />
//               {t("Working Hours")}
//             </span>
//             <ChevronDown
//               className={`w-5 h-5 transform transition-transform ${
//                 showHours ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {showHours && (
//             <ul className="p-4 space-y-1 text-gray-700 bg-white">
//               {biz.workingHours.map((wh, idx) => (
//                 <li key={idx}>
//                   <strong className="capitalize">{wh.day}:</strong>{" "}
//                   {wh.isClosed
//                     ? t("Closed")
//                     : `${wh.open || "--"} - ${wh.close || "--"}`}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {/* زیر دسته‌ها */}
//       {biz.subcategories?.length > 0 && (
//         <div className="mt-6">
//           <div className="flex items-center mb-2">
//             <Tag className="w-5 h-5 text-pink-500 mr-2" />
//             <strong>{t("Subcategories")}:</strong>
//           </div>
//           <ul className="list-disc list-inside text-gray-600">
//             {mapSubcategoryNames(biz.subcategories, categories, i18n.language).map(
//               (name, idx) => (
//                 <li key={idx}>{name}</li>
//               )
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BusinessCard;
