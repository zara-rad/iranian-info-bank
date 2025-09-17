import React from "react";
import { useTranslation } from "react-i18next";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const StepWorkingHours = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const handleChange = (day, field, value) => {
    const updated = [...(formData.workingHours || [])];
    const index = updated.findIndex((d) => d.day === day);

    if (index === -1) {
      updated.push({ day, [field]: value });
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }

    setFormData((prev) => ({ ...prev, workingHours: updated }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        🕒 {t("register.workingHours.title")}
      </h3>

      <div className="space-y-4">
        {days.map((day) => {
          const data =
            formData.workingHours?.find((d) => d.day === day) || {};

          return (
            <div
              key={day}
              className="flex items-center gap-4 border p-4 rounded-lg"
            >
              <div className="w-32 font-medium capitalize">{day}</div>
              <input
                type="time"
                value={data.open || ""}
                disabled={data.isClosed}
                onChange={(e) =>
                  handleChange(day, "open", e.target.value)
                }
                className="border rounded-lg px-2 py-1"
              />
              <span>-</span>
              <input
                type="time"
                value={data.close || ""}
                disabled={data.isClosed}
                onChange={(e) =>
                  handleChange(day, "close", e.target.value)
                }
                className="border rounded-lg px-2 py-1"
              />
              <label className="flex items-center gap-2 ml-4">
                <input
                  type="checkbox"
                  checked={data.isClosed || false}
                  onChange={(e) =>
                    handleChange(day, "isClosed", e.target.checked)
                  }
                />
                {t("register.workingHours.closed")}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepWorkingHours;
