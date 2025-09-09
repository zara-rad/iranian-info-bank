import React from "react"
import { Upload, X } from "lucide-react"

const Step3Branding = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">🖼️ Branding & Description</h3>
        <p className="text-gray-600">Add your business description and logo</p>
      </div>

      {/* TODO: Logo Upload (use your existing JSX here) */}

      {/* English */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description in English
        </label>
        <textarea
          name="descriptionEnglish"
          value={formData.descriptionEnglish}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
          placeholder="Describe your business in English..."
        />
      </div>

      {/* German */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description in German
        </label>
        <textarea
          name="descriptionGerman"
          value={formData.descriptionGerman}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
          placeholder="Beschreiben Sie Ihr Unternehmen auf Deutsch..."
        />
      </div>

      {/* Persian */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description in Persian (فارسی)
        </label>
        <textarea
          name="descriptionPersian"
          value={formData.descriptionPersian}
          onChange={handleChange}
          rows={4}
          dir="rtl"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 text-right"
          placeholder="کسب و کار خود را به فارسی توضیح دهید..."
        />
      </div>
    </div>
  )
}

export default Step3Branding
