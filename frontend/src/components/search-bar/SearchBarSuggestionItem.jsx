import React from "react"
import { MapPin, Tag, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

const SearchBarSuggestionItem = ({ suggestion, isSelected, onClick }) => {
  const { t } = useTranslation()

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-persian-50 border-l-4 border-persian-500" : ""
      }`}
    >
      {suggestion.type === "city" && <MapPin size={18} className="text-persian-500 flex-shrink-0" />}
      {suggestion.type === "category" && <Tag size={18} className="text-gold-500 flex-shrink-0" />}
      {suggestion.type === "subcategory" && (
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
        {suggestion.type === "subcategory" && (
          <span className="text-gray-400 text-xs block truncate">
            {t("searchBar.suggestion.inCategory", { category: suggestion.categoryName })}
          </span>
        )}
      </div>

      <span className="text-xs text-gray-400 capitalize flex-shrink-0">
        {suggestion.type === "subcategory" ? t("searchBar.suggestion.service") : suggestion.type}
      </span>
    </button>
  )
}

export default SearchBarSuggestionItem
