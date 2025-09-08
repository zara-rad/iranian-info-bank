import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { categories as allCategories } from '../data/categories'
import GlobalSearch from '../components/GlobalSearch'
import CitySearch from '../components/CitySearch'
import CategorySearch from '../components/CategorySearch'
import EventsCarousel from '../components/EventsCarousel'
import CategoryCard from '../components/CategoryCard'

const Home = () => {
  const { t } = useTranslation()
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(6)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories(allCategories)
  }, [])

  const visibleCategories = allCategories.slice(0, visibleCategoriesCount)
  const hasMoreCategories = visibleCategoriesCount < allCategories.length
  
  const showMoreCategories = () => {
    setVisibleCategoriesCount(prev => Math.min(prev + 3, allCategories.length))
  }
  
  const showLessCategories = () => {
    setVisibleCategoriesCount(prev => Math.max(prev - 3, 6))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Global Search */}
          <GlobalSearch />
          
          {/* Smaller Searches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CitySearch />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CategorySearch />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsCarousel />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover Iranian businesses and services organized by category across Germany
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Show More/Less Button */}
          <div className="text-center mt-12">
            {hasMoreCategories && (
              <button
                onClick={showMoreCategories}
                className="inline-flex items-center space-x-2 bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
              >
                <span>Show More ({Math.min(3, allCategories.length - visibleCategoriesCount)} more)</span>
                <ChevronDown size={20} />
              </button>
            )}
            
            {visibleCategoriesCount > 6 && (
              <button
                onClick={showLessCategories}
                className={`inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors font-medium ${hasMoreCategories ? 'ml-4' : ''}`}
              >
                <span>Show Less (3 less)</span>
                <ChevronUp size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">1,200+</div>
              <div className="text-gray-300">Registered Businesses</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">50+</div>
              <div className="text-gray-300">German Cities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">25</div>
              <div className="text-gray-300">Business Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">5,000+</div>
              <div className="text-gray-300">Monthly Visitors</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home