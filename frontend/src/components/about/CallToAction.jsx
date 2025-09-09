import React from "react";
import { useTranslation } from "react-i18next";

const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t("about.cta.title")}
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {t("about.cta.text")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            {t("about.cta.register")}
          </a>
          <a
            href="/contact"
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            {t("about.cta.contact")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
