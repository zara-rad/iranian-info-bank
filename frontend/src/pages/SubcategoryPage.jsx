import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tag, Building, MapPin, Phone, Mail, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../components/Breadcrumb";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import { getLocalizedNumber } from "../utils/numberUtils";

const SubcategoryPage = () => {
  const { slug, subcategoryId } = useParams(); // ✅ slug + subcategoryId
  const { t, i18n } = useTranslation();

  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategoryAndBusinesses = async () => {
      try {
        // 1️⃣ Fetch category by slug
        const catRes = await fetch(`/api/categories/slug/${slug}`);
        if (!catRes.ok) throw new Error("Failed to fetch category");
        const catData = await catRes.json();
        setCategory(catData);

        // 2️⃣ Find subcategory by id
        const foundSub = catData.subcategories.find(
          (sub) => sub._id === subcategoryId
        );
        setSubcategory(foundSub);

        // 3️⃣ Fetch businesses (✅ fixed query params)
        const bizRes = await fetch(
          `/api/businesses?businessCategory=${catData._id}&businessSubcategories=${subcategoryId}`
        );
        if (!bizRes.ok) throw new Error("Failed to fetch businesses");
        const bizData = await bizRes.json();
        setBusinesses(bizData.businesses || []);
      } catch (err) {
        console.error("Error fetching subcategory or businesses:", err);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryAndBusinesses();
  }, [slug, subcategoryId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t("subcategory.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t("subcategory.notFoundTitle")}
            </h1>
            <p className="text-gray-600">{t("subcategory.notFoundText")}</p>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: category.name, link: `/category/${slug}` },
    { label: subcategory.name, link: null },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Global Search Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalSearch />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Subcategory Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Tag className="text-persian-600 mr-3" size={32} />
              <h1 className="text-4xl font-bold text-gray-900">
                {subcategory.name}
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {subcategory.description ||
                t("subcategory.defaultDescription", { name: subcategory.name })}
            </p>

            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Building size={20} />
                <span>
                  {getLocalizedNumber(businesses.length, i18n.language)}{" "}
                  {t("subcategory.businesses")}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭐</span>
                <span>{t("subcategory.verified")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {businesses.map((business) => (
              <div
                key={business._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 mr-3">
                        {business.businessName}
                      </h3>
                      {business.isVerified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          ✓ {t("subcategory.verifiedBadge")}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {business.description}
                    </p>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span>{business.address}</span>
                    </div>
                  </div>

                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <div className="space-y-3">
                      <a
                        href={`tel:${business.phone}`}
                        className="flex items-center justify-center lg:justify-start space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Phone size={16} />
                        <span>{business.phone}</span>
                      </a>

                      <a
                        href={`mailto:${business.email}`}
                        className="flex items-center justify-center lg:justify-start space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Mail size={16} />
                        <span>{t("subcategory.email")}</span>
                      </a>

                      {business.website && (
                        <a
                          href={`https://${business.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center lg:justify-start space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Globe size={16} />
                          <span>{t("subcategory.website")}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubcategoryPage;
