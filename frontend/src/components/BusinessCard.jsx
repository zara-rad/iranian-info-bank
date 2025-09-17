import React from "react";
import { MapPin, Phone, Mail, Globe, User, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

const BusinessCard = ({ biz }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
     {/* لوگو و اسم (وسط و بالا) */}
<div className="flex flex-col items-center justify-center text-center mb-6">
  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 shadow">
    {biz.logo ? (
      <img
        src={biz.logo}
        alt={biz.businessName}
        className="w-20 h-20 rounded-full object-cover"
      />
    ) : (
      biz.businessName?.charAt(0).toUpperCase()
    )}
  </div>
  <h3 className="text-2xl font-bold mt-3">{biz.businessName}</h3>
</div>

     {/* توضیحات هر زبان در باکس جدا */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  {biz.description && (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <p className="font-bold">EN:</p>
      <p className="text-gray-700">{biz.description}</p>
    </div>
  )}
  {biz.descriptionGerman && (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <p className="font-bold">DE:</p>
      <p className="text-gray-700">{biz.descriptionGerman}</p>
    </div>
  )}
  {biz.descriptionPersian && (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <p className="font-bold">FA:</p>
      <p className="text-gray-700 text-right">{biz.descriptionPersian}</p>
    </div>
  )}
</div>


      {/* اطلاعات تماس */}
      <div className="space-y-2 text-gray-700">
        {biz.ownerName && (
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-500 mr-2" />
            <strong>{t("Owner")}:</strong> {biz.ownerName}
          </div>
        )}
        {biz.phone && (
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-green-500 mr-2" /> {biz.phone}
          </div>
        )}
        {biz.email && (
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-red-500 mr-2" /> {biz.email}
          </div>
        )}
        {biz.city && (
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-purple-500 mr-2" /> {biz.city}
          </div>
        )}
        {biz.address && (
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-orange-500 mr-2" /> {biz.address}
          </div>
        )}
      </div>

      {/* زیر دسته‌ها */}
      {biz.subcategories?.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <Tag className="w-5 h-5 text-pink-500 mr-2" />
            <strong>{t("Subcategories")}:</strong>
          </div>
          <ul className="list-disc list-inside text-gray-600">
            {biz.subcategories.map((sub, idx) => (
              <li key={idx}>{sub.name || sub}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessCard;
