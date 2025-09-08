import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocalizedField } from "../utils/localization";
import { cities } from "../data/cities";

const EventsCarousel = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);

  // ✅ Sample events data (with translations)
  const sampleEvents = [
    {
      id: 1,
      title: "Nowruz Celebration 2025",
      titleGerman: "Nowruz Feier 2025",
      titlePersian: "جشن نوروز ۲۰۲۵",
      description:
        "Join us for the Persian New Year celebration with traditional music, food, and cultural performances.",
      descriptionGerman:
        "Begleiten Sie uns zur persischen Neujahrsfeier mit traditioneller Musik, Essen und kulturellen Aufführungen.",
      descriptionPersian:
        "در جشن سال نو فارسی با موسیقی سنتی، غذا و اجراهای فرهنگی به ما بپیوندید.",
      image:
        "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "2025-03-20",
      location: "Berlin",
      venue: "Persian Cultural Center",
    },
    {
      id: 2,
      title: "Iranian Business Networking",
      titleGerman: "Iranisches Business Networking",
      titlePersian: "شبکه‌سازی کسب‌وکار ایرانی",
      description:
        "Connect with Iranian entrepreneurs and business owners across Germany.",
      descriptionGerman:
        "Vernetzen Sie uns mit iranischen Unternehmern und Geschäftsinhabern in ganz Deutschland.",
      descriptionPersian:
        "با کارآفرینان و صاحبان کسب‌وکار ایرانی در سراسر آلمان ارتباط برقرار کنید.",
      image:
        "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "2025-02-15",
      location: "Hamburg",
      venue: "Business Center Hamburg",
    },
    {
      id: 3,
      title: "Persian Poetry Night",
      titleGerman: "Persische Poesie Nacht",
      titlePersian: "شب شعر فارسی",
      description:
        "An evening celebrating Persian literature and poetry with renowned poets.",
      descriptionGerman:
        "Ein Abend zur Feier der persischen Literatur und Poesie mit renommierten Dichtern.",
      descriptionPersian: "شبی برای جشن ادبیات و شعر فارسی با شاعران مشهور.",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "2025-02-28",
      location: "Munich",
      venue: "Cultural Hall Munich",
    },
  ];

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
          <div className="flex justify-center space-x-3 mt-6">
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














// import React, { useState, useEffect } from 'react'
// import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react'
// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'

// const EventsCarousel = () => {
//   const { t } = useTranslation()
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [events, setEvents] = useState([])

//   // Sample events data
//   const sampleEvents = [
//     {
//       id: 1,
//       title: 'Nowruz Celebration 2025',
//       titleGerman: 'Nowruz Feier 2025',
//       titlePersian: 'جشن نوروز ۲۰۲۵',
//       description: 'Join us for the Persian New Year celebration with traditional music, food, and cultural performances.',
//       image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
//       date: '2025-03-20',
//       location: 'Berlin',
//       venue: 'Persian Cultural Center'
//     },
//     {
//       id: 2,
//       title: 'Iranian Business Networking',
//       titleGerman: 'Iranisches Business Networking',
//       titlePersian: 'شبکه‌سازی کسب‌وکار ایرانی',
//       description: 'Connect with Iranian entrepreneurs and business owners across Germany.',
//       image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
//       date: '2025-02-15',
//       location: 'Hamburg',
//       venue: 'Business Center Hamburg'
//     },
//     {
//       id: 3,
//       title: 'Persian Poetry Night',
//       titleGerman: 'Persische Poesie Nacht',
//       titlePersian: 'شب شعر فارسی',
//       description: 'An evening celebrating Persian literature and poetry with renowned poets.',
//       image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
//       date: '2025-02-28',
//       location: 'Munich',
//       venue: 'Cultural Hall Munich'
//     }
//   ]

//   useEffect(() => {
//     setEvents(sampleEvents)
//   }, [])

//   useEffect(() => {
//     if (events.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % events.length)
//       }, 5000)
//       return () => clearInterval(interval)
//     }
//   }, [events])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % events.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + events.length) % events.length)
//   }

//   if (events.length === 0) {
//     return null
//   }

//   return (
//     <div className="mb-16">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('events.title')}</h2>
//         <p className="text-lg text-gray-600">Stay updated with the latest Iranian community events</p>
//       </div>

//       <div className="relative max-w-5xl mx-auto">
//         <div className="overflow-hidden rounded-2xl shadow-2xl">
//           <div 
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {events.map((event) => (
//               <div key={event.id} className="w-full flex-shrink-0 relative">
//                 <div className="relative h-96 md:h-[500px]">
//                   <img 
//                     src={event.image} 
//                     alt={event.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
//                   {/* Event Content */}
//                   <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                     <div className="max-w-3xl">
//                       <h3 className="text-2xl md:text-4xl font-bold mb-4">{event.title}</h3>
//                       <p className="text-lg mb-6 opacity-90 line-clamp-3">{event.description}</p>
                      
//                       <div className="flex flex-wrap items-center gap-6 mb-6">
//                         <div className="flex items-center space-x-2">
//                           <Calendar size={18} />
//                           <span>{new Date(event.date).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <MapPin size={18} />
//                           <span>{event.location}</span>
//                         </div>
//                       </div>
                      
//                       <Link
//                         to={`/event/${event.id}`}
//                         className="inline-block bg-persian-600 hover:bg-persian-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
//                       >
//                         {t('events.readMore')}
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation Arrows */}
//         {events.length > 1 && (
//           <>
//             <button
//               onClick={prevSlide}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </>
//         )}

//         {/* Slide Indicators */}
//         {events.length > 1 && (
//           <div className="flex justify-center space-x-3 mt-6">
//             {events.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   currentSlide === index ? 'bg-persian-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default EventsCarousel