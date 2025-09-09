import React from "react"
import { Loader } from "lucide-react"

const RegisterNavigation = ({
  currentStep,
  prevStep,
  nextStep,
  isLoading,
  isProcessingPayment,
  acceptedTerms,
}) => (
  <div className="flex justify-between mt-8">
    {currentStep > 1 && (
      <button
        type="button"
        onClick={prevStep}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Previous
      </button>
    )}

    <div className="ml-auto">
      {currentStep < 5 ? (
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-persian-600 hover:bg-persian-700 text-white rounded-lg transition-colors"
        >
          Next
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
              ? "Processing Payment..."
              : "Pay & Register"}
          </span>
        </button>
      )}
    </div>
  </div>
)

export default RegisterNavigation
