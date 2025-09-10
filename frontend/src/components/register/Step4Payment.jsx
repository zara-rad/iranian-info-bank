import React from "react"
import { Euro, CreditCard } from "lucide-react"
import { useTranslation } from "react-i18next"
import { getLocalizedNumber } from "../../utils/numberUtils" // adjust path

const Step4Payment = ({ formData, setFormData }) => {
  const { t, i18n } = useTranslation()

  const handleChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          💳 {t("register.payment.title")}
        </h3>
        <p className="text-gray-600">{t("register.payment.subtitle")}</p>
      </div>

      {/* Fee Box */}
      <div className="bg-persian-50 border border-persian-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Euro className="text-persian-600 mr-2" size={24} />
          <span className="text-3xl font-bold text-persian-600">
            {getLocalizedNumber(12, i18n.language)}
          </span>
        </div>
        <p className="text-gray-700 font-medium">{t("register.payment.fee")}</p>
        <p className="text-sm text-gray-600 mt-2">
          {t("register.payment.includes")}
        </p>
      </div>

      {/* Payment Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {t("register.payment.selectMethod")}
        </label>
        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={formData.paymentMethod === "stripe"}
              onChange={handleChange}
              className="w-4 h-4 text-persian-600 border-gray-300"
            />
            <CreditCard className="ml-3 mr-2 text-gray-400" size={20} />
            <span>{t("register.payment.stripe")}</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleChange}
              className="w-4 h-4 text-persian-600 border-gray-300"
            />
            <span className="ml-3 mr-2">{t("register.payment.paypal")}</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={formData.paymentMethod === "bank"}
              onChange={handleChange}
              className="w-4 h-4 text-persian-600 border-gray-300"
            />
            <span className="ml-3 mr-2">{t("register.payment.bank")}</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Step4Payment
