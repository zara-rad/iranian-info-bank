import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tag, Building, MapPin, Phone, Mail, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { categories } from '../data/categories'
import Breadcrumb from '../components/Breadcrumb'
import GlobalSearch from '../components/global-search/GlobalSearch.jsx'
import { getLocalizedNumber } from '../utils/numberUtils'

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams()
  const { t, i18n } = useTranslation()

  const [subcategory, setSubcategory] = useState(null)
  const [category, setCategory] = useState(null)
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  const sampleBusinesses = [
    {
      id: 1,
      businessName: 'Dr. Ahmad Hosseini Medical Practice',
      ownerName: 'Dr. Ahmad Hosseini',
      description: 'Experienced family doctor providing comprehensive healthcare services for the Iranian community in Berlin.',
      address: 'Hauptstraße 123, 10115 Berlin',
      city: 'Berlin',
      phone: '+49 30 12345678',
      email: 'info@hosseini-praxis.de',
      website: 'www.hosseini-praxis.de',
      averageRating: 4.8,
      totalReviews: 127,
      isVerified: true
    },
    {
      id: 2,
      businessName: 'Praxis Dr. Maryam Karimi',
      ownerName: 'Dr. Maryam Karimi',
      description: 'Modern medical practice specializing in family medicine with Persian and German language support.',
      address: 'Friedrichstraße 45, 10117 Berlin',
      city: 'Berlin',
      phone: '+49 30 87654321',
      email: 'kontakt@praxis-karimi.de',
      website: 'www.praxis-karimi.de',
      averageRating: 4.9,
      totalReviews: 89,
      isVerified: true
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      const foundCategory = categories.find(cat => cat.id === parseInt(categoryId))
      const foundSubcategory = foundCategory?.subcategories.find(sub => sub.id === parseInt(subcategoryId))

      setCategory(foundCategory)
      setSubcategory(foundSubcategory)
      setBusinesses(sampleBusinesses)
      setLoading(false)
    }, 500)
  }, [categoryId, subcategoryId])

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t("subcategory.loading")}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("subcategory.notFoundTitle")}</h1>
            <p className="text-gray-600">{t("subcategory.notFoundText")}</p>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: category.name, link: `/category/${categoryId}` },
    { label: subcategory.name, link: null }
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
      
      {/* Subcategory Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Tag className="text-persian-600 mr-3" size={32} />
              <h1 className="text-4xl font-bold text-gray-900">{subcategory.name}</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {subcategory.description || t("subcategory.defaultDescription", { name: subcategory.name })}
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Building size={20} />
                <span>
                  {getLocalizedNumber(businesses.length, i18n.language)} {t("subcategory.businesses")}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭐</span>
                <span>{t("subcategory.verified")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {businesses.map((business) => (
              <div key={business.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 mr-3">
                        {business.businessName}
                      </h3>
                      {business.isVerified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          ✓ {t("subcategory.verifiedBadge")}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {business.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-medium">{business.averageRating}</span>
                        <span className="text-gray-500 ml-1">
                          ({getLocalizedNumber(business.totalReviews, i18n.language)} {t("subcategory.reviews")})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span>{business.address}</span>
                    </div>
                  </div>
                  
                  <div className="lg:ml-8 mt-4 lg:mt-0">
                    <div className="space-y-3">
                      <a
                        href={`tel:${business.phone}`}
                        className="flex items-center justify-center lg:justify-start space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Phone size={16} />
                        <span>{business.phone}</span>
                      </a>
                      
                      <a
                        href={`mailto:${business.email}`}
                        className="flex items-center justify-center lg:justify-start space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Mail size={16} />
                        <span>{t("subcategory.email")}</span>
                      </a>
                      
                      {business.website && (
                        <a
                          href={`https://${business.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center lg:justify-start space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Globe size={16} />
                          <span>{t("subcategory.website")}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubcategoryPage
