import React from "react";

const CategorySelector = ({ selectedCategory, selectedSubcategories, handleSubcategoryToggle }) => {
  if (!selectedCategory) return null;

  return (
    <div className="mt-6 pt-6 border-t">
      <h4 className="font-medium text-gray-900 mb-4">Category & Services</h4>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Current Category:</p>
        <div className="flex items-center space-x-2 p-3 bg-persian-50 rounded-lg">
          <span className="text-2xl">{selectedCategory.icon}</span>
          <div>
            <p className="font-medium text-persian-800">{selectedCategory.name}</p>
            <p className="text-sm text-persian-600">{selectedCategory.nameGerman}</p>
          </div>
        </div>
      </div>

      {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Select Your Services:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedCategory.subcategories.map((subcategory) => (
              <label
                key={subcategory.id}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory.id)}
                  onChange={() => handleSubcategoryToggle(subcategory.id)}
                  className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{subcategory.name}</p>
                  <p className="text-sm text-gray-600">{subcategory.nameGerman}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
