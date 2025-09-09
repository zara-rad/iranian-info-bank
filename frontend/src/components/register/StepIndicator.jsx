import React from "react"
import { Check } from "lucide-react"

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {[1, 2, 3, 4, 5].map((step) => (
      <div key={step} className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
            currentStep >= step
              ? "bg-persian-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep > step ? <Check size={20} /> : step}
        </div>
        {step < 5 && (
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

export default StepIndicator
