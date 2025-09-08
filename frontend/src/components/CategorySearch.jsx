
import React, { useState, useEffect, useRef } from "react";
import { Tag, Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories } from "../data/categories";

const CategorySearch = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      let categoryMatches = [];
      let subcategoryMatches = [];

      // 🔹 Category matches (EN, DE, FA)
      categoryMatches = categories
        .filter(
          (category) =>
            category.name.toLowerCase().includes(query.toLowerCase()) ||
            category.nameGerman.toLowerCase().includes(query.toLowerCase()) ||
            category.namePersian.includes(query) // ✅ Farsi support
        )
        .map((category) => ({
          type: "category",
          name: category.name,
          nameGerman: category.nameGerman,
          namePersian: category.namePersian, // ✅ keep Persian name
          displayName: category.name,
          id: category.id,
          action: () => navigate(`/category/${category.id}`)
        }))
        .slice(0, 2);

      // 🔹 Subcategory matches (EN, DE, FA)
      categories.forEach((category) => {
        const matchingSubcategories = category.subcategories.filter(
          (sub) =>
            sub.name.toLowerCase().includes(query.toLowerCase()) ||
            sub.nameGerman.toLowerCase().includes(query.toLowerCase()) ||
            sub.namePersian.includes(query) // ✅ Farsi support
        );

        matchingSubcategories.forEach((sub) => {
          subcategoryMatches.push({
            type: "subcategory",
            name: sub.name,
            nameGerman: sub.nameGerman,
            namePersian: sub.namePersian, // ✅ keep Persian name
            displayName: sub.name,
            categoryName: category.name,
            categoryId: category.id,
            id: sub.id,
            action: () =>
              navigate(`/category/${category.id}/subcategory/${sub.id}`)
          });
        });
      });
      subcategoryMatches = subcategoryMatches.slice(0, 8);

      setSuggestions([...categoryMatches, ...subcategoryMatches]);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        suggestions[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    suggestion.action();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Tag className="mr-2 text-persian-600" size={24} />
          {t("categorySearch.title")}
        </h3>
        <p className="text-gray-600 text-sm">{t("categorySearch.subtitle")}</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("categorySearch.placeholder")}
          className="w-full pl-10 pr-4 py-3 text-black border-2 border-gray-200 rounded-xl focus:border-persian-500 focus:outline-none transition-colors"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
          {query.length > 0 && (
            <div className="sticky top-0 bg-blue-50 px-4 py-2 border-b border-blue-200">
              <p className="text-sm font-medium text-blue-700">
                {t("categorySearch.resultsFor", {
                  query,
                  count: suggestions.length
                })}
              </p>
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.name}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                selectedIndex === index
                  ? "bg-persian-50 border-l-4 border-persian-500"
                  : ""
              }`}
            >
              {suggestion.type === "category" && (
                <Tag size={16} className="text-gold-500 flex-shrink-0" />
              )}
              {suggestion.type === "subcategory" && (
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Tag size={14} className="text-gold-500" />
                  <ChevronRight size={12} className="text-gray-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <span className="text-gray-700 font-medium block truncate">
                  {suggestion.displayName}
                </span>
                {suggestion.nameGerman && (
                  <span className="text-gray-500 text-xs block truncate">
                    {suggestion.nameGerman}
                  </span>
                )}
                {suggestion.namePersian && (
                  <span className="text-gray-500 text-xs block truncate">
                    {suggestion.namePersian}
                  </span>
                )}
                {suggestion.type === "subcategory" && (
                  <span className="text-gray-400 text-xs block truncate">
                    {t("categorySearch.inCategory", {
                      category: suggestion.categoryName
                    })}
                  </span>
                )}
              </div>

              <span className="text-xs text-gray-400 capitalize flex-shrink-0">
                {suggestion.type === "subcategory"
                  ? t("categorySearch.service")
                  : suggestion.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;








// import React, { useState, useEffect, useRef } from "react";
// import { Tag, Search, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { categories } from "../data/categories";

// const CategorySearch = () => {
//   const { t } = useTranslation();
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (query.length > 0) {
//       let categoryMatches = [];
//       let subcategoryMatches = [];

//       categoryMatches = categories
//         .filter(
//           (category) =>
//             category.name.toLowerCase().includes(query.toLowerCase()) ||
//             category.nameGerman.toLowerCase().includes(query.toLowerCase())
//         )
//         .map((category) => ({
//           type: "category",
//           name: category.name,
//           nameGerman: category.nameGerman,
//           displayName: category.name,
//           id: category.id,
//           action: () => navigate(`/category/${category.id}`)
//         }))
//         .slice(0, 2);

//       categories.forEach((category) => {
//         const matchingSubcategories = category.subcategories.filter(
//           (sub) =>
//             sub.name.toLowerCase().includes(query.toLowerCase()) ||
//             sub.nameGerman.toLowerCase().includes(query.toLowerCase())
//         );

//         matchingSubcategories.forEach((sub) => {
//           subcategoryMatches.push({
//             type: "subcategory",
//             name: sub.name,
//             nameGerman: sub.nameGerman,
//             displayName: sub.name,
//             categoryName: category.name,
//             categoryId: category.id,
//             id: sub.id,
//             action: () =>
//               navigate(`/category/${category.id}/subcategory/${sub.id}`)
//           });
//         });
//       });
//       subcategoryMatches = subcategoryMatches.slice(0, 8);

//       setSuggestions([...categoryMatches, ...subcategoryMatches]);
//       setIsOpen(true);
//     } else {
//       setSuggestions([]);
//       setIsOpen(false);
//     }
//   }, [query, navigate]);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setSelectedIndex((prev) =>
//         prev < suggestions.length - 1 ? prev + 1 : 0
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setSelectedIndex((prev) =>
//         prev > 0 ? prev - 1 : suggestions.length - 1
//       );
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (selectedIndex >= 0 && suggestions[selectedIndex]) {
//         suggestions[selectedIndex].action();
//       }
//     } else if (e.key === "Escape") {
//       setIsOpen(false);
//       setSelectedIndex(-1);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     suggestion.action();
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSelectedIndex(-1);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full" ref={searchRef}>
//       <div className="text-center mb-4">
//         <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center">
//           <Tag className="mr-2 text-persian-600" size={24} />
//           {t("categorySearch.title")}
//         </h3>
//         <p className="text-gray-600 text-sm">{t("categorySearch.subtitle")}</p>
//       </div>

//       <div className="relative">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder={t("categorySearch.placeholder")}
//           className="w-full pl-10 pr-4 py-3 text-black border-2 border-gray-200 rounded-xl focus:border-persian-500 focus:outline-none transition-colors"
//         />
//         <Search
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//           size={18}
//         />
//       </div>

//       {isOpen && suggestions.length > 0 && (
//         <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
//           {query.length > 0 && (
//             <div className="sticky top-0 bg-blue-50 px-4 py-2 border-b border-blue-200">
//               <p className="text-sm font-medium text-blue-700">
//                 {t("categorySearch.resultsFor", {
//                   query,
//                   count: suggestions.length
//                 })}
//               </p>
//             </div>
//           )}
//           {suggestions.map((suggestion, index) => (
//             <button
//               key={`${suggestion.type}-${suggestion.name}-${index}`}
//               onClick={() => handleSuggestionClick(suggestion)}
//               className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
//                 selectedIndex === index
//                   ? "bg-persian-50 border-l-4 border-persian-500"
//                   : ""
//               }`}
//             >
//               {suggestion.type === "category" && (
//                 <Tag size={16} className="text-gold-500 flex-shrink-0" />
//               )}
//               {suggestion.type === "subcategory" && (
//                 <div className="flex items-center space-x-1 flex-shrink-0">
//                   <Tag size={14} className="text-gold-500" />
//                   <ChevronRight size={12} className="text-gray-400" />
//                 </div>
//               )}

//               <div className="flex-1 min-w-0">
//                 <span className="text-gray-700 font-medium block truncate">
//                   {suggestion.displayName}
//                 </span>
//                 {suggestion.nameGerman && (
//                   <span className="text-gray-500 text-xs block truncate">
//                     {suggestion.nameGerman}
//                   </span>
//                 )}
//                 {suggestion.type === "subcategory" && (
//                   <span className="text-gray-400 text-xs block truncate">
//                     {t("categorySearch.inCategory", {
//                       category: suggestion.categoryName
//                     })}
//                   </span>
//                 )}
//               </div>

//               <span className="text-xs text-gray-400 capitalize flex-shrink-0">
//                 {suggestion.type === "subcategory"
//                   ? t("categorySearch.service")
//                   : suggestion.type}
//               </span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategorySearch;
