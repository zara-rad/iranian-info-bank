import React from "react";
import { Edit, Save, X } from "lucide-react";

const BusinessInfoHeader = ({ editMode, setEditMode, saving, handleSave, handleCancel }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold text-gray-900">Business Information</h3>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Edit size={18} />
          <span>Edit Information</span>
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
  );
};

export default BusinessInfoHeader;
