import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import CitySearch from "../components/CitySearch";
import CategorySearch from "../components/CategorySearch";
import EventsCarousel from "../components/EventsCarousel";
import CategoryCard from "../components/CategoryCard";
import { getLocalizedNumber } from "../utils/numberUtils";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(6);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlobalSearch />
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

      {/* Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsCarousel />
        </div>
      </section>

      {/* Categories */}
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

          {loading ? (
            <p className="text-center text-gray-600">{t("category.loading")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            {hasMoreCategories && (
              <button
                onClick={() =>
                  setVisibleCategoriesCount((prev) =>
                    Math.min(prev + 3, categories.length)
                  )
                }
                className="inline-flex items-center space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-lg"
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
                onClick={() =>
                  setVisibleCategoriesCount((prev) => Math.max(prev - 3, 6))
                }
                className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg ms-4"
              >
                <span>
                  {t("categories.showLess")} ({getLocalizedNumber(3, i18n.language)})
                </span>
                <ChevronUp size={20} />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
