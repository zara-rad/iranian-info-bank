import React from "react";
import { useTranslation } from "react-i18next";
import { Users, MessageCircle, Clock } from "lucide-react";

const icons = [
  <Users className="text-persian-600" size={32} />,
  <MessageCircle className="text-persian-600" size={32} />,
  <Clock className="text-persian-600" size={32} />,
];

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = t("contact.features.list", { returnObjects: true });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("contact.features.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-persian-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-persian-100 transition-colors">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
