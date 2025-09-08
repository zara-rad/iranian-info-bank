import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Users } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import GlobalSearch from '../components/global-search/GlobalSearch.jsx'
import toast from 'react-hot-toast'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const breadcrumbItems = [
    { label: 'Contact Us', link: null }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: <Phone className="text-persian-600" size={24} />,
      title: 'Phone',
      value: '+49 170 0000000',
      description: 'Call us during business hours',
      action: 'tel:+491700000000'
    },
    {
      icon: <Mail className="text-persian-600" size={24} />,
      title: 'Email',
      value: 'you@example.com',
      description: 'Send us an email anytime',
      action: 'mailto:you@example.com'
    },
    {
      icon: <MapPin className="text-persian-600" size={24} />,
      title: 'Address',
      value: 'Germany',
      description: 'Serving all of Germany',
      action: null
    }
  ]

  const features = [
    {
      icon: <Users className="text-persian-600" size={32} />,
      title: 'Community Focused',
      description: 'Connecting Iranians across Germany with trusted services and professionals.'
    },
    {
      icon: <MessageCircle className="text-persian-600" size={32} />,
      title: 'Persian Speaking',
      description: 'Find professionals who speak Persian and understand your cultural needs.'
    },
    {
      icon: <Clock className="text-persian-600" size={32} />,
      title: 'Always Updated',
      description: 'Our listings are regularly updated to ensure accuracy and reliability.'
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get in Touch
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-persian-50 p-3 rounded-full flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
                      {info.action ? (
                        <a 
                          href={info.action}
                          className="text-persian-600 hover:text-persian-700 font-medium text-lg transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-900 font-medium text-lg">{info.value}</span>
                      )}
                      <p className="text-gray-600 text-sm mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* About Our Service */}
              <div className="bg-persian-50 border-l-4 border-persian-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-persian-800 mb-3">About Our Service</h3>
                <p className="text-persian-700 leading-relaxed">
                  We are dedicated to connecting the Iranian community in Germany with trusted professionals and services. 
                  Our platform makes it easy to find Persian-speaking professionals across various categories.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-persian-600 hover:bg-persian-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand the unique needs of the Iranian community in Germany
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-persian-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-persian-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-persian-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg text-persian-100 mb-8 leading-relaxed">
            Whether you're looking for services or want to list your business, we're here to help you connect with the Iranian community in Germany.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white hover:bg-gray-100 text-persian-600 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Register Your Business
            </a>
            <a
              href="/"
              className="bg-persian-700 hover:bg-persian-800 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Browse Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact