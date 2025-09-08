import React from 'react'
import { Search } from 'lucide-react'

const SearchInput = ({
  query,
  setQuery,
  handleKeyDown,
  placeholder,
  withButton = false,
  onSubmit
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full ${
          withButton
            ? 'px-16 py-5 text-xl border-2 rounded-2xl shadow-lg'
            : 'pl-10 pr-4 py-2 text-sm border rounded-lg'
        } text-black border-gray-300 focus:border-persian-500 focus:outline-none transition-colors`}
      />
      <Search
        className={`absolute ${
          withButton
            ? 'left-6 top-1/2 transform -translate-y-1/2 text-gray-400'
            : 'left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
        }`}
        size={withButton ? 28 : 18}
      />

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
