import React from 'react'
import { MapPin, Tag, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SuggestionItem = ({ suggestion, isSelected, onClick, compact }) => {
  const { t } = useTranslation()

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${
        compact ? 'space-x-3 px-4 py-3 text-sm' : 'space-x-4 px-6 py-4 text-base'
      } text-left hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-persian-50 border-l-4 border-persian-500' : ''
      }`}
    >
      {suggestion.type === 'city' && (
        <MapPin size={compact ? 16 : 20} className="text-persian-500 flex-shrink-0" />
      )}
      {suggestion.type === 'category' && (
        <Tag size={compact ? 16 : 20} className="text-gold-500 flex-shrink-0" />
      )}
      {suggestion.type === 'subcategory' && (
        <div className="flex items-center space-x-1 flex-shrink-0">
          <Tag size={compact ? 14 : 18} className="text-gold-500" />
          <ChevronRight size={compact ? 12 : 16} className="text-gray-400" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <span
          className={`text-gray-700 font-medium block truncate ${
            compact ? '' : 'text-lg'
          }`}
        >
          {suggestion.displayName}
        </span>
        {suggestion.nameGerman && (
          <span
            className={`block truncate text-gray-500 ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            {suggestion.nameGerman}
          </span>
        )}
        {suggestion.type === 'subcategory' && (
          <span
            className={`block truncate text-gray-400 ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            {t("globalSearch.inCategory", { category: suggestion.categoryName })}
          </span>
        )}
      </div>

      <span
        className={`capitalize text-gray-400 flex-shrink-0 ${
          compact ? 'text-xs' : 'text-sm'
        }`}
      >
        {suggestion.type === 'subcategory'
          ? t("globalSearch.serviceLabel")
          : suggestion.type}
      </span>
    </button>
  )
}

export default SuggestionItem
