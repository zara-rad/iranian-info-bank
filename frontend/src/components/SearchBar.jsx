import React, { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Tag, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBar = ({ isGlobal = false }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchType, setSearchType] = useState('all') // 'all', 'city', 'category'
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // German cities data
  const germanCities = [
    'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf', 
    'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg',
    'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster', 'Karlsruhe',
    'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig',
    'Chemnitz', 'Kiel', 'Aachen', 'Halle', 'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck',
    'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel', 'Hagen', 'Potsdam', 'Saarbrücken'
  ]

  // Categories with subcategories
  const categories = [
    {
      id: 1,
      name: 'Medical & Healthcare',
      nameGerman: 'Medizin & Gesundheit',
      namePersian: 'پزشکی و مراقبت از سلامت',
      subcategories: [
        { id: 11, name: 'General Practitioners', nameGerman: 'Hausärzte', namePersian: 'پزشک عمومی' },
        { id: 12, name: 'Specialists', nameGerman: 'Fachärzte', namePersian: 'متخصصان' },
        { id: 13, name: 'Dentists & Orthodontists', nameGerman: 'Zahnärzte & Kieferorthopäden', namePersian: 'دندانپزشک و ارتودنتیست' },
        { id: 14, name: 'Pharmacies', nameGerman: 'Apotheken', namePersian: 'داروخانه' }
      ]
    },
    {
      id: 2,
      name: 'Beauty & Wellness',
      nameGerman: 'Schönheit & Wellness',
      namePersian: 'زیبایی و سلامتی',
      subcategories: [
        { id: 21, name: 'Hairdressers & Barber Shops', nameGerman: 'Friseure & Barbershops', namePersian: 'آرایشگاه مردانه و زنانه' },
        { id: 22, name: 'Beauty Salons', nameGerman: 'Kosmetikstudios', namePersian: 'سالن زیبایی' },
        { id: 23, name: 'Massage & Spa Centers', nameGerman: 'Massage & Spa Zentren', namePersian: 'مراکز ماساژ و اسپا' }
      ]
    },
    {
      id: 3,
      name: 'Construction & Handwerk',
      nameGerman: 'Bau & Handwerk',
      namePersian: 'ساختمان و صنایع دستی',
      subcategories: [
        { id: 31, name: 'Electricians', nameGerman: 'Elektriker', namePersian: 'برقکار' },
        { id: 32, name: 'Plumbers', nameGerman: 'Klempner', namePersian: 'لوله‌کش' },
        { id: 33, name: 'Painters & Decorators', nameGerman: 'Maler & Dekorateure', namePersian: 'نقاش و دکوراتور' }
      ]
    },
    {
      id: 4,
      name: 'Gastronomy & Restaurants',
      nameGerman: 'Gastronomie & Restaurants',
      namePersian: 'رستوران‌ها و غذاخوری‌ها',
      subcategories: [
        { id: 41, name: 'Persian Restaurants', nameGerman: 'Persische Restaurants', namePersian: 'رستوران‌های ایرانی' },
        { id: 42, name: 'Cafés & Coffee Shops', nameGerman: 'Cafés & Kaffeehäuser', namePersian: 'کافه و قهوه‌خانه' },
        { id: 43, name: 'Bakeries', nameGerman: 'Bäckereien', namePersian: 'نانوایی' }
      ]
    }
  ]

  useEffect(() => {
    if (query.length > 0) {
      let cityMatches = []
      let categoryMatches = []
      let subcategoryMatches = []

      // City matches
      if (searchType === 'all' || searchType === 'city') {
        cityMatches = germanCities
          .filter(city => city.toLowerCase().includes(query.toLowerCase()))
          .map(city => ({ 
            type: 'city', 
            name: city, 
            displayName: city,
            action: () => navigate(`/city/${encodeURIComponent(city)}`)
          }))
          .slice(0, 5)
      }

      // Category matches
      if (searchType === 'all' || searchType === 'category') {
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
          .slice(0, 3)

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
        subcategoryMatches = subcategoryMatches.slice(0, 5)
      }

      setSuggestions([...cityMatches, ...categoryMatches, ...subcategoryMatches])
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query, searchType, navigate])

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
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
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchBarClasses = isGlobal 
    ? "relative w-full max-w-md" 
    : "relative w-full max-w-2xl mx-auto"

  const inputClasses = isGlobal
    ? "w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-persian-500 focus:outline-none transition-colors"
    : "w-full px-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-persian-500 focus:outline-none transition-colors"

  return (
    <div className={searchBarClasses} ref={searchRef}>
      {!isGlobal && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="mr-2">🏙️</span>
            Search by City & Category
          </h2>
          <p className="text-gray-600">Find Iranian businesses in your city or browse by category</p>
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isGlobal ? "Search..." : "Search by city or category..."}
          className={inputClasses}
        />
        <Search className={`absolute ${isGlobal ? 'left-3 top-1/2' : 'left-4 top-1/2'} transform -translate-y-1/2 text-gray-400`} size={isGlobal ? 18 : 24} />
        {!isGlobal && (
          <button
            onClick={() => handleSearch()}
            className="absolute right-2 top-2 bg-persian-600 hover:bg-persian-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Search size={18} />
          </button>
        )}
      </div>

      {/* Search Type Filters (only for main search) */}
      {!isGlobal && (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setSearchType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'all' 
                ? 'bg-persian-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSearchType('city')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'city' 
                ? 'bg-persian-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cities
          </button>
          <button
            onClick={() => setSearchType('category')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'category' 
                ? 'bg-persian-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Categories
          </button>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-80 overflow-y-auto ${isGlobal ? 'text-sm' : ''}`}>
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.name}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                selectedIndex === index ? 'bg-persian-50 border-l-4 border-persian-500' : ''
              }`}
            >
              {suggestion.type === 'city' && (
                <MapPin size={18} className="text-persian-500 flex-shrink-0" />
              )}
              {suggestion.type === 'category' && (
                <Tag size={18} className="text-gold-500 flex-shrink-0" />
              )}
              {suggestion.type === 'subcategory' && (
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Tag size={16} className="text-gold-500" />
                  <ChevronRight size={14} className="text-gray-400" />
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

export default SearchBar