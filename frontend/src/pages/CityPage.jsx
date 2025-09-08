import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Building } from 'lucide-react'
import { categories as allCategories } from '../data/categories'
import Breadcrumb from '../components/Breadcrumb'
import CategoryCard from '../components/CategoryCard'
import GlobalSearch from '../components/global-search/GlobalSearch.jsx'

const CityPage = () => {
  const { cityName } = useParams()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(allCategories)
      setLoading(false)
    }, 500)
  }, [cityName])

  const breadcrumbItems = [
    { label: decodeURIComponent(cityName), link: null }
  ]

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    )
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
      
      {/* City Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="text-persian-600 mr-3" size={32} />
              <h1 className="text-4xl font-bold text-gray-900">{decodeURIComponent(cityName)}</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Iranian businesses and services available in {decodeURIComponent(cityName)}
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Building size={20} />
                <span>{categories.reduce((total, cat) => total + cat.businessCount, 0)} businesses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📂</span>
                <span>{categories.length} categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Categories in {decodeURIComponent(cityName)}
            </h2>
            <p className="text-lg text-gray-600">
              Browse Iranian businesses by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                cityFilter={decodeURIComponent(cityName)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CityPage