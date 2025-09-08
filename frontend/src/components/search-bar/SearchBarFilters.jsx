import React from "react"
import { useTranslation } from "react-i18next"

const SearchBarFilters = ({ searchType, setSearchType }) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => setSearchType("all")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          searchType === "all" ? "bg-persian-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {t("searchBar.filters.all")}
      </button>
      <button
        onClick={() => setSearchType("city")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          searchType === "city" ? "bg-persian-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {t("searchBar.filters.city")}
      </button>
      <button
        onClick={() => setSearchType("category")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          searchType === "category" ? "bg-persian-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {t("searchBar.filters.category")}
      </button>
    </div>
  )
}

export default SearchBarFilters
