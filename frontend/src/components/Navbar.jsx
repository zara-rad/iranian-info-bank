import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, User, LogOut, Phone, Mail } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { getLocalizedNumber } from "../utils/numberUtils"; // ✅ import helper

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "" },
    { code: "de", name: "Deutsch", flag: "" },
    { code: "fa", name: "فارسی", flag: "" },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
    if (lang === "fa") {
      document.body.setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
    } else {
      document.body.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
    }
  };

  const isActivePage = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side - Logo & Contact */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">IIB</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-800">
                  Iranian Info Bank
                </span>
                <p className="text-xs text-gray-500">Germany Directory</p>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-6 ml-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-persian-600" />
                <span>{getLocalizedNumber("+49 170 0000000", i18n.language)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-persian-600" />
                <span>you@example.com</span>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation */}
          <div
            className={`hidden md:flex items-center space-x-6 ${
              i18n.language === "fa" ? "space-x-reverse" : ""
            }`}
          >
            <Link
              to="/"
              className={`transition-colors ${
                isActivePage("/")
                  ? "text-persian-600 font-medium border-b-2 border-persian-600 pb-1"
                  : "text-gray-700 hover:text-persian-600"
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActivePage("/about")
                  ? "text-persian-600 font-medium border-b-2 border-persian-600 pb-1"
                  : "text-gray-700 hover:text-persian-600"
              }`}
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                isActivePage("/contact")
                  ? "text-persian-600 font-medium border-b-2 border-persian-600 pb-1"
                  : "text-gray-700 hover:text-persian-600"
              }`}
            >
              {t("nav.contact")}
            </Link>
            <Link
              to="/events"
              className={`transition-colors ${
                isActivePage("/events") || isActivePage("/event")
                  ? "text-persian-600 font-medium border-b-2 border-persian-600 pb-1"
                  : "text-gray-700 hover:text-persian-600"
              }`}
            >
              {t("nav.events")}
            </Link>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-persian-600 transition-colors"
              >
                <Globe size={18} />
                <span>
                  {languages.find((lang) => lang.code === i18n.language)?.flag ||
                    "Language"}
                </span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === "admin" || user.role === "super_admin" ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-1 text-gray-700 hover:text-persian-600 transition-colors"
                  >
                    <User size={18} />
                    <span>{t("nav.adminDashboard")}</span>
                  </Link>
                ) : (
                  <Link
                    to="/business-dashboard"
                    className="flex items-center space-x-1 text-gray-700 hover:text-persian-600 transition-colors"
                  >
                    <User size={18} />
                    <span>{t("nav.myBusiness")}</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-persian-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>{t("nav.logout")}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors ${
                  isActivePage("/")
                    ? "text-persian-600 font-medium"
                    : "text-gray-700 hover:text-persian-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${
                  isActivePage("/about")
                    ? "text-persian-600 font-medium"
                    : "text-gray-700 hover:text-persian-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${
                  isActivePage("/contact")
                    ? "text-persian-600 font-medium"
                    : "text-gray-700 hover:text-persian-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <Link
                to="/events"
                className={`transition-colors ${
                  isActivePage("/events") || isActivePage("/event")
                    ? "text-persian-600 font-medium"
                    : "text-gray-700 hover:text-persian-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.events")}
              </Link>
              {user ? (
                <>
                  {user.role === "admin" || user.role === "super_admin" ? (
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-persian-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.adminDashboard")}
                    </Link>
                  ) : (
                    <Link
                      to="/business-dashboard"
                      className="text-gray-700 hover:text-persian-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("nav.myBusiness")}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-persian-600"
                  >
                    {t("nav.logout")}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-persian-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
