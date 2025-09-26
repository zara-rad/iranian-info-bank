import React from "react";
import BusinessInfoHeader from "./BusinessInfoHeader";
import BasicInfoForm from "./BasicInfoForm";
import LocationForm from "./LocationForm";
import CategorySelector from "./CategorySelector";
import BusinessDescriptions from "./BusinessDescriptions";

const BusinessInfoTab = ({
  formData,
  setFormData,
  editMode,
  setEditMode,
  saving,
  handleInputChange,
  handleSave,
  handleCancel,
  categories,
  selectedSubcategories,
  handleSubcategoryToggle,
  handleLogoUpload,
  handleImageUpload,
  handleDeleteLogo,
  handleDeleteImage,
}) => {
  // دسته انتخاب‌شده رو پیدا کن
  const selectedCategory = categories.find(
    (c) => c._id?.toString() === formData.category?.toString()
  );

  return (
    <div className="space-y-6">
      {/* Header with Save/Cancel/Edit */}
      <BusinessInfoHeader
        editMode={editMode}
        setEditMode={setEditMode}
        saving={saving}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />

      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Basic Info + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfoForm
            formData={formData}
            handleInputChange={handleInputChange}
            editMode={editMode}
          />

          <LocationForm
            formData={formData}
            handleInputChange={handleInputChange}
            editMode={editMode}
          />
        </div>

        {/* ✅ Logo Upload */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium text-gray-900 mb-4">Business Logo</h4>
          {formData.logo ? (
            <div className="mb-3">
              <img
                src={formData.logo}
                alt="Business Logo"
                className="h-24 w-24 rounded-lg object-cover border"
              />
              {editMode && (
                <button
                  onClick={handleDeleteLogo}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3">No logo uploaded yet</p>
          )}

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e.target.files[0])}
              className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer"
            />
          )}
        </div>

        {/* ✅ Gallery Upload */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium text-gray-900 mb-4">Gallery Images</h4>
          {formData.images && formData.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`Business Image ${idx + 1}`}
                    className="h-32 w-full object-cover rounded-lg border"
                  />
                  {editMode && (
                    <button
                      onClick={() => handleDeleteImage(img)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3">
              No gallery images uploaded yet
            </p>
          )}

          {editMode && (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer"
            />
          )}
        </div>

        {/* ✅ Category & Services */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium text-gray-900 mb-4">Category & Services</h4>

          {editMode ? (
            <CategorySelector
              categories={categories}
              selectedCategoryId={formData.category}
              setSelectedCategoryId={(id) =>
                setFormData((prev) => ({ ...prev, category: id }))
              }
              selectedSubcategories={selectedSubcategories}
              handleSubcategoryToggle={handleSubcategoryToggle}
            />
          ) : (
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Category: </strong>
                {selectedCategory?.name || "Not selected"}
              </p>
              <p className="text-gray-700">
                <strong>Subcategories: </strong>
                {selectedCategory
                  ? selectedCategory.subcategories
                      .filter((sub) =>
                        selectedSubcategories
                          .map((s) => s.toString())
                          .includes(sub._id?.toString())
                      )
                      .map((sub) => sub.name)
                      .join(", ") || "Not selected"
                  : "Not selected"}
              </p>
            </div>
          )}
        </div>

        {/* ✅ Descriptions */}
        <BusinessDescriptions
          formData={formData}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
      </div>
    </div>
  );
};

export default BusinessInfoTab;
