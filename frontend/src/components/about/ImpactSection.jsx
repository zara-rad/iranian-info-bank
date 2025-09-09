import React from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedNumber } from "../../utils/numberUtils"; // reuse helper

const ImpactSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-persian-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("about.impact.title")}</h2>
          <p className="text-persian-100 text-lg">
            {t("about.impact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-gold-400 mb-2">
              {getLocalizedNumber("1,200+", i18n.language)}
            </div>
            <div className="text-persian-100">
              {t("about.impact.stats.businesses")}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold-400 mb-2">
              {getLocalizedNumber("50+", i18n.language)}
            </div>
            <div className="text-persian-100">
              {t("about.impact.stats.cities")}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold-400 mb-2">
              {getLocalizedNumber("17", i18n.language)}
            </div>
            <div className="text-persian-100">
              {t("about.impact.stats.categories")}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold-400 mb-2">
              {getLocalizedNumber("5,000+", i18n.language)}
            </div>
            <div className="text-persian-100">
              {t("about.impact.stats.visitors")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
