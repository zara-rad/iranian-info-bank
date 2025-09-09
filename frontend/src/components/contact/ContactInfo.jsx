import React from "react";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin } from "lucide-react";
import { getLocalizedNumber } from "../../utils/numberUtils";  // ✅ import helper

const ContactInfo = () => {
  const { t, i18n } = useTranslation();

  const contactInfo = [
    {
      icon: <Phone className="text-persian-600" size={24} />,
      title: t("contact.info.phone.title"),
      value: getLocalizedNumber("+49 170 0000000", i18n.language), // ✅ convert here
      description: t("contact.info.phone.description"),
      action: "tel:+491700000000",
    },
    {
      icon: <Mail className="text-persian-600" size={24} />,
      title: t("contact.info.email.title"),
      value: "you@example.com", // email should stay Latin
      description: t("contact.info.email.description"),
      action: "mailto:you@example.com",
    },
    {
      icon: <MapPin className="text-persian-600" size={24} />,
      title: t("contact.info.address.title"),
      value: t("contact.info.address.value"),
      description: t("contact.info.address.description"),
      action: null,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {t("contact.info.title")}
      </h2>

      <div className="space-y-6 mb-8">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-persian-50 p-3 rounded-full flex-shrink-0">
              {info.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {info.title}
              </h3>
              {info.action ? (
                <a
                  href={info.action}
                  className="text-persian-600 hover:text-persian-700 font-medium text-lg transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <span className="text-gray-900 font-medium text-lg">
                  {info.value}
                </span>
              )}
              <p className="text-gray-600 text-sm mt-1">{info.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-persian-50 border-l-4 border-persian-500 p-6 rounded-r-lg">
        <h3 className="text-xl font-bold text-persian-800 mb-3">
          {t("contact.info.about.title")}
        </h3>
        <p className="text-persian-700 leading-relaxed">
          {t("contact.info.about.text")}
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
