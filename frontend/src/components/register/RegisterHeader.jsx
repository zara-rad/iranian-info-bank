import React from "react"
import { useTranslation } from "react-i18next"

const RegisterHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center mb-4">
        <span className="text-white font-bold text-2xl">IIB</span>
      </div>

      {/* Title + Subtitle */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("register.title")}
      </h2>
      <p className="text-gray-600">{t("register.subtitle")}</p>
    </div>
  )
}

export default RegisterHeader
