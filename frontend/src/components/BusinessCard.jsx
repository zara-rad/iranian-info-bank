import React from "react";
import { Phone, Mail, MapPin, Home, Globe, User, Tags } from "lucide-react";
import { useTranslation } from "react-i18next";

const BusinessCard = ({ biz }) => {
  const { i18n } = useTranslation();

  if (!biz) return null;

  // ✅ گرفتن نام بر اساس زبان
  const getLocalizedName = (item) => {
    if (!item) return "";
    switch (i18n.language) {
      case "de":
        return item.nameGerman || item.name;
      case "fa":
        return item.namePersian || item.name;
      default:
        return item.name;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 text-center">
      {/* ✅ لوگو */}
      {biz?.logo ? (
        <img
          src={biz.logo}
          alt={biz.businessName}
          className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-500 text-3xl font-bold">
            {biz?.businessName?.[0]?.toUpperCase() || "?"}
          </span>
        </div>
      )}

      {/* ✅ نام کسب‌وکار */}
      <h2 className="text-2xl font-bold mb-4">{biz?.businessName}</h2>

      {/* ✅ توضیحات چندزبانه */}
      <div className="text-sm text-gray-700 space-y-1 mb-4">
        {biz?.description && <p><strong>EN:</strong> {biz.description}</p>}
        {biz?.descriptionGerman && <p><strong>DE:</strong> {biz.descriptionGerman}</p>}
        {biz?.descriptionPersian && (
          <p dir="rtl"><strong>FA:</strong> {biz.descriptionPersian}</p>
        )}
      </div>

      {/* ✅ اطلاعات تماس */}
      <div className="text-sm text-gray-700 space-y-2 text-left max-w-md mx-auto">
        {biz?.ownerName && (
          <p><User className="inline w-4 h-4 mr-1" /> <strong>Owner:</strong> {biz.ownerName}</p>
        )}
        {biz?.phone && (
          <p><Phone className="inline w-4 h-4 mr-1" /> {biz.phone}</p>
        )}
        {biz?.email && (
          <p><Mail className="inline w-4 h-4 mr-1" /> {biz.email}</p>
        )}
        {biz?.website && (
          <p>
            <Globe className="inline w-4 h-4 mr-1" />
            <a
              href={biz.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {biz.website}
            </a>
          </p>
        )}
        {biz?.city && (
          <p><MapPin className="inline w-4 h-4 mr-1" /> {biz.city}</p>
        )}
        {biz?.address && (
          <p><Home className="inline w-4 h-4 mr-1" /> {biz.address}</p>
        )}
      </div>

      {/* ✅ نمایش Subcategories */}
      {biz?.subcategories?.length > 0 && (
        <div className="mt-6 text-left max-w-md mx-auto">
          <h3 className="font-semibold text-gray-800 mb-2">
            <Tags className="inline w-4 h-4 mr-1" /> Subcategories
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {biz.subcategories.map((sub) => (
              <li key={sub._id || sub}>
                {getLocalizedName(sub)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessCard;
