import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from './SearchInput'
import SuggestionsDropdown from './SuggestionsDropdown'

const GlobalSearchCompact = ({
  query,
  setQuery,
  suggestions,
  isOpen,
  selectedIndex,
  handleKeyDown,
  handleSuggestionClick,
  searchRef
}) => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        placeholder={t("search.placeholder")}
      />

      {isOpen && suggestions.length > 0 && (
        <SuggestionsDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          handleSuggestionClick={handleSuggestionClick}
          compact
        />
      )}
    </div>
  )
}

export default GlobalSearchCompact
