import React from "react";
import { Calendar, MapPin, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";

const EventDetailsCard = ({ event }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {t("events.details")}
      </h3>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Calendar className="text-persian-600 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-900">Date & Time</p>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-600">{event.time}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="text-persian-600 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-900">Location</p>
            <p className="text-gray-600">{event.venue}</p>
            <p className="text-gray-600 text-sm">{event.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Euro className="text-persian-600 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-900">Price</p>
            <p className="text-gray-600">
              {event.isFree ? "Free" : `€${event.ticketPrice}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
