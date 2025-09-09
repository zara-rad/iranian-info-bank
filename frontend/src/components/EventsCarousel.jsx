import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocalizedField } from "../utils/localization";
import { cities } from "../data/cities";
import { sampleEvents } from "../data/sampleEvents";

const EventsCarousel = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);

  

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [events]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  if (events.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t("events.title")}
        </h2>
        <p className="text-lg text-gray-600">{t("events.subtitle")}</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            dir="ltr" // ✅ Force LTR for slide container
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {events.map((event) => {
              // ✅ Find matching city in cities list
              const cityObj =
                cities.find((c) => c.en === event.location) || {
                  en: event.location,
                };

              return (
                <div key={event.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-96 md:h-[500px]">
                    <img
                      src={event.image}
                      alt={getLocalizedField(event, "title", i18n.language)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Event Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="max-w-3xl">
                        <h3
                          className={`text-2xl md:text-4xl font-bold mb-4 ${
                            i18n.language === "fa" ? "text-right" : ""
                          }`}
                          dir={i18n.language === "fa" ? "rtl" : "ltr"}
                        >
                          {getLocalizedField(event, "title", i18n.language)}
                        </h3>

                        <p
                          className={`text-lg mb-6 opacity-90 line-clamp-3 ${
                            i18n.language === "fa" ? "text-right" : ""
                          }`}
                          dir={i18n.language === "fa" ? "rtl" : "ltr"}
                        >
                          {getLocalizedField(
                            event,
                            "description",
                            i18n.language
                          )}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mb-6">
                          <div className="flex items-center space-x-2">
                            <Calendar size={18} />
                            <span>
                              {new Date(event.date).toLocaleDateString(
                                i18n.language
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={18} />
                            <span>
                              {getLocalizedField(
                                cityObj,
                                "city",
                                i18n.language
                              )}
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/event/${event.id}`}
                          className="inline-block bg-persian-600 hover:bg-persian-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        >
                          {t("events.readMore")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {events.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {events.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-persian-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCarousel;













