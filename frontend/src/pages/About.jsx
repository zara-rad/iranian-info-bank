import React from 'react'
import { useTranslation } from 'react-i18next'
import { Heart, Users, MapPin, Target, Globe, Handshake } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import GlobalSearch from '../components/GlobalSearch'

const About = () => {
  const { t } = useTranslation()

  const breadcrumbItems = [
    { label: 'About Us', link: null }
  ]

  const values = [
    {
      icon: <Heart className="text-persian-600" size={32} />,
      title: 'Community First',
      description: 'We believe in the power of community and helping each other succeed in Germany.'
    },
    {
      icon: <Users className="text-persian-600" size={32} />,
      title: 'Reliable Information',
      description: 'All our listings are verified and regularly updated to ensure accuracy.'
    },
    {
      icon: <Globe className="text-persian-600" size={32} />,
      title: 'Cultural Bridge',
      description: 'Building connections between Iranian culture and German society.'
    },
    {
      icon: <Handshake className="text-persian-600" size={32} />,
      title: 'Trust & Support',
      description: 'Creating a trusted platform where every Iranian feels supported and at home.'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Global Search Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalSearch />
        </div>
      </section>
      
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connecting Iranian businesses with the community in Germany
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Iranian couple in Germany"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-persian-600">
                    <MapPin size={20} />
                    <span className="font-medium">Germany 🇩🇪 • Iran 🇮🇷</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">IIB</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                We are an Iranian couple living in Germany who know how difficult it can be to adapt to a new country. 
                From finding the right services to understanding everyday life, we've experienced these challenges ourselves.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                That's why we created <strong className="text-persian-600">Iranian Info Bank in Germany</strong> — a place where 
                Iranians in Germany can easily find reliable information, services, and resources all in one place.
              </p>

              <div className="bg-persian-50 border-l-4 border-persian-500 p-6 rounded-r-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="text-persian-600" size={24} />
                  <h3 className="text-xl font-bold text-persian-800">Our Mission</h3>
                </div>
                <p className="text-persian-700 leading-relaxed">
                  Our goal is simple: to make life easier for every Iranian living in Germany. Whether it's housing, 
                  legal advice, health, education, shopping, or cultural activities, you'll find it here — clearly 
                  explained and always up to date.
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                We believe community means helping each other. With our platform, we hope to build a bridge between 
                Iran and Germany, so every Iranian feels supported and at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-persian-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-persian-100 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-persian-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-persian-100 text-lg">
              Growing together as a community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">1,200+</div>
              <div className="text-persian-100">Registered Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">50+</div>
              <div className="text-persian-100">German Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">17</div>
              <div className="text-persian-100">Business Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">5,000+</div>
              <div className="text-persian-100">Monthly Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Whether you're a business owner looking to reach the Iranian community or someone seeking 
            reliable services, we're here to help you connect and thrive in Germany.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Register Your Business
            </a>
            <a
              href="/contact"
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About