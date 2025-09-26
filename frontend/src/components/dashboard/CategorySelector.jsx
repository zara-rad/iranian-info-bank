import React from "react";

const CategorySelector = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubcategories,
  handleSubcategoryToggle,
  editMode,
}) => {
  const selectedCategory = categories.find(
    (cat) => cat._id?.toString() === selectedCategoryId?.toString()
  );

  return (
    <div className="mt-6 pt-6 border-t">
      <h4 className="font-medium text-gray-900 mb-4">Category & Services</h4>

      {/* Category Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category:
        </label>
        <select
          value={selectedCategoryId || ""}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          disabled={!editMode}
          className="w-full border rounded-lg p-2 focus:ring-persian-500 focus:border-persian-500 disabled:bg-gray-100"
        >
          <option value="">-- Choose a Category --</option>
          {categories.map((cat) => (
            <option key={cat._id || cat.id} value={cat._id || cat.id}>
              {cat.name} ({cat.nameGerman})
            </option>
          ))}
        </select>
      </div>

      {/* Subcategories */}
      {selectedCategory && selectedCategory.subcategories?.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Select Your Services:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedCategory.subcategories.map((subcategory) => {
              const id = subcategory._id || subcategory.id;
              return (
                <label
                  key={id}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    disabled={!editMode}
                    checked={selectedSubcategories.includes(id)}
                    onChange={() => handleSubcategoryToggle(id)}
                    className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {subcategory.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {subcategory.nameGerman}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
