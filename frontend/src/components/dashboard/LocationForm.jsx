import React from "react";

const LocationForm = ({ formData, handleInputChange, editMode }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 border-b pb-2">Location</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
          <input
            type="text"
                  name="postalCode"   // 🔥 اینجا عوض شد (قبلا zipCode بود)

             value={formData.postalCode || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
          />
        </div>
      </div>

    
    </div>
  );
};

export default LocationForm;
