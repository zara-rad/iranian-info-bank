import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchHeader from "./SearchHeader";
import SearchBarInput from "./SearchBarInput";
import SearchBarFilters from "./SearchBarFilters";
import SearchBarSuggestionsDropdown from "./SearchBarSuggestionsDropdown";

const SearchBar = ({ isGlobal = false }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchType, setSearchType] = useState("all");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // German cities
  const germanCities = [
    "Berlin",
    "Hamburg",
    "München",
    "Köln",
    "Frankfurt am Main",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hannover",
    "Nürnberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
    "Münster",
    "Karlsruhe",
    "Mannheim",
    "Augsburg",
    "Wiesbaden",
    "Gelsenkirchen",
    "Mönchengladbach",
    "Braunschweig",
    "Chemnitz",
    "Kiel",
    "Aachen",
    "Halle",
    "Magdeburg",
    "Freiburg",
    "Krefeld",
    "Lübeck",
    "Oberhausen",
    "Erfurt",
    "Mainz",
    "Rostock",
    "Kassel",
    "Hagen",
    "Potsdam",
    "Saarbrücken",
  ];

  // Categories with subcategories
  const categories = [
    {
      id: 1,
      name: "Medical & Healthcare",
      nameGerman: "Medizin & Gesundheit",
      namePersian: "پزشکی و مراقبت از سلامت",
      subcategories: [
        {
          id: 11,
          name: "General Practitioners",
          nameGerman: "Hausärzte",
          namePersian: "پزشک عمومی",
        },
        {
          id: 12,
          name: "Specialists",
          nameGerman: "Fachärzte",
          namePersian: "متخصصان",
        },
        {
          id: 13,
          name: "Dentists & Orthodontists",
          nameGerman: "Zahnärzte & Kieferorthopäden",
          namePersian: "دندانپزشک و ارتودنتیست",
        },
        {
          id: 14,
          name: "Pharmacies",
          nameGerman: "Apotheken",
          namePersian: "داروخانه",
        },
      ],
    },

    {
      id: 2,
      name: "Beauty & Wellness",
      nameGerman: "Schönheit & Wellness",
      namePersian: "زیبایی و سلامتی",
      subcategories: [
        {
          id: 21,
          name: "Hairdressers & Barber Shops",
          nameGerman: "Friseure & Barbershops",
          namePersian: "آرایشگاه مردانه و زنانه",
        },
        {
          id: 22,
          name: "Beauty Salons",
          nameGerman: "Kosmetikstudios",
          namePersian: "سالن زیبایی",
        },
        {
          id: 23,
          name: "Massage & Spa Centers",
          nameGerman: "Massage & Spa Zentren",
          namePersian: "مراکز ماساژ و اسپا",
        },
      ],
    },
    {
      id: 3,
      name: "Construction & Handwerk",
      nameGerman: "Bau & Handwerk",
      namePersian: "ساختمان و صنایع دستی",
      subcategories: [
        {
          id: 31,
          name: "Electricians",
          nameGerman: "Elektriker",
          namePersian: "برقکار",
        },
        {
          id: 32,
          name: "Plumbers",
          nameGerman: "Klempner",
          namePersian: "لوله‌کش",
        },
        {
          id: 33,
          name: "Painters & Decorators",
          nameGerman: "Maler & Dekorateure",
          namePersian: "نقاش و دکوراتور",
        },
      ],
    },

    {
      id: 4,
      name: "Gastronomy & Restaurants",
      nameGerman: "Gastronomie & Restaurants",
      namePersian: "رستوران‌ها و غذاخوری‌ها",
      subcategories: [
        {
          id: 41,
          name: "Persian Restaurants",
          nameGerman: "Persische Restaurants",
          namePersian: "رستوران‌های ایرانی",
        },
        {
          id: 42,
          name: "Cafés & Coffee Shops",
          nameGerman: "Cafés & Kaffeehäuser",
          namePersian: "کافه و قهوه‌خانه",
        },
        {
          id: 43,
          name: "Bakeries",
          nameGerman: "Bäckereien",
          namePersian: "نانوایی",
        },
      ],
    },
  ];

  useEffect(() => {
    if (query.length > 0) {
      let cityMatches = [];
      let categoryMatches = [];
      let subcategoryMatches = [];

      if (searchType === "all" || searchType === "city") {
        cityMatches = germanCities
          .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
          .map((city) => ({
            type: "city",
            name: city,
            displayName: city,
            action: () => navigate(`/city/${encodeURIComponent(city)}`),
          }))
          .slice(0, 5);
      }

      if (searchType === "all" || searchType === "category") {
        categoryMatches = categories
          .filter(
            (c) =>
              c.name.toLowerCase().includes(query.toLowerCase()) ||
              c.nameGerman.toLowerCase().includes(query.toLowerCase())
          )
          .map((c) => ({
            type: "category",
            name: c.name,
            nameGerman: c.nameGerman,
            displayName: c.name,
            id: c.id,
            subcategories: c.subcategories,
            action: () => navigate(`/category/${c.id}`),
          }))
          .slice(0, 3);

        categories.forEach((c) => {
          const matchingSubcategories = c.subcategories.filter(
            (sub) =>
              sub.name.toLowerCase().includes(query.toLowerCase()) ||
              sub.nameGerman.toLowerCase().includes(query.toLowerCase())
          );
          matchingSubcategories.forEach((sub) => {
            subcategoryMatches.push({
              type: "subcategory",
              name: sub.name,
              nameGerman: sub.nameGerman,
              displayName: sub.name,
              categoryName: c.name,
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
  }, [query, searchType, navigate]);

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
