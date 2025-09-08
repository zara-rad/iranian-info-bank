import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import { useTranslation } from "react-i18next";
import { getLocalizedField } from "../utils/localization.js";

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
  const sampleEvents = [/* ...your events data... */];

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



// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Calendar,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Clock,
//   Euro,
//   Users,
//   ArrowLeft,
// } from "lucide-react";
// import Breadcrumb from "../components/Breadcrumb";
// import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
// import { useTranslation } from "react-i18next";
// import { getLocalizedField } from "../utils/localization";

// const EventDetail = () => {
//   const { eventId } = useParams();
//   const { t, i18n } = useTranslation();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Sample events data
//   const sampleEvents = [
//     {
//       id: 1,
//       title: "Nowruz Celebration 2025",
//       titleGerman: "Nowruz Feier 2025",
//       titlePersian: "جشن نوروز ۲۰۲۵",
//       description:
//         "Join us for the Persian New Year celebration with traditional music, food, and cultural performances.",
//       descriptionGerman:
//         "Begleiten Sie uns zur persischen Neujahrsfeier mit traditioneller Musik, Essen und kulturellen Aufführungen.",
//       descriptionPersian:
//         "در جشن سال نو فارسی با موسیقی سنتی، غذا و اجراهای فرهنگی به ما بپیوندید.",
//       image:
//         "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
//       date: "2025-03-20",
//       time: "18:00 - 23:00",
//       location: "Berlin",
//       venue: "Persian Cultural Center",
//       address: "Kulturzentrum Persien, Hauptstraße 123, 10115 Berlin",
//       contactPhone: "+49 30 12345678",
//       contactEmail: "nowruz@persian-culture.de",
//       website: "www.persian-culture.de",
//       eventType: "cultural",
//       isFree: false,
//       ticketPrice: 25,
//       organizer: {
//         name: "Persian Cultural Association Berlin",
//         phone: "+49 30 12345678",
//         email: "info@persian-culture.de",
//       },
//       tags: ["nowruz", "persian", "culture", "celebration", "new-year"],
//     },
//     // … other events
//   ];

//   useEffect(() => {
//     const foundEvent = sampleEvents.find(
//       (ev) => ev.id === parseInt(eventId, 10)
//     );
//     setEvent(foundEvent);
//     setLoading(false);
//   }, [eventId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20 flex items-center justify-center">
//         <p className="text-gray-600">{t("events.loading")}</p>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen pt-20 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">
//             {t("events.notFound")}
//           </h1>
//           <Link
//             to="/"
//             className="inline-flex items-center space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-6 py-3 rounded-lg transition-colors"
//           >
//             <ArrowLeft size={18} />
//             <span>{t("events.backHome")}</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString(i18n.language, {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen pt-20">
//       {/* Global Search Section */}
//       <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <GlobalSearch />
//         </div>
//       </section>

//       <Breadcrumb
//         items={[
//           { label: t("events.title"), link: "/events" },
//           { label: getLocalizedField(event, "title", i18n.language), link: null },
//         ]}
//       />

//       {/* Event Details */}
//       <section className="py-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="relative h-96">
//                 <img
//                   src={event.image}
//                   alt={getLocalizedField(event, "title", i18n.language)}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//               </div>

//               <div className="p-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                   {getLocalizedField(event, "title", i18n.language)}
//                 </h1>

//                 <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
//                   <div className="flex items-center space-x-2">
//                     <Calendar size={18} />
//                     <span>{formatDate(event.date)}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Clock size={18} />
//                     <span>{event.time}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <MapPin size={18} />
//                     <span>{event.location}</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-900 mb-4">
//                   {t("events.about")}
//                 </h3>
//                 <p
//                   className={`text-gray-700 leading-relaxed mb-6 ${
//                     i18n.language === "fa" ? "text-right" : ""
//                   }`}
//                   dir={i18n.language === "fa" ? "rtl" : "ltr"}
//                 >
//                   {getLocalizedField(event, "description", i18n.language)}
//                 </p>

//                 {event.tags?.length > 0 && (
//                   <div className="mt-6">
//                     <h4 className="font-medium text-gray-900 mb-3">
//                       {t("events.tags")}
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {event.tags.map((tag, i) => (
//                         <span
//                           key={i}
//                           className="bg-persian-100 text-persian-800 px-3 py-1 rounded-full text-sm"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">
//                   {t("events.details")}
//                 </h3>
//                 <p>{event.venue}</p>
//                 <p className="text-sm text-gray-600">{event.address}</p>
//               </div>

//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">
//                   {t("events.organizer")}
//                 </h3>
//                 <p>{event.organizer.name}</p>
//               </div>

//               <div className="bg-persian-50 rounded-xl p-6">
//                 <h3 className="text-xl font-bold text-persian-800 mb-4">
//                   {t("events.contact")}
//                 </h3>
//                 {event.contactEmail && (
//                   <a
//                     href={`mailto:${event.contactEmail}`}
//                     className="block text-persian-600 hover:text-persian-700"
//                   >
//                     {event.contactEmail}
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default EventDetail;












