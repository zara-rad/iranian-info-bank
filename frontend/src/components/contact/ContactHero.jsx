import React from "react";
import { useTranslation } from "react-i18next";

const ContactHero = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("contact.hero.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
