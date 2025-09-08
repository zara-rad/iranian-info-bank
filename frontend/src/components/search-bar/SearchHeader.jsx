import React from 'react'
import { useTranslation } from "react-i18next"

const SearchHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
        <span className="mr-2">🏙️</span>
        {t("searchBar.title")}
      </h2>
      <p className="text-gray-600">
        {t("searchBar.subtitle")}
      </p>
    </div>
  )
}

export default SearchHeader
