import React from 'react'
import SearchBarSuggestionItem from './SearchBarSuggestionItem'

const SearchBarSuggestionsDropdown = ({
  suggestions,
  selectedIndex,
  handleSuggestionClick,
  isGlobal
}) => (
  <div
    className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-80 overflow-y-auto ${
      isGlobal ? 'text-sm' : ''
    }`}
  >
    {suggestions.map((suggestion, index) => (
      <SearchBarSuggestionItem
        key={`${suggestion.type}-${suggestion.name}-${index}`}
        suggestion={suggestion}
        isSelected={selectedIndex === index}
        onClick={() => handleSuggestionClick(suggestion)}
      />
    ))}
  </div>
)

export default SearchBarSuggestionsDropdown
