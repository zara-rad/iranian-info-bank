import CategorySelector from "./CategorySelector";
import LocationForm from "./LocationForm";
import BasicInfoForm from "./BasicInfoForm";

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
  businessData,
}) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Business Information</h2>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Edit Information
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Basic Info */}
      <BasicInfoForm
        formData={formData}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      {/* Location Info */}
      <LocationForm
        formData={formData}
        handleInputChange={handleInputChange}
        editMode={editMode}
      />

      {/* Logo */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Business Logo</h3>
        {formData.logo && (
          <div className="flex items-center gap-4 mb-3">
            <img src={formData.logo} alt="logo" className="h-16 rounded-lg shadow" />
            {editMode && (
              <button
                onClick={handleDeleteLogo}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        )}
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])}
          />
        )}
      </div>

      {/* Gallery Images */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Gallery Images</h3>
        <div className="flex gap-3 flex-wrap">
          {formData.images?.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt={`gallery-${idx}`}
                className="h-24 w-32 object-cover rounded-lg shadow"
              />
              {editMode && (
                <button
                  onClick={() => handleDeleteImage(img)}
                  className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            className="mt-2"
          />
        )}
      </div>

      {/* Category & Services */}
      {!editMode ? (
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Category & Services</h3>
          <p>
            <strong>Category:</strong>{" "}
            {businessData?.categoryObj?.name || "Not selected"}
          </p>
          <p>
            <strong>Subcategories:</strong>{" "}
            {businessData?.subcategoryObjs?.length > 0
              ? businessData.subcategoryObjs.map((s) => s.name).join(", ")
              : "Not selected"}
          </p>
        </div>
      ) : (
        <CategorySelector
          categories={categories}
          selectedCategoryId={formData.category}
          setSelectedCategoryId={(id) =>
            setFormData((prev) => ({ ...prev, category: id, subcategories: [] }))
          }
          selectedSubcategories={selectedSubcategories}
          handleSubcategoryToggle={handleSubcategoryToggle}
          editMode={editMode}
        />
      )}

      {/* Business Descriptions */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Description (English)
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="mt-1 block w-full border rounded-lg p-2 disabled:bg-gray-100"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Description (German)
        </label>
        <textarea
          name="descriptionGerman"
          value={formData.descriptionGerman || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="mt-1 block w-full border rounded-lg p-2 disabled:bg-gray-100"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Description (Persian)
        </label>
        <textarea
          name="descriptionPersian"
          value={formData.descriptionPersian || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="mt-1 block w-full border rounded-lg p-2 disabled:bg-gray-100 text-right"
        />
      </div>
    </div>
  );
};

export default BusinessInfoTab;
