import React from "react";
import { Edit, Save, X } from "lucide-react";

const WorkingHoursTab = ({
  formData,
  editMode,
  saving,
  handleWorkingHoursChange,
  handleSave,
  handleCancel,
  setEditMode,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Working Hours</h3>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Edit size={18} />
            <span>Edit Hours</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save size={18} />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4">
          {formData.workingHours?.map((day, index) => (
            <div
              key={day.day}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="w-24">
                <p className="font-medium text-gray-900 capitalize">
                  {day.day}
                </p>
              </div>

              {editMode ? (
                <>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={day.isClosed}
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          index,
                          "isClosed",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500"
                    />
                    <span className="text-sm text-gray-600">Closed</span>
                  </label>

                  {!day.isClosed && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={day.open}
                        onChange={(e) =>
                          handleWorkingHoursChange(index, "open", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={day.close}
                        onChange={(e) =>
                          handleWorkingHoursChange(
                            index,
                            "close",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1">
                  {day.isClosed ? (
                    <span className="text-red-600 font-medium">Closed</span>
                  ) : (
                    <span className="text-gray-900">
                      {day.open} - {day.close}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursTab;
