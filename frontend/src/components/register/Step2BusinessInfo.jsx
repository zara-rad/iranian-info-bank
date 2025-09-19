import React from "react";
import { Phone, Building, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLocalizedNumber } from "../../utils/numberUtils";

const Step2BusinessInfo = ({
  formData,
  setFormData,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategories,
  setSelectedSubcategories,
  showCategoryDropdown,
  setShowCategoryDropdown,
}) => {
  const { t, i18n } = useTranslation();

  const getLocalizedName = (item) => {
    if (!item) return "";
    switch (i18n.language) {
      case "de":
        return item.nameGerman;
      case "fa":
        return item.namePersian;
      default:
        return item.name;
    }
  };

  // ✅ انتخاب کتگوری
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategories([]);
    setShowCategoryDropdown(false);

    setFormData((prev) => ({
      ...prev,
      category: category._id,
      subcategories: [],
    }));
  };

  // ✅ انتخاب/برداشتن ساب‌کتگوری
  const handleSubcategoryToggle = (subcategory) => {
    const isSelected = selectedSubcategories.find((s) => s._id === subcategory._id);

    const newSubs = isSelected
      ? selectedSubcategories.filter((s) => s._id !== subcategory._id)
      : [...selectedSubcategories, subcategory];

    setSelectedSubcategories(newSubs);

    setFormData((prev) => ({
      ...prev,
      subcategories: newSubs.map((s) => s._id),
    }));
  };

  return (
    <div className="space-y-6">
      {/* 📌 نام کسب‌وکار */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.businessInfo.businessName")} *
        </label>
        <div className="relative">
          <input
            type="text"
            name="businessName"
            required
            value={formData.businessName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, businessName: e.target.value }))
            }
            className="w-full pl-12 pr-4 py-3 border rounded-lg"
          />
          <Building
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* 📌 شماره تماس */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.businessInfo.phone")} *
        </label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full pl-12 pr-4 py-3 border rounded-lg"
          />
          <Phone
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
     {/* 📌 آدرس خیابان */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t("register.businessInfo.address")} *
  </label>
  <input
    type="text"
    name="address"
    required
    value={formData.address}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, address: e.target.value }))
    }
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="Musterstraße 12"
  />
</div>

{/* 📌 کد پستی */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t("register.businessInfo.postalCode")} *
  </label>
  <input
    type="text"
    name="postalCode"
    required
    value={formData.postalCode}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
    }
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="12345"
  />
</div>

{/* 📌 شهر */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t("register.businessInfo.city")} *
  </label>
  <input
    type="text"
    name="city"
    required
    value={formData.city}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, city: e.target.value }))
    }
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="Berlin"
  />
</div>


{/* 📌 وبسایت */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t("register.businessInfo.website")}
  </label>
  <input
    type="url"
    name="website"
    value={formData.website}
    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="https://example.com"
  />
</div>


      {/* 📌 انتخاب کتگوری */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.businessInfo.selectCategory")} *
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full text-left p-4 border rounded-lg flex items-center justify-between"
          >
            {selectedCategory ? (
              <span>{getLocalizedName(selectedCategory)}</span>
            ) : (
              <span className="text-gray-500">
                {t("register.businessInfo.chooseCategory")}
              </span>
            )}
            <ChevronDown
              className={`transform transition-transform ${
                showCategoryDropdown ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className="w-full text-left p-4 hover:bg-gray-50 border-b last:border-0"
                >
                  {getLocalizedName(cat)}
                  <p className="text-xs text-gray-400">
                    {getLocalizedNumber(cat.businessCount, i18n.language)}{" "}
                    {t("register.businessInfo.businesses")}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 📌 انتخاب ساب‌کتگوری‌ها */}
      {selectedCategory && selectedCategory.subcategories?.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("register.businessInfo.selectSubcategories")}
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedCategory.subcategories.map((sub) => (
              <label
                key={sub._id}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!selectedSubcategories.find((s) => s._id === sub._id)}
                  onChange={() => handleSubcategoryToggle(sub)}
                  className="w-4 h-4 text-persian-600 border-gray-300 rounded"
                />
                <span className="ml-3">{getLocalizedName(sub)}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2BusinessInfo;





