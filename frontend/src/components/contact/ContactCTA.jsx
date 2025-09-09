import React from "react";
import { useTranslation } from "react-i18next";

const ContactCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-persian-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">{t("contact.cta.title")}</h2>
        <p className="text-lg text-persian-100 mb-8 leading-relaxed">
          {t("contact.cta.text")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-white hover:bg-gray-100 text-persian-600 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            {t("contact.cta.register")}
          </a>
          <a
            href="/"
            className="bg-persian-700 hover:bg-persian-800 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            {t("contact.cta.browse")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
