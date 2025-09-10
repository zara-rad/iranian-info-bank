import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Breadcrumb = ({ items }) => {
  const { t, i18n } = useTranslation()

  // Helper to get localized label
  const getLocalizedLabel = (item) => {
    if (!item) return ''
    if (typeof item === 'string') return item

    switch (i18n.language) {
      case 'de':
        return item.nameGerman || item.label
      case 'fa':
        return item.namePersian || item.label
      default:
        return item.name || item.label
    }
  }

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            to="/" 
            className="flex items-center space-x-1 text-gray-500 hover:text-persian-600 transition-colors"
          >
            <Home size={16} />
            <span>{t("breadcrumb.home")}</span>
          </Link>
          
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-gray-400">/</span>
              {item.link ? (
                <Link 
                  to={item.link} 
                  className="text-gray-500 hover:text-persian-600 transition-colors"
                >
                  {getLocalizedLabel(item)}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">
                  {getLocalizedLabel(item)}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Back Button */}
        {items.length > 0 && (
          <div className="mt-3">
            <Link
              to={items[items.length - 2]?.link || '/'}
              className="inline-flex items-center space-x-2 text-persian-600 hover:text-persian-700 transition-colors"
            >
              <ChevronLeft size={16} />
              <span>
                {items.length === 1
                  ? t("breadcrumb.backHome")
                  : t("breadcrumb.backTo", {
                      label: getLocalizedLabel(items[items.length - 2]) || t("breadcrumb.previous")
                    })}
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Breadcrumb
