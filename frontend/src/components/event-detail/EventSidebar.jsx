import React from "react";
import EventDetailsCard from "./EventDetailsCard";
import OrganizerCard from "./OrganizerCard";
import ContactCard from "./ContactCard";

const EventSidebar = ({ event }) => (
  <div className="space-y-6">
    <EventDetailsCard event={event} />
    <OrganizerCard organizer={event.organizer} />
    <ContactCard event={event} />
  </div>
);

export default EventSidebar;
