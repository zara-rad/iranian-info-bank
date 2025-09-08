import React from 'react'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SearchInput = ({
  query,
  setQuery,
  handleKeyDown,
  placeholder,
  withButton = false,
  onSubmit
}) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'fa'

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`w-full ${
          withButton
            ? `${isRTL ? 'pr-40 pl-6' : 'pl-16 pr-6'} py-5 text-xl border-2 rounded-2xl shadow-lg`
            : `${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 text-sm border rounded-lg`
        } text-black border-gray-300 focus:border-persian-500 focus:outline-none transition-colors ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      />

      {/* 🔹 Search icon moves depending on direction */}
      <Search
        className={`absolute ${
          withButton
            ? isRTL
              ? 'right-6 top-1/2 -translate-y-1/2 text-gray-400'
              : 'left-6 top-1/2 -translate-y-1/2 text-gray-400'
            : isRTL
            ? 'right-3 top-1/2 -translate-y-1/2 text-gray-400'
            : 'left-3 top-1/2 -translate-y-1/2 text-gray-400'
        }`}
        size={withButton ? 28 : 18}
      />

      {/* 🔹 Keep button always on the right (or mirror if you prefer) */}
      {withButton && (
        <button
          onClick={onSubmit}
          className="absolute right-3 top-3 bg-persian-600 hover:bg-persian-700 text-white px-8 py-3 rounded-xl transition-colors font-medium"
        >
          Search
        </button>
      )}
    </div>
  )
}

export default SearchInput
