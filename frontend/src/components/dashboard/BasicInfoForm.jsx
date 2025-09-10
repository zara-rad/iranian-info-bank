import React from "react";

const BasicInfoForm = ({ formData, handleInputChange, editMode }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 border-b pb-2">Basic Information</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="url"
          name="website"
          value={formData.website || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        />
      </div>
    </div>
  );
};

export default BasicInfoForm;
