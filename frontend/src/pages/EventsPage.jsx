import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sampleEvents } from "../data/sampleEvents";
import { getLocalizedField } from "../utils/localization";

const EventsPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("events.title")}</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={event.image}
              alt={getLocalizedField(event, "title", i18n.language)}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {getLocalizedField(event, "title", i18n.language)}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {getLocalizedField(event, "description", i18n.language)}
              </p>
              <Link
                to={`/event/${event.id}`}
                className="text-persian-600 hover:underline font-medium"
              >
                {t("events.readMore")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
