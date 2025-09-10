// src/components/register/Step3Branding.jsx
import React from "react"
import { useTranslation } from "react-i18next"

const Step3Branding = ({ formData, setFormData }) => {
  const { t } = useTranslation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🖼️ {t("register.branding.title")}
        </h3>
        <p className="text-gray-600">{t("register.branding.subtitle")}</p>
      </div>

      {/* English */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.english")}
        </label>
        <textarea
          name="descriptionEnglish"
          value={formData.descriptionEnglish}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
          placeholder={t("register.branding.englishPlaceholder")}
        />
      </div>

      {/* German */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.german")}
        </label>
        <textarea
          name="descriptionGerman"
          value={formData.descriptionGerman}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
          placeholder={t("register.branding.germanPlaceholder")}
        />
      </div>

      {/* Persian */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.persian")}
        </label>
        <textarea
          name="descriptionPersian"
          value={formData.descriptionPersian}
          onChange={handleChange}
          rows={4}
          dir="rtl"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 text-right"
          placeholder={t("register.branding.persianPlaceholder")}
        />
      </div>
    </div>
  )
}

export default Step3Branding
