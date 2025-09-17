// src/components/register/RegisterNavigation.jsx
import React from "react"
import { Loader } from "lucide-react"
import { useTranslation } from "react-i18next"

const RegisterNavigation = ({
  currentStep,
  prevStep,
  nextStep,
  isLoading,
  isProcessingPayment,
  acceptedTerms,
  totalSteps = 6, // ✅ تعداد کل مراحل (الان ۶ تاست)
}) => {
  const { t } = useTranslation()
  const isLastStep = currentStep === totalSteps // ✅ چک آخرین مرحله

  return (
    <div className="flex justify-between mt-8">
      {/* Previous Button */}
      {currentStep > 1 && (
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t("register.previous")}
        </button>
      )}

      {/* Next or Submit */}
      <div className="ml-auto">
        {!isLastStep ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 bg-persian-600 hover:bg-persian-700 text-white rounded-lg transition-colors"
          >
            {t("register.next")}
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading || !acceptedTerms || isProcessingPayment}
            className="px-8 py-3 bg-persian-600 hover:bg-persian-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium flex items-center space-x-2"
          >
            {isProcessingPayment && <Loader className="animate-spin" size={18} />}
            <span>
              {isLoading || isProcessingPayment
                ? t("register.processingPayment")
                : t("register.payAndRegister")}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default RegisterNavigation
