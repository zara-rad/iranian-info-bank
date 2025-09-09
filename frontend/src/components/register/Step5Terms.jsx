import React from "react"

const Step5Terms = ({ acceptedTerms, setAcceptedTerms }) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">📋 Terms & Privacy</h3>
      <p className="text-gray-600">Please review and accept our terms</p>
    </div>

    <div className="border border-gray-300 rounded-lg p-6">
      <p className="text-sm text-gray-700">
        We collect and process your personal data in accordance with GDPR
        regulations. By registering, you agree to provide accurate information
        and keep it updated. The registration fee is non-refundable.
      </p>

      <div className="mt-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="w-4 h-4 text-persian-600 border-gray-300 mt-1"
          />
          <span className="ml-3 text-sm text-gray-700">
            I have read and accept the{" "}
            <span className="text-persian-600 underline">
              Privacy Policy and Terms of Service
            </span>{" "}
            *
          </span>
        </label>
      </div>
    </div>
  </div>
)

export default Step5Terms
