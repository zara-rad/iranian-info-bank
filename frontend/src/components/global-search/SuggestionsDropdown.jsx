import React from 'react'
import { useTranslation } from 'react-i18next'
import SuggestionItem from './SuggestionItem'

const SuggestionsDropdown = ({
  suggestions,
  selectedIndex,
  handleSuggestionClick,
  query,
  compact = false
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={`absolute top-full left-0 right-0 bg-white border border-gray-200 ${
        compact ? 'rounded-xl shadow-lg mt-2 max-h-80' : 'rounded-2xl shadow-xl mt-2 max-h-96'
      } z-50 overflow-y-auto`}
    >
      {!compact && query?.length > 0 && (
        <div className="sticky top-0 bg-blue-50 px-6 py-3 border-b border-blue-200">
          <p className="text-sm font-medium text-blue-700">
            {t("globalSearch.resultsFor", { query, count: suggestions.length })}
          </p>
        </div>
      )}

      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={`${suggestion.type}-${suggestion.name}-${index}`}
          suggestion={suggestion}
          isSelected={selectedIndex === index}
          onClick={() => handleSuggestionClick(suggestion)}
          compact={compact}
        />
      ))}
    </div>
  )
}

export default SuggestionsDropdown
