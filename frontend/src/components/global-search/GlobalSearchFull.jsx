import React from 'react'
import { useTranslation } from 'react-i18next'
import SearchInput from './SearchInput'
import SuggestionsDropdown from './SuggestionsDropdown'

const GlobalSearchFull = ({
  query,
  setQuery,
  suggestions,
  isOpen,
  selectedIndex,
  handleKeyDown,
  handleSuggestionClick,
  handleSearch,
  searchRef
}) => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8" ref={searchRef}>
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {t("globalSearch.title")}
        </h2>
        <p className="text-gray-600">{t("globalSearch.subtitle")}</p>
      </div>

      <SearchInput
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        placeholder={t("search.placeholder")}
        withButton
        onSubmit={handleSearch}
      />

      {isOpen && suggestions.length > 0 && (
        <SuggestionsDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          handleSuggestionClick={handleSuggestionClick}
          query={query}
        />
      )}
    </div>
  )
}

export default GlobalSearchFull
