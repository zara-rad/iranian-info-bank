import React from "react";
import { Phone, Mail, Globe, User, MapPin, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

const BusinessContact = ({ biz }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 text-gray-700">
      {biz.ownerName && (
        <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
          <User className="w-5 h-5 text-blue-500 mr-2" />
          <strong>{t("Owner")}:</strong> {biz.ownerName}
        </div>
      )}

      {biz.phone && (
        <a
          href={`tel:${biz.phone}`}
          className="flex items-center p-3 bg-green-50 rounded-lg shadow hover:shadow-md transition"
        >
          <Phone className="w-5 h-5 text-green-600 mr-2" /> {biz.phone}
        </a>
      )}

      {biz.email && (
        <a
          href={`mailto:${biz.email}`}
          className="flex items-center p-3 bg-blue-50 rounded-lg shadow hover:shadow-md transition"
        >
          <Mail className="w-5 h-5 text-blue-600 mr-2" /> {biz.email}
        </a>
      )}

      {biz.website && (
        <a
          href={biz.website.startsWith("http") ? biz.website : `http://${biz.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-purple-50 rounded-lg shadow hover:shadow-md transition"
        >
          <Globe className="w-5 h-5 text-purple-600 mr-2" /> {biz.website}
        </a>
      )}

      {(biz.city || biz.postalCode) && (
        <div className="flex items-center p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
          <MapPin className="w-5 h-5 text-red-500 mr-2" />
          {biz.city && <span>{biz.city}</span>}
          {biz.postalCode && <span className="ml-2 text-gray-500">({biz.postalCode})</span>}
        </div>
      )}

      {biz.address && (
        <div className="flex items-center p-3 bg-orange-50 rounded-lg shadow hover:shadow-md transition">
          <Home className="w-5 h-5 text-orange-600 mr-2" />
          {biz.address}
        </div>
      )}
    </div>
  );
};

export default BusinessContact;
