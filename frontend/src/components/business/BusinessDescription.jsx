import React from "react";
import { useTranslation } from "react-i18next";

const BusinessDescription = ({ biz }) => {
  const { i18n } = useTranslation();

  return (
    <div className="mb-6">
      {i18n.language === "de" && biz.descriptionGerman && (
        <div className="p-4 rounded-lg shadow bg-green-50 hover:shadow-lg transition">
          <p className="text-gray-700">{biz.descriptionGerman}</p>
        </div>
      )}

      {i18n.language === "fa" && biz.descriptionPersian && (
        <div className="p-4 rounded-lg shadow bg-purple-50 hover:shadow-lg transition">
          <p className="text-gray-700 text-right">{biz.descriptionPersian}</p>
        </div>
      )}

      {(i18n.language === "en" || !["de", "fa"].includes(i18n.language)) &&
        biz.description && (
          <div className="p-4 rounded-lg shadow bg-blue-50 hover:shadow-lg transition">
            <p className="text-gray-700">{biz.description}</p>
          </div>
        )}
    </div>
  );
};

export default BusinessDescription;
