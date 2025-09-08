import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tag, Building } from 'lucide-react'
import { categories } from '../data/categories'
import Breadcrumb from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import GlobalSearch from '../components/GlobalSearch'

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCategory = categories.find(cat => cat.id === parseInt(categoryId))
      setCategory(foundCategory)
      setLoading(false)
    }, 500)
  }, [categoryId])

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading category...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600">The requested category could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: category.name, link: null }
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
      
      {/* Category Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-4">{category.icon}</span>
              <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Building size={20} />
                <span>{category.businessCount} businesses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag size={20} />
                <span>{category.subcategories.length} subcategories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {category.name} Subcategories
            </h2>
            <p className="text-lg text-gray-600">
              Choose a specific service type
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/category/${categoryId}/subcategory/${subcategory.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 group-hover:scale-105 transform transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <Tag className="text-persian-600" size={24} />
                    <span className="bg-persian-100 text-persian-800 px-3 py-1 rounded-full text-sm font-medium">
                      {subcategory.businessCount} businesses
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-persian-600 transition-colors">
                    {subcategory.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {subcategory.nameGerman}
                  </p>
                  
                  <div className="flex items-center text-persian-600 group-hover:text-persian-700 transition-colors">
                    <span className="text-sm font-medium">View businesses</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CategoryPage