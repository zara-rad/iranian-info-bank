import React from "react";
import { useTranslation } from "react-i18next";
import { Heart, Users, Globe, Handshake } from "lucide-react";

const icons = [
  <Heart className="text-persian-600" size={32} />,
  <Users className="text-persian-600" size={32} />,
  <Globe className="text-persian-600" size={32} />,
  <Handshake className="text-persian-600" size={32} />
];

const ValuesSection = () => {
  const { t } = useTranslation();
  const values = t("about.values.list", { returnObjects: true });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("about.values.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("about.values.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="text-center group">
              <div className="bg-persian-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-persian-100 transition-colors">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
