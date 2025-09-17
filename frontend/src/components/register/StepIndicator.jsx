// src/components/register/StepIndicator.jsx
import React from "react"
import { Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { getLocalizedNumber } from "../../utils/numberUtils"

const StepIndicator = ({ currentStep }) => {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5,6].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
              currentStep >= step
                ? "bg-persian-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > step ? (
              <Check size={20} />
            ) : (
              getLocalizedNumber(step, i18n.language) // ✅ convert step number
            )}
          </div>
          {step < 6 && (
            <div
              className={`w-12 h-1 mx-2 ${
                currentStep > step ? "bg-persian-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
