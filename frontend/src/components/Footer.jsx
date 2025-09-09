import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left - Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">IIB</span>
              </div>
              <div>
                <span className="text-lg font-bold">Iranian Info Bank</span>
                <p className="text-xs text-gray-400">Germany Directory</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-xs">{t("footer.mission")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.contact")}
              </Link>
              <Link
                to="/events"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.events")}
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.popularCategories")}
            </h3>
            <div className="space-y-2">
              <Link
                to="/category/1"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.categories.medical")}
              </Link>
              <Link
                to="/category/2"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.categories.beauty")}
              </Link>
              <Link
                to="/category/3"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.categories.construction")}
              </Link>
              <Link
                to="/category/4"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.categories.restaurants")}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.getInTouch")}
            </h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+49 170 0000000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>you@example.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{t("common.germany")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                {t("footer.copyright").replace("2025", currentYear)}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/register"
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Register Business</span>
                <ExternalLink size={14} />
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>{t("footer.copyright").replace("2025", currentYear)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
