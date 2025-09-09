import React from "react";
import { Users, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const OrganizerCard = ({ organizer }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {t("events.organizer")}
      </h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Users className="text-persian-600" size={18} />
          <span>{organizer.name}</span>
        </div>
        {organizer.phone && (
          <a href={`tel:${organizer.phone}`} className="flex items-center space-x-2 text-persian-600 hover:text-persian-700">
            <Phone size={18} />
            <span>{organizer.phone}</span>
          </a>
        )}
        {organizer.email && (
          <a href={`mailto:${organizer.email}`} className="flex items-center space-x-2 text-persian-600 hover:text-persian-700">
            <Mail size={18} />
            <span>{organizer.email}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default OrganizerCard;
