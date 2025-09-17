import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const BusinessCard = ({ biz }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
      {/* Logo */}
      <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        {biz.logo ? (
          <img
            src={biz.logo}
            alt={biz.businessName}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-xl font-bold text-gray-500">
            {biz.businessName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        {/* Business name */}
        <h2 className="text-xl font-bold text-gray-900">{biz.businessName}</h2>

        {/* Descriptions */}
        <p className="text-gray-600 mt-1">{biz.description}</p>
        <p className="text-sm text-gray-500">{biz.descriptionGerman}</p>
        <p className="text-sm text-gray-500">{biz.descriptionPersian}</p>

        {/* Contact details */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
          {biz.address && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-persian-600" />
              <span>{biz.address}</span>
            </div>
          )}
          {biz.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-persian-600" />
              <span>{biz.phone}</span>
            </div>
          )}
          {biz.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-persian-600" />
              <a
                href={`mailto:${biz.email}`}
                className="hover:underline text-persian-700"
              >
                {biz.email}
              </a>
            </div>
          )}
          {biz.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-persian-600" />
              <a
                href={biz.website.startsWith("http") ? biz.website : `https://${biz.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-persian-700"
              >
                {biz.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
