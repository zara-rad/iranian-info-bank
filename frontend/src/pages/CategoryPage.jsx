import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Tag, Building } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import { useTranslation } from "react-i18next";
import { getLocalizedNumber } from "../utils/numberUtils";

const CategoryPage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/categories/slug/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.error("Error fetching category:", err);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [slug]);

  const getLocalizedName = (item) => {
    if (!item) return "";
    switch (i18n.language) {
      case "de":
        return item.nameGerman;
      case "fa":
        return item.namePersian;
      default:
        return item.name;
    }
  };

  if (loading) return <p className="p-20">{t("category.loading")}</p>;
  if (!category) return <p className="p-20">{t("category.notFound.title")}</p>;

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalSearch />
        </div>
      </section>

      <Breadcrumb items={[{ label: getLocalizedName(category), link: null }]} />

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-4xl font-bold">{getLocalizedName(category)}</h1>
          <p className="text-xl text-gray-600 mb-8">{category.description}</p>
          <div className="flex justify-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Building size={20} />
              <span>
                {getLocalizedNumber(category.businessCount, i18n.language)}{" "}
                {t("category.businesses")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag size={20} />
              <span>
                {getLocalizedNumber(
                  category.subcategories.length,
                  i18n.language
                )}{" "}
                {t("category.subcategories")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.subcategories.map((sub) => (
            <Link
              key={sub._id}
              to={`/category/${slug}/subcategory/${sub.slug}`}
              // key={sub._id}
              // to={`/category/${slug}/subcategory/${sub._id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg p-6"
            >
              <div className="flex justify-between mb-4">
                <Tag className="text-persian-600" size={24} />
                <span className="bg-persian-100 text-persian-800 px-3 py-1 rounded-full text-sm font-medium">
                  {getLocalizedNumber(sub.businessCount, i18n.language)}{" "}
                  {t("category.businesses")}
                </span>
              </div>
              <h3 className="text-xl font-bold">{getLocalizedName(sub)}</h3>
              <p className="text-gray-600 text-sm">{sub.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
