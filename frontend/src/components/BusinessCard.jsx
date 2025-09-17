// src/components/business/BusinessCard.jsx
import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const normalizeWebsite = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return "http://" + url;
};

const BusinessCard = ({ biz }) => {
  const { i18n } = useTranslation();

  // انتخاب توضیح بر اساس زبان کاربر + سازگاری با شکل‌های مختلف داده
  const lang = i18n.language?.toLowerCase() || "en";
  const descByLang =
    biz?.description?.[lang.slice(0, 2)] ||
    (lang.startsWith("de") ? biz?.descriptionGerman : null) ||
    (lang.startsWith("fa") ? biz?.descriptionPersian : null) ||
    (lang.startsWith("en") ? biz?.descriptionEnglish : null) ||
    biz?.description ||
    "";

  const logo = biz.logo || biz.logoUrl || biz.image;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
      <div className="flex items-start gap-5">
        {/* لوگو */}
        {logo ? (
          <img
            src={logo}
            alt={biz.businessName}
            className="w-20 h-20 rounded-2xl object-cover ring-1 ring-gray-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
            {biz.businessName?.[0]?.toUpperCase() || "B"}
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">
            {biz.businessName}
          </h3>
          {descByLang && (
            <p className="text-gray-600 mt-1 leading-relaxed line-clamp-3">
              {descByLang}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-3 mt-4 text-gray-700">
            {biz.address && (
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-persian-600" />
                <span>{biz.address}</span>
              </div>
            )}
            {biz.phone && (
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-persian-600" />
                <a href={`tel:${biz.phone}`} className="hover:underline">
                  {biz.phone}
                </a>
              </div>
            )}
            {biz.logo && (
  <img src={biz.logo} alt={biz.businessName} className="w-24 h-24 rounded-full object-cover mb-4" />
)}

<p>{biz.description}</p>
<p>{biz.descriptionGerman}</p>
<p dir="rtl">{biz.descriptionPersian}</p>

{biz.website && (
  <p>
    <a href={biz.website} target="_blank" rel="noopener noreferrer" className="text-blue-600">
      {biz.website}
    </a>
  </p>
)}

<p>{biz.address}</p>

{/* working hours */}
{biz.workingHours?.length > 0 && (
  <ul>
    {biz.workingHours.map((day, idx) => (
      <li key={idx}>
        {day.day}: {day.isClosed ? "Closed" : `${day.open} - ${day.close}`}
      </li>
    ))}
  </ul>
)}

            {biz.email && (
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-persian-600" />
                <a href={`mailto:${biz.email}`} className="hover:underline">
                  {biz.email}
                </a>
              </div>
            )}
            {biz.website && (
              <div className="flex items-center">
                <Globe size={18} className="mr-2 text-persian-600" />
                <a
                  href={normalizeWebsite(biz.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  {biz.website}
                </a>
              </div>
            )}
            {biz.openingHours && (
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-persian-600" />
                <span>{biz.openingHours}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
