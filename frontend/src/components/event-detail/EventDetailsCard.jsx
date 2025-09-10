import React from "react";
import { Calendar, MapPin, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLocalizedNumber } from "../../utils/numberUtils";

const EventDetailsCard = ({ event }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {t("events.details")}
      </h3>

      <div className="space-y-4">
        {/* Date & Time */}
        <div className="flex items-start space-x-3">
          <Calendar className="text-persian-600 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-900">
              {t("events.dateTime", "Date & Time")}
            </p>
            <p className="text-gray-600">
              {getLocalizedNumber(event.date, i18n.language)}
            </p>
            <p className="text-gray-600">
              {getLocalizedNumber(event.time, i18n.language)}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start space-x-3">
          <MapPin className="text-persian-600 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-900">
              {t("events.location", "Location")}
            </p>
            <p className="text-gray-600">{event.venue}</p>
            <p className="text-gray-600 text-sm">{event.address}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-start space-x-3">
          <Euro className="text-persian-600 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-900">
              {t("events.price", "Price")}
            </p>
            <p className="text-gray-600">
              {event.isFree
                ? t("events.free", "Free")
                : `€${getLocalizedNumber(event.ticketPrice, i18n.language)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
