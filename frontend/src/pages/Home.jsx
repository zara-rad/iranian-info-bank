import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import CitySearch from "../components/CitySearch";
import CategorySearch from "../components/CategorySearch";
import EventsCarousel from "../components/EventsCarousel";
import CategoryCard from "../components/CategoryCard";

// --- Helpers for localized numbers ---
const toFarsiDigits = (str) => {
  return str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

const getLocalizedNumber = (value, language = "en") => {
  if (value === null || value === undefined) return "";

  const strValue = value.toString();

  if (language === "fa") {
    return toFarsiDigits(strValue);
  }

  if (!isNaN(Number(strValue))) {
    return new Intl.NumberFormat(language).format(Number(strValue));
  }

  return strValue;
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(6);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = categories.slice(0, visibleCategoriesCount);
  const hasMoreCategories = visibleCategoriesCount < categories.length;

  const showMoreCategories = () => {
    setVisibleCategoriesCount((prev) =>
      Math.min(prev + 3, categories.length)
    );
  };

  const showLessCategories = () => {
    setVisibleCategoriesCount((prev) => Math.max(prev - 3, 6));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Global Search */}
          <GlobalSearch />

          {/* Smaller Searches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CitySearch />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CategorySearch />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsCarousel />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.categoriesTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.categoriesSubtitle")}
            </p>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <p className="text-center text-gray-600">{t("category.loading")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          )}

          {/* Show More/Less Button */}
          <div className="text-center mt-12">
            {hasMoreCategories && (
              <button
                onClick={showMoreCategories}
                className="inline-flex items-center space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
              >
                <span>
                  {t("categories.showMore")} (
                  {getLocalizedNumber(
                    Math.min(3, categories.length - visibleCategoriesCount),
                    i18n.language
                  )}
                  )
                </span>
                <ChevronDown size={20} />
              </button>
            )}

            {visibleCategoriesCount > 6 && (
              <button
                onClick={showLessCategories}
                className={`inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors font-medium ${
                  hasMoreCategories ? "ms-4" : ""
                }`}
              >
                <span>
                  {t("categories.showLess")} (
                  {getLocalizedNumber(3, i18n.language)})
                </span>
                <ChevronUp size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                {getLocalizedNumber("1,200+", i18n.language)}
              </div>
              <div className="text-gray-300">{t("stats.businesses")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                {getLocalizedNumber("50+", i18n.language)}
              </div>
              <div className="text-gray-300">{t("stats.cities")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                {getLocalizedNumber("25", i18n.language)}
              </div>
              <div className="text-gray-300">{t("stats.categories")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                {getLocalizedNumber("5,000+", i18n.language)}
              </div>
              <div className="text-gray-300">{t("stats.visitors")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
