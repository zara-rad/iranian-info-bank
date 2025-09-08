import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { categories } from '../../data/categories'
import GlobalSearchCompact from './GlobalSearchCompact'
import GlobalSearchFull from './GlobalSearchFull'

const GlobalSearch = ({ isCompact = false }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showAllResults, setShowAllResults] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  // German cities data
  const germanCities = [
    'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf',
    'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg',
    'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster', 'Karlsruhe',
    'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig',
    'Chemnitz', 'Kiel', 'Aachen', 'Halle', 'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck',
    'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel', 'Hagen', 'Potsdam', 'Saarbrücken'
  ]

  // 🔹 Filter suggestions when query changes
  useEffect(() => {
    if (query.length > 0) {
      let cityMatches = []
      let categoryMatches = []
      let subcategoryMatches = []

      // Cities
      cityMatches = germanCities
        .filter(city => city.toLowerCase().includes(query.toLowerCase()))
        .map(city => ({
          type: 'city',
          name: city,
          displayName: city,
          action: () => navigate(`/city/${encodeURIComponent(city)}`)
        }))
        .slice(0, 5)

      // Categories
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

      // Subcategories
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
      showAllItems()
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query, navigate])

  // 🔹 Show all cities + categories
  const showAllItems = () => {
    let allItems = []

    germanCities.forEach(city => {
      allItems.push({
        type: 'city',
        name: city,
        displayName: city,
        sortKey: city.toLowerCase(),
        action: () => navigate(`/city/${encodeURIComponent(city)}`)
      })
    })

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

  // 🔹 Close dropdown when clicking outside
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

  return isCompact ? (
    <GlobalSearchCompact
      query={query}
      setQuery={setQuery}
      suggestions={suggestions}
      isOpen={isOpen}
      selectedIndex={selectedIndex}
      handleKeyDown={handleKeyDown}
      handleSuggestionClick={handleSuggestionClick}
      searchRef={searchRef}
    />
  ) : (
    <GlobalSearchFull
      query={query}
      setQuery={setQuery}
      suggestions={suggestions}
      isOpen={isOpen}
      selectedIndex={selectedIndex}
      handleKeyDown={handleKeyDown}
      handleSuggestionClick={handleSuggestionClick}
      handleSearch={handleSearch}
      searchRef={searchRef}
    />
  )
}

export default GlobalSearch
