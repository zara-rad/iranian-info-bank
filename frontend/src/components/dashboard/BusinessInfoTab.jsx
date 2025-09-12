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
  handleLogoUpload,     // ✅ added
  handleImageUpload,    // ✅ added
}) => {
  const selectedCategory = categories.find(
    (cat) => cat.id === formData.category
  );

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
                <img
                  key={idx}
                  src={img}
                  alt={`Business Image ${idx + 1}`}
                  className="h-32 w-full object-cover rounded-lg border"
                />
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
        {editMode && selectedCategory && (
          <CategorySelector
            selectedCategory={selectedCategory}
            selectedSubcategories={selectedSubcategories}
            handleSubcategoryToggle={handleSubcategoryToggle}
          />
        )}

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



// import React from "react";
// import BusinessInfoHeader from "./BusinessInfoHeader";
// import BasicInfoForm from "./BasicInfoForm";
// import LocationForm from "./LocationForm";
// import CategorySelector from "./CategorySelector";
// import BusinessDescriptions from "./BusinessDescriptions";

// const BusinessInfoTab = ({
//   formData,
//   setFormData,
//   editMode,
//   setEditMode,
//   saving,
//   handleInputChange,
//   handleSave,
//   handleCancel,
//   categories,
//   selectedSubcategories,
//   handleSubcategoryToggle,
// }) => {
//   const selectedCategory = categories.find((cat) => cat.id === formData.category);

//   return (
//     <div className="space-y-6">
//       <BusinessInfoHeader
//         editMode={editMode}
//         setEditMode={setEditMode}
//         saving={saving}
//         handleSave={handleSave}
//         handleCancel={handleCancel}
//       />

//       <div className="bg-white rounded-xl shadow-md p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <BasicInfoForm
//             formData={formData}
//             handleInputChange={handleInputChange}
//             editMode={editMode}
//           />

//           <LocationForm
//             formData={formData}
//             handleInputChange={handleInputChange}
//             editMode={editMode}
//           />
//         </div>

//         {editMode && selectedCategory && (
//           <CategorySelector
//             selectedCategory={selectedCategory}
//             selectedSubcategories={selectedSubcategories}
//             handleSubcategoryToggle={handleSubcategoryToggle}
//           />
//         )}

//         <BusinessDescriptions
//           formData={formData}
//           handleInputChange={handleInputChange}
//           editMode={editMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default BusinessInfoTab;
