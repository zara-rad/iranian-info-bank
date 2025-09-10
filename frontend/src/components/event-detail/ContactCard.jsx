import React from "react";
import { Phone, Mail, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactCard = ({ event }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-persian-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-persian-800 mb-4">
        {t("events.contact")}
      </h3>
      <div className="space-y-3">
        {event.contactPhone && (
          <a
            href={`tel:${event.contactPhone}`}
            className="w-full bg-persian-600 hover:bg-persian-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Phone size={18} /> <span>{t("events.call", "Call")}</span>
          </a>
        )}
        {event.contactEmail && (
          <a
            href={`mailto:${event.contactEmail}`}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Mail size={18} /> <span>{t("events.email", "Email")}</span>
          </a>
        )}
        {event.website && (
          <a
            href={`https://${event.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Globe size={18} /> <span>{t("events.website", "Website")}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
