import React from "react";
import BusinessLogo from "./business/BusinessLogo";
import BusinessImages from "./business/BusinessImages";
import BusinessDescription from "./business/BusinessDescription";
import BusinessContact from "./business/BusinessContact";
import BusinessHours from "./business/BusinessHours";
import BusinessSubcategories from "./business/BusinessSubcategories";

const BusinessCard = ({ biz, categories = [] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <BusinessLogo biz={biz} />
      <BusinessImages images={biz.images} />
      <BusinessDescription biz={biz} />
      <BusinessContact biz={biz} />
      <BusinessHours workingHours={biz.workingHours} />
      <BusinessSubcategories subcategories={biz.subcategories} categories={categories} />
    </div>
  );
};

export default BusinessCard;










