import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventMeta = ({ event, i18n }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(i18n.language, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

  return (
    <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
      <div className="flex items-center space-x-2"><Calendar size={18} /><span>{formatDate(event.date)}</span></div>
      <div className="flex items-center space-x-2"><Clock size={18} /><span>{event.time}</span></div>
      <div className="flex items-center space-x-2"><MapPin size={18} /><span>{event.location}</span></div>
    </div>
  );
};

export default EventMeta;
