import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchHeader from "./SearchHeader";
import SearchBarInput from "./SearchBarInput";
import SearchBarFilters from "./SearchBarFilters";
import SearchBarSuggestionsDropdown from "./SearchBarSuggestionsDropdown";

// ✅ Import external data
import { cities } from "../../data/cities";
import { categories } from "../../data/categories";
import { useTranslation } from "react-i18next";

const SearchBar = ({ isGlobal = false }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchType, setSearchType] = useState("all");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  // 🔹 Helper to pick the correct language version
  const getLocalizedName = (item) => {
    if (i18n.language === "de") return item.nameGerman || item.de || item.name;
    if (i18n.language === "fa") return item.namePersian || item.fa || item.name;
    return item.name || item.en; // default English
  };

  useEffect(() => {
    if (query.length > 0) {
      let cityMatches = [];
      let categoryMatches = [];
      let subcategoryMatches = [];

      // 🔹 Cities (EN, DE, FA)
      if (searchType === "all" || searchType === "city") {
        cityMatches = cities
          .filter(
            (city) =>
              city.en.toLowerCase().includes(query.toLowerCase()) ||
              city.de.toLowerCase().includes(query.toLowerCase()) ||
              city.fa.includes(query) // ✅ Persian search
          )
          .map((city) => ({
            type: "city",
            name: city.en,
            nameGerman: city.de,
            namePersian: city.fa,
            displayName: getLocalizedName(city),
            action: () => navigate(`/city/${encodeURIComponent(city.en)}`),
          }))
          .slice(0, 5);
      }

      // 🔹 Categories (EN, DE, FA)
      if (searchType === "all" || searchType === "category") {
        categoryMatches = categories
          .filter(
            (c) =>
              c.name.toLowerCase().includes(query.toLowerCase()) ||
              c.nameGerman.toLowerCase().includes(query.toLowerCase()) ||
              c.namePersian.includes(query)
          )
          .map((c) => ({
            type: "category",
            name: c.name,
            nameGerman: c.nameGerman,
            namePersian: c.namePersian,
            displayName: getLocalizedName(c),
            id: c.id,
            subcategories: c.subcategories,
            action: () => navigate(`/category/${c.id}`),
          }))
          .slice(0, 3);

        // 🔹 Subcategories (EN, DE, FA)
        categories.forEach((c) => {
          const matchingSubcategories = c.subcategories.filter(
            (sub) =>
              sub.name.toLowerCase().includes(query.toLowerCase()) ||
              sub.nameGerman.toLowerCase().includes(query.toLowerCase()) ||
              sub.namePersian.includes(query)
          );

          matchingSubcategories.forEach((sub) => {
            subcategoryMatches.push({
              type: "subcategory",
              name: sub.name,
              nameGerman: sub.nameGerman,
              namePersian: sub.namePersian,
              displayName: getLocalizedName(sub),
              categoryName: getLocalizedName(c),
              categoryId: c.id,
              id: sub.id,
              action: () => navigate(`/category/${c.id}/subcategory/${sub.id}`),
            });
          });
        });

        subcategoryMatches = subcategoryMatches.slice(0, 5);
      }

      setSuggestions([
        ...cityMatches,
        ...categoryMatches,
        ...subcategoryMatches,
      ]);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, searchType, navigate, i18n.language]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

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
      } else {
        handleSearch();
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
        setSelectedIndex(-1);
        //  setShowAllResults(false)
      setQuery('')
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={
        isGlobal
          ? "relative w-full max-w-md"
          : "relative w-full max-w-2xl mx-auto"
      }
      ref={searchRef}
    >
      {!isGlobal && <SearchHeader />}

      <SearchBarInput
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        isGlobal={isGlobal}
        onSubmit={handleSearch}
      />

      {!isGlobal && (
        <SearchBarFilters
          searchType={searchType}
          setSearchType={setSearchType}
        />
      )}

      {isOpen && suggestions.length > 0 && (
        <SearchBarSuggestionsDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          handleSuggestionClick={handleSuggestionClick}
          isGlobal={isGlobal}
        />
      )}
    </div>
  );
};

export default SearchBar;
