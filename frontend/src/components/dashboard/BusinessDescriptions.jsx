import React from "react";

const BusinessDescriptions = ({ formData, handleInputChange, editMode }) => {
  return (
    <div className="mt-6 pt-6 border-t space-y-4">
      <h4 className="font-medium text-gray-900">Business Descriptions</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (English)
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (German)
        </label>
        <textarea
          name="descriptionGerman"
          value={formData.descriptionGerman || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Persian)
        </label>
        <textarea
          name="descriptionPersian"
          value={formData.descriptionPersian || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100 text-right"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default BusinessDescriptions;
