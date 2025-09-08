import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cities } from "../data/cities"; // ✅ import cities file

const CitySearch = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const cityMatches = cities
        .filter(
          (city) =>
            city.en.toLowerCase().includes(query.toLowerCase()) ||
            city.de.toLowerCase().includes(query.toLowerCase()) ||
            city.fa.includes(query) // ✅ Farsi search
        )
        .map((city) => ({
          name: city[i18n.language] || city.en, // ✅ show name in current language
          action: () => navigate(`/city/${encodeURIComponent(city.en)}`),
        }))
        .slice(0, 8);

      setSuggestions(cityMatches);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, navigate, i18n.language]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        suggestions[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    suggestion.action();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1)
          setQuery('');   // ✅ clears input

      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <MapPin className="mr-2 text-persian-600" size={24} />
          {t("citySearch.title")}
        </h3>
        <p className="text-gray-600 text-sm">{t("citySearch.subtitle")}</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("citySearch.placeholder")}
          className="w-full pl-10 pr-4 py-3 text-black border-2 border-gray-200 rounded-xl focus:border-persian-500 focus:outline-none transition-colors"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
          {query.length > 0 && (
            <div className="sticky top-0 bg-blue-50 px-4 py-2 border-b border-blue-200">
              <p className="text-sm font-medium text-blue-700">
                {t("citySearch.resultsFor", {
                  query,
                  count: suggestions.length,
                })}
              </p>
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <button
              key={`city-${suggestion.name}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                selectedIndex === index
                  ? "bg-persian-50 border-l-4 border-persian-500"
                  : ""
              }`}
            >
              <MapPin size={16} className="text-persian-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">
                {suggestion.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
