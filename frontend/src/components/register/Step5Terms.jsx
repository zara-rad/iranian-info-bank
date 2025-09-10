import React from "react"
import { useTranslation } from "react-i18next"

const Step5Terms = ({ acceptedTerms, setAcceptedTerms }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          📋 {t("register.terms.title")}
        </h3>
        <p className="text-gray-600">{t("register.terms.subtitle")}</p>
      </div>

      <div className="border border-gray-300 rounded-lg p-6">
        <p className="text-sm text-gray-700">{t("register.terms.text")}</p>

        <div className="mt-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 text-persian-600 border-gray-300 mt-1"
            />
            <span className="ml-3 text-sm text-gray-700">
              {t("register.terms.accept")}{" "}
              <span className="text-persian-600 underline">
                {t("register.terms.policy")}
              </span>{" "}
              *
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Step5Terms
