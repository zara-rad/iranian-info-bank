import React, { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const BusinessHours = ({ workingHours }) => {
  const { t } = useTranslation();
  const [showHours, setShowHours] = useState(false);

  if (!workingHours || workingHours.length === 0) return null;

  return (
    <div className="mt-6 border rounded-lg overflow-hidden">
      <button
        onClick={() => setShowHours(!showHours)}
        className="flex justify-between items-center w-full p-4 text-left font-bold bg-gray-100 hover:bg-gray-200 transition"
      >
        <span className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          {t("Working Hours")}
        </span>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform ${showHours ? "rotate-180" : ""}`}
        />
      </button>

      {showHours && (
        <ul className="p-4 space-y-1 text-gray-700 bg-white">
          {workingHours.map((wh, idx) => (
            <li key={idx}>
              <strong className="capitalize">{wh.day}:</strong>{" "}
              {wh.isClosed ? t("Closed") : `${wh.open || "--"} - ${wh.close || "--"}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusinessHours;
