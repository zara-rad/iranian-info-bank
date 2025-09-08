import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, MapPin, Phone, Mail, Globe, Clock, Euro, Users, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import GlobalSearch from '../components/global-search/GlobalSearch.jsx'

const EventDetail = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sample events data (same as in EventsCarousel)
  const sampleEvents = [
    {
      id: 1,
      title: 'Nowruz Celebration 2025',
      titleGerman: 'Nowruz Feier 2025',
      titlePersian: 'جشن نوروز ۲۰۲۵',
      description: 'Join us for the Persian New Year celebration with traditional music, food, and cultural performances. Experience the beauty of Iranian culture with families from across Germany.',
      descriptionGerman: 'Begleiten Sie uns zur persischen Neujahrsfeier mit traditioneller Musik, Essen und kulturellen Aufführungen. Erleben Sie die Schönheit der iranischen Kultur mit Familien aus ganz Deutschland.',
      descriptionPersian: 'در جشن سال نو فارسی با موسیقی سنتی، غذا و اجراهای فرهنگی به ما بپیوندید. زیبایی فرهنگ ایرانی را با خانواده‌هایی از سراسر آلمان تجربه کنید.',
      image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2025-03-20',
      time: '18:00 - 23:00',
      location: 'Berlin',
      venue: 'Persian Cultural Center',
      address: 'Kulturzentrum Persien, Hauptstraße 123, 10115 Berlin',
      contactPhone: '+49 30 12345678',
      contactEmail: 'nowruz@persian-culture.de',
      website: 'www.persian-culture.de',
      eventType: 'cultural',
      isFree: false,
      ticketPrice: 25,
      organizer: {
        name: 'Persian Cultural Association Berlin',
        phone: '+49 30 12345678',
        email: 'info@persian-culture.de'
      },
      tags: ['nowruz', 'persian', 'culture', 'celebration', 'new-year']
    },
    {
      id: 2,
      title: 'Iranian Business Networking Event',
      titleGerman: 'Iranisches Business Networking Event',
      titlePersian: 'رویداد شبکه‌سازی کسب‌وکار ایرانی',
      description: 'Connect with Iranian entrepreneurs and business owners across Germany. Share experiences, find partnerships, and grow your network.',
      descriptionGerman: 'Vernetzen Sie sich mit iranischen Unternehmern und Geschäftsinhabern in ganz Deutschland. Teilen Sie Erfahrungen, finden Sie Partnerschaften und erweitern Sie Ihr Netzwerk.',
      descriptionPersian: 'با کارآفرینان و صاحبان کسب‌وکار ایرانی در سراسر آلمان ارتباط برقرار کنید. تجربیات را به اشتراک بگذارید، شراکت‌ها پیدا کنید و شبکه خود را گسترش دهید.',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2025-02-15',
      time: '19:00 - 22:00',
      location: 'Hamburg',
      venue: 'Business Center Hamburg',
      address: 'Geschäftszentrum Hamburg, Mönckebergstraße 7, 20095 Hamburg',
      contactPhone: '+49 40 87654321',
      contactEmail: 'networking@iranian-business.de',
      website: 'www.iranian-business.de',
      eventType: 'business',
      isFree: true,
      organizer: {
        name: 'Iranian Business Network Germany',
        phone: '+49 40 87654321',
        email: 'info@iranian-business.de'
      },
      tags: ['business', 'networking', 'entrepreneurs', 'iranian']
    },
    {
      id: 3,
      title: 'Persian Poetry Night',
      titleGerman: 'Persische Poesie Nacht',
      titlePersian: 'شب شعر فارسی',
      description: 'An evening celebrating Persian literature and poetry with renowned poets.',
      descriptionGerman: 'Ein Abend zur Feier der persischen Literatur und Poesie mit renommierten Dichtern.',
      descriptionPersian: 'شبی برای جشن ادبیات و شعر فارسی با شاعران مشهور.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2025-02-28',
      time: '20:00 - 23:00',
      location: 'Munich',
      venue: 'Cultural Hall Munich',
      address: 'Kulturhalle München, Maximilianstraße 15, 80539 München',
      contactPhone: '+49 89 12345678',
      contactEmail: 'poetry@persian-culture-munich.de',
      website: 'www.persian-culture-munich.de',
      eventType: 'cultural',
      isFree: false,
      ticketPrice: 15,
      organizer: {
        name: 'Persian Cultural Society Munich',
        phone: '+49 89 12345678',
        email: 'info@persian-culture-munich.de'
      },
      tags: ['poetry', 'literature', 'persian', 'culture', 'art']
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundEvent = sampleEvents.find(event => event.id === parseInt(eventId))
      setEvent(foundEvent)
      setLoading(false)
    }, 500)
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">The requested event could not be found.</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Events', link: '/events' },
    { label: event.title, link: null }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Global Search Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalSearch />
        </div>
      </section>
      
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Event Hero Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-persian-600 hover:text-persian-700 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Event Image */}
                <div className="relative h-96">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Event Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-persian-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {event.eventType}
                    </span>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    {event.isFree ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Free Event
                      </span>
                    ) : (
                      <span className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Euro size={14} />
                        <span>{event.ticketPrice}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                  
                  {/* Event Meta */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-persian-600" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-persian-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={18} className="text-persian-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose max-w-none mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
                    
                    {event.descriptionGerman && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Deutsch:</h4>
                        <p className="text-gray-700 leading-relaxed">{event.descriptionGerman}</p>
                      </div>
                    )}
                    
                    {event.descriptionPersian && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">فارسی:</h4>
                        <p className="text-gray-700 leading-relaxed text-right" dir="rtl">{event.descriptionPersian}</p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-medium text-gray-900 mb-3">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <span key={index} className="bg-persian-100 text-persian-800 px-3 py-1 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-persian-600 mt-1" size={18} />
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p className="text-gray-600">{formatDate(event.date)}</p>
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
                        {event.isFree ? 'Free' : `€${event.ticketPrice}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizer Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Organizer</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="text-persian-600" size={18} />
                    <span className="font-medium text-gray-900">{event.organizer.name}</span>
                  </div>
                  
                  {event.organizer.phone && (
                    <a
                      href={`tel:${event.organizer.phone}`}
                      className="flex items-center space-x-2 text-persian-600 hover:text-persian-700 transition-colors"
                    >
                      <Phone size={18} />
                      <span>{event.organizer.phone}</span>
                    </a>
                  )}
                  
                  {event.organizer.email && (
                    <a
                      href={`mailto:${event.organizer.email}`}
                      className="flex items-center space-x-2 text-persian-600 hover:text-persian-700 transition-colors"
                    >
                      <Mail size={18} />
                      <span>{event.organizer.email}</span>
                    </a>
                  )}
                  
                  {event.website && (
                    <a
                      href={`https://${event.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-persian-600 hover:text-persian-700 transition-colors"
                    >
                      <Globe size={18} />
                      <span>{event.website}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-persian-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-persian-800 mb-4">Contact Event</h3>
                
                <div className="space-y-3">
                  {event.contactPhone && (
                    <a
                      href={`tel:${event.contactPhone}`}
                      className="w-full bg-persian-600 hover:bg-persian-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone size={18} />
                      <span>Call Now</span>
                    </a>
                  )}
                  
                  {event.contactEmail && (
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Mail size={18} />
                      <span>Send Email</span>
                    </a>
                  )}
                  
                  {event.website && (
                    <a
                      href={`https://${event.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Globe size={18} />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetail