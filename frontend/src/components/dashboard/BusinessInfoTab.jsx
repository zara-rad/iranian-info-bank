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
}) => {
  const selectedCategory = categories.find((cat) => cat.id === formData.category);

  return (
    <div className="space-y-6">
      <BusinessInfoHeader
        editMode={editMode}
        setEditMode={setEditMode}
        saving={saving}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />

      <div className="bg-white rounded-xl shadow-md p-6">
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

        {editMode && selectedCategory && (
          <CategorySelector
            selectedCategory={selectedCategory}
            selectedSubcategories={selectedSubcategories}
            handleSubcategoryToggle={handleSubcategoryToggle}
          />
        )}

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
