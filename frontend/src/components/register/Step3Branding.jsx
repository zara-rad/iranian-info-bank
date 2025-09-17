import React from "react"
import { useTranslation } from "react-i18next"

const Step3Branding = ({ formData, setFormData }) => {
  const { t } = useTranslation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formDataUpload = new FormData()
    formDataUpload.append("logo", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      })
      const data = await res.json()
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, logo: data.imageUrl }))
      } else {
        console.error("Upload failed:", data)
      }
    } catch (err) {
      console.error("❌ Upload error:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🖼️ {t("register.branding.title")}
        </h3>
        <p className="text-gray-600">{t("register.branding.subtitle")}</p>
      </div>

      {/* 📌 آپلود لوگو */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.logo")}
        </label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {formData.logo && (
          <img
            src={formData.logo}
            alt="Logo preview"
            className="mt-4 h-20 rounded border"
          />
        )}
      </div>

      {/* 📌 توضیحات انگلیسی */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.english")}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* 📌 توضیحات آلمانی */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.german")}
        </label>
        <textarea
          name="descriptionGerman"
          value={formData.descriptionGerman}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* 📌 توضیحات فارسی */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("register.branding.persian")}
        </label>
        <textarea
          name="descriptionPersian"
          value={formData.descriptionPersian}
          onChange={handleChange}
          rows={4}
          dir="rtl"
          className="w-full border rounded-lg px-4 py-2 text-right"
        />
      </div>
    </div>
  )
}

export default Step3Branding
