import React from "react";
import { useTranslation } from "react-i18next";

const EventTags = ({ tags }) => {
  const { t } = useTranslation();
  if (!tags?.length) return null;

  return (
    <div className="mt-6">
      <h4 className="font-medium text-gray-900 mb-3">{t("events.tags")}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-persian-100 text-persian-800 px-3 py-1 rounded-full text-sm">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EventTags;
