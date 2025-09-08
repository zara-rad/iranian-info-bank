import React from "react"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

const SearchBarInput = ({ query, setQuery, handleKeyDown, isGlobal, onSubmit }) => {
  const { t } = useTranslation()

  const inputClasses = isGlobal
    ? "w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-persian-500 focus:outline-none transition-colors"
    : "w-full px-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-persian-500 focus:outline-none transition-colors"

  return (
    <div className="relative">
      <input
        type="text"
        value={query}  // ✅ controlled input
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          isGlobal ? t("searchBar.placeholderGlobal") : t("searchBar.placeholderMain")
        }
        className={inputClasses}
      />
      <Search
        className={`absolute ${isGlobal ? "left-3 top-1/2" : "left-4 top-1/2"} transform -translate-y-1/2 text-gray-400`}
        size={isGlobal ? 18 : 24}
      />
      {!isGlobal && (
        <button
          type="button"
          onClick={() => onSubmit(query)}  
          className="absolute right-2 top-2 bg-persian-600 hover:bg-persian-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          <Search size={18} />
        </button>
      )}
    </div>
  )
}

export default SearchBarInput
