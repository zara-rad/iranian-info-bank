import React, { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Tag, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/categories'

const GlobalSearch = ({ isCompact = false }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showAllResults, setShowAllResults] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // German cities data
  const germanCities = [
    'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf', 
    'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg',
    'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster', 'Karlsruhe',
    'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig',
    'Chemnitz', 'Kiel', 'Aachen', 'Halle', 'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck',
    'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel', 'Hagen', 'Potsdam', 'Saarbrücken'
  ]

  useEffect(() => {
    if (query.length > 0) {
      let cityMatches = []
      let categoryMatches = []
      let subcategoryMatches = []

      // City matches
      cityMatches = germanCities
        .filter(city => city.toLowerCase().includes(query.toLowerCase()))
        .map(city => ({ 
          type: 'city', 
          name: city, 
          displayName: city,
          action: () => navigate(`/city/${encodeURIComponent(city)}`)
        }))
        .slice(0, 5)

      // Category matches
      categoryMatches = categories
        .filter(category => 
          category.name.toLowerCase().includes(query.toLowerCase()) ||
          category.nameGerman.toLowerCase().includes(query.toLowerCase())
        )
        .map(category => ({ 
          type: 'category', 
          name: category.name,
          nameGerman: category.nameGerman,
          displayName: category.name,
          id: category.id,
          subcategories: category.subcategories,
          action: () => navigate(`/category/${category.id}`)
        }))
        .slice(0, 2)

      // Subcategory matches
      categories.forEach(category => {
        const matchingSubcategories = category.subcategories.filter(sub =>
          sub.name.toLowerCase().includes(query.toLowerCase()) ||
          sub.nameGerman.toLowerCase().includes(query.toLowerCase())
        )
        
        matchingSubcategories.forEach(sub => {
          subcategoryMatches.push({
            type: 'subcategory',
            name: sub.name,
            nameGerman: sub.nameGerman,
            displayName: sub.name,
            categoryName: category.name,
            categoryId: category.id,
            id: sub.id,
            action: () => navigate(`/category/${category.id}/subcategory/${sub.id}`)
          })
        })
      })
      subcategoryMatches = subcategoryMatches.slice(0, 8)

      setSuggestions([...cityMatches, ...categoryMatches, ...subcategoryMatches])
      setIsOpen(true)
    } else if (showAllResults) {
      // Keep showing all results when no query but showAllResults is true
      showAllItems()
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query, navigate])

  const showAllItems = () => {
    let allItems = []
    
    // Add all cities
    germanCities.forEach(city => {
      allItems.push({
        type: 'city',
        name: city,
        displayName: city,
        sortKey: city.toLowerCase(),
        action: () => navigate(`/city/${encodeURIComponent(city)}`)
      })
    })
    
    // Add all categories
    categories.forEach(category => {
      allItems.push({
        type: 'category',
        name: category.name,
        nameGerman: category.nameGerman,
        displayName: category.name,
        sortKey: category.name.toLowerCase(),
        id: category.id,
        action: () => navigate(`/category/${category.id}`)
      })
      
      // Add all subcategories
      category.subcategories.forEach(sub => {
        allItems.push({
          type: 'subcategory',
          name: sub.name,
          nameGerman: sub.nameGerman,
          displayName: sub.name,
          sortKey: sub.name.toLowerCase(),
          categoryName: category.name,
          categoryId: category.id,
          id: sub.id,
          action: () => navigate(`/category/${category.id}/subcategory/${sub.id}`)
        })
      })
    })
    
    // Sort alphabetically (a-A to z-Z)
    allItems.sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    
    setSuggestions(allItems)
    setShowAllResults(true)
    setIsOpen(true)
    setQuery('')
  }
  
  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
      setShowAllResults(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        suggestions[selectedIndex].action()
      } else {
        handleSearch()
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setSelectedIndex(-1)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    suggestion.action()
    setIsOpen(false)
    setShowAllResults(false)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
        setShowAllResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isCompact) {
    return (
      <div className="relative w-full max-w-md" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm text-black border border-gray-300 rounded-lg focus:border-persian-500 focus:outline-none transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-80 overflow-y-auto text-sm">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.name}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  selectedIndex === index ? 'bg-persian-50 border-l-4 border-persian-500' : ''
                }`}
              >
                {suggestion.type === 'city' && (
                  <MapPin size={16} className="text-persian-500 flex-shrink-0" />
                )}
                {suggestion.type === 'category' && (
                  <Tag size={16} className="text-gold-500 flex-shrink-0" />
                )}
                {suggestion.type === 'subcategory' && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Tag size={14} className="text-gold-500" />
                    <ChevronRight size={12} className="text-gray-400" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <span className="text-gray-700 font-medium block truncate">{suggestion.displayName}</span>
                  {suggestion.nameGerman && (
                    <span className="text-gray-500 text-xs block truncate">{suggestion.nameGerman}</span>
                  )}
                  {suggestion.type === 'subcategory' && (
                    <span className="text-gray-400 text-xs block truncate">in {suggestion.categoryName}</span>
                  )}
                </div>
                
                <span className="text-xs text-gray-400 capitalize flex-shrink-0">
                  {suggestion.type === 'subcategory' ? 'service' : suggestion.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8" ref={searchRef}>
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          🔍 Global Search
        </h2>
        <p className="text-gray-600">Search for businesses, cities, or categories</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowAllResults(false)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
          className="w-full px-16 py-5 text-xl text-black border-2 border-gray-200 rounded-2xl focus:border-persian-500 focus:outline-none transition-colors shadow-lg"
        />
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={28} />
        <button
          onClick={() => handleSearch()}
          className="absolute right-3 top-3 bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-xl transition-colors font-medium"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl mt-2 z-50 max-h-96 overflow-y-auto">
          {query.length > 0 && (
            <div className="sticky top-0 bg-blue-50 px-6 py-3 border-b border-blue-200">
              <p className="text-sm font-medium text-blue-700">
                Search results for "{query}" ({suggestions.length} found)
              </p>
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.name}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                selectedIndex === index ? 'bg-persian-50 border-l-4 border-persian-500' : ''
              }`}
            >
              {suggestion.type === 'city' && (
                <MapPin size={20} className="text-persian-500 flex-shrink-0" />
              )}
              {suggestion.type === 'category' && (
                <Tag size={20} className="text-gold-500 flex-shrink-0" />
              )}
              {suggestion.type === 'subcategory' && (
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Tag size={18} className="text-gold-500" />
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <span className="text-gray-700 font-medium block truncate text-lg">{suggestion.displayName}</span>
                {suggestion.nameGerman && (
                  <span className="text-gray-500 text-sm block truncate">{suggestion.nameGerman}</span>
                )}
                {suggestion.type === 'subcategory' && (
                  <span className="text-gray-400 text-sm block truncate">in {suggestion.categoryName}</span>
                )}
              </div>
              
              <span className="text-sm text-gray-400 capitalize flex-shrink-0">
                {suggestion.type === 'subcategory' ? 'service' : suggestion.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GlobalSearch