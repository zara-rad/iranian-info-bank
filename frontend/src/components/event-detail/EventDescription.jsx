import React from "react";
import { getLocalizedField } from "../../utils/localization";
import { useTranslation } from "react-i18next";

const EventDescription = ({ event, i18n }) => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{t("events.about")}</h3>
      <p
        className={`text-gray-700 leading-relaxed mb-6 ${i18n.language === "fa" ? "text-right" : ""}`}
        dir={i18n.language === "fa" ? "rtl" : "ltr"}
      >
        {getLocalizedField(event, "description", i18n.language)}
      </p>
    </>
  );
};

export default EventDescription;
