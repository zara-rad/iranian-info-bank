import React from "react";

const EventHero = ({ event, i18n }) => (
  <div className="relative h-96">
    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
  </div>
);

export default EventHero;
