// src/components/business/BusinessCard/BusinessLogo.jsx
import React from "react";

const BusinessLogo = ({ biz }) => {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600 shadow-md overflow-hidden">
        {biz.logo ? (
          <img
            src={biz.logo}
            alt={biz.businessName}
            className="w-full h-full object-cover"
          />
        ) : (
          biz.businessName?.charAt(0).toUpperCase()
        )}
      </div>
      <h3 className="text-2xl font-bold mt-3 text-gray-800">
        {biz.businessName}
      </h3>
    </div>
  );
};

export default BusinessLogo;
