import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Home,
  Globe,
  User,
  Clock,
  Tags,
} from "lucide-react";
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
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      {/* ✅ نمایش لوگو */}
      {biz?.logo ? (
        <img
          src={biz.logo}
          alt={biz.businessName}
          className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-500 text-xl">
            {biz?.businessName?.[0]?.toUpperCase() || "?"}
          </span>
        </div>
      )}

      {/* ✅ نام کسب‌وکار */}
      <h2 className="text-xl font-bold text-center mb-2">
        {biz?.businessName}
      </h2>

      {/* ✅ توضیحات چندزبانه */}
      <div className="text-sm text-gray-700 text-center space-y-1 mb-3">
        {biz?.description && (
          <p>
            <strong>EN:</strong> {biz.description}
          </p>
        )}
        {biz?.descriptionGerman && (
          <p>
            <strong>DE:</strong> {biz.descriptionGerman}
          </p>
        )}
        {biz?.descriptionPersian && (
          <p dir="rtl">
            <strong>FA:</strong> {biz.descriptionPersian}
          </p>
        )}
      </div>

      {/* ✅ اطلاعات تماس با آیکون رنگی */}
      <div className="text-sm text-gray-700 space-y-1">
        {biz?.ownerName && (
          <p>
            <User className="inline w-4 h-4 mr-1 text-blue-500" />{" "}
            <strong>Owner:</strong> {biz.ownerName}
          </p>
        )}
        {biz?.phone && (
          <p>
            <Phone className="inline w-4 h-4 mr-1 text-pink-500" /> {biz.phone}
          </p>
        )}
        {biz?.email && (
          <p>
            <Mail className="inline w-4 h-4 mr-1 text-green-500" /> {biz.email}
          </p>
        )}
        {biz?.website && (
          <p>
            <Globe className="inline w-4 h-4 mr-1 text-purple-500" />
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
          <p>
            <MapPin className="inline w-4 h-4 mr-1 text-red-500" /> {biz.city}
          </p>
        )}
        {biz?.address && (
          <p>
            <Home className="inline w-4 h-4 mr-1 text-orange-500" />{" "}
            {biz.address}
          </p>
        )}
      </div>

      {/* ✅ ساعات کاری */}
      {biz?.workingHours?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            <Clock className="inline w-4 h-4 mr-1 text-indigo-500" /> Working
            Hours
          </h3>
          <ul className="text-sm text-gray-600">
            {biz.workingHours.map((day, idx) => (
              <li key={idx}>
                <strong>{day.day}:</strong>{" "}
                {day.isClosed ? "Closed" : `${day.open} - ${day.close}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ نمایش Subcategories */}
      {biz?.subcategories?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            <Tags className="inline w-4 h-4 mr-1 text-pink-500" /> Subcategories
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {biz.subcategories.map((sub) => (
              <li key={sub._id || sub}>{getLocalizedName(sub)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessCard;
