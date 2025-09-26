import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../components/Breadcrumb";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import { getLocalizedNumber } from "../utils/numberUtils";
import BusinessCard from "../components/BusinessCard"; // ✅ اضافه کن

const SubcategoryPage = () => {
  const { slug, subcategoryId } = useParams();
  const { t, i18n } = useTranslation();

  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch(`/api/categories/slug/${slug}`);
        if (!catRes.ok) throw new Error("Failed to fetch category");
        const catData = await catRes.json();
        setCategory(catData);

        const foundSub = catData.subcategories.find(
          (sub) => sub._id === subcategoryId
        );
        setSubcategory(foundSub);

        const bizRes = await fetch(
          `/api/businesses?businessCategory=${catData._id}&businessSubcategories=${subcategoryId}`
        );
        if (!bizRes.ok) throw new Error("Failed to fetch businesses");
        const bizData = await bizRes.json();
        setBusinesses(bizData.businesses || []);
      } catch (err) {
        console.error("Error:", err);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, subcategoryId]);

  if (loading) return <p className="p-20">{t("subcategory.loading")}</p>;
  if (!category || !subcategory)
    return <p className="p-20">{t("subcategory.notFoundTitle")}</p>;

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto">
          <GlobalSearch />
        </div>
      </section>

      <Breadcrumb
        items={[
          { label: category.name, link: `/category/${slug}` },
          { label: subcategory.name, link: null },
        ]}
      />

      <section className="bg-white py-12 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">{subcategory.name}</h1>
          <p className="text-xl text-gray-600">
            {subcategory.description ||
              t("subcategory.defaultDescription", { name: subcategory.name })}
          </p>
          <p className="text-gray-500 mt-2">
            {getLocalizedNumber(businesses.length, i18n.language)}{" "}
            {t("subcategory.businesses")}
          </p>
        </div>
      </section>

      {/* ✅ استفاده از BusinessCard */}
     <section className="py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto space-y-6">
   {businesses.map((biz) => (
  <BusinessCard key={biz._id} biz={biz} categories={[category]} />
))}

  </div>
</section>
    </div>
  );
};

export default SubcategoryPage;
