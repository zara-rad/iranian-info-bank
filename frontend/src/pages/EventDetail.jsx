import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import { useTranslation } from "react-i18next";
import { getLocalizedField } from "../utils/localization.js";
import { sampleEvents } from "../data/sampleEvents";

// Components
import EventHero from "../components/event-detail/EventHero.jsx";
import EventMeta from "../components/event-detail/EventMeta.jsx";
import EventDescription from "../components/event-detail/EventDescription.jsx";
import EventTags from "../components/event-detail/EventTags.jsx";
import EventSidebar from "../components/event-detail/EventSidebar.jsx";

const EventDetail = () => {
  const { eventId } = useParams();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // sampleEvents (could also come from API)
  // const sampleEvents = [/* ...your events data... */];

  useEffect(() => {
    const foundEvent = sampleEvents.find(ev => ev.id === parseInt(eventId, 10));
    setEvent(foundEvent);
    setLoading(false);
  }, [eventId]);

  if (loading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-gray-600">{t("events.loading")}</p>
    </div>;
  }

  if (!event) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("events.notFound")}</h1>
        <Link to="/" className="inline-flex items-center space-x-2 bg-persian-600 text-white px-6 py-3 rounded-lg">
          <ArrowLeft size={18} /> <span>{t("events.backHome")}</span>
        </Link>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Global Search */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4"><GlobalSearch /></div>
      </section>

      <Breadcrumb items={[
        { label: t("events.title"), link: "/events" },
        { label: getLocalizedField(event, "title", i18n.language), link: null }
      ]} />

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <EventHero event={event} i18n={i18n} />
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {getLocalizedField(event, "title", i18n.language)}
              </h1>
              <EventMeta event={event} i18n={i18n} />
              <EventDescription event={event} i18n={i18n} />
              <EventTags tags={event.tags} />
            </div>
          </div>

          {/* Sidebar */}
          <EventSidebar event={event} />
        </div>
      </section>
    </div>
  );
};

export default EventDetail;















