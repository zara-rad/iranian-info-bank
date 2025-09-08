import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="group">
      <div className="card overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Icon */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
            {category.icon}
          </div>
          
          {/* Business Count Badge */}
          <div className="absolute top-4 right-4 bg-persian-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category.businessCount} businesses
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-persian-600 transition-colors">
              {category.name}
            </h3>
            <ChevronRight 
              size={20} 
              className="text-gray-400 group-hover:text-persian-600 group-hover:translate-x-1 transition-all" 
            />
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard