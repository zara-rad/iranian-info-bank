import React from "react"
import { Phone, Building } from "lucide-react"

const Step2BusinessInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">🏢 Business Information</h3>
        <p className="text-gray-600">Tell us about your business</p>
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Name *
        </label>
        <div className="relative">
          <input
            type="text"
            name="businessName"
            required
            value={formData.businessName}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
            placeholder="Your business name"
          />
          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
            placeholder="+49 123 456 789"
          />
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* TODO: Category + Subcategories (same JSX you already had) */}
    </div>
  )
}

export default Step2BusinessInfo
