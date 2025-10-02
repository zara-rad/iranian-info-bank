import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../components/Breadcrumb";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import { getLocalizedNumber } from "../utils/numberUtils";
import BusinessCard from "../components/BusinessCard";

const SubcategoryPage = () => {
  const { slug, subcategorySlug } = useParams(); // از URL
  const { t, i18n } = useTranslation();

  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]); // ✅ همه‌ی کتگوری‌ها
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Params:", slug, subcategorySlug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ گرفتن همه کتگوری‌ها
        const catsRes = await fetch("/api/categories");
        if (!catsRes.ok) throw new Error("Failed to fetch categories");
        const catsData = await catsRes.json();
        setCategories(catsData);

        // پیدا کردن category فعلی
        const catRes = await fetch(`/api/categories/slug/${slug}`);
        if (!catRes.ok) throw new Error("Failed to fetch category");
        const catData = await catRes.json();
        setCategory(catData);

        // پیدا کردن subcategory
        const foundSub = catData.subcategories.find(
          (sub) => sub.slug === subcategorySlug
        );
        setSubcategory(foundSub);

        if (!foundSub) {
          console.warn("Subcategory not found for slug:", subcategorySlug);
          setBusinesses([]);
          return;
        }

        // گرفتن بیزنس‌ها
        const bizRes = await fetch(
          `/api/businesses?businessCategory=${catData._id}&businessSubcategories=${foundSub._id}`
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
  }, [slug, subcategorySlug]);

  if (loading) return <p className="p-20">{t("subcategory.loading")}</p>;
  if (!category || !subcategory)
    return <p className="p-20">{t("subcategory.notFoundTitle")}</p>;

  return (
    <div className="min-h-screen pt-20">
      {/* 🔍 Search */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto">
          <GlobalSearch />
        </div>
      </section>

      {/* 📌 Breadcrumb */}
      <Breadcrumb
        items={[
          { label: category.name, link: `/category/${slug}` },
          { label: subcategory.name, link: null },
        ]}
      />

      {/* 🏷️ Subcategory info */}
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

      {/* 📋 لیست بیزنس‌ها */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {businesses.map((biz) => (
            // ✅ پاس دادن همه categories
            <BusinessCard key={biz._id} biz={biz} categories={categories} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SubcategoryPage;
