import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Target } from "lucide-react";

const StorySection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Iranian couple in Germany"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 text-persian-600">
                  <MapPin size={20} />
                  <span className="font-medium">Germany 🇩🇪 • Iran 🇮🇷</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">IIB</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("about.story.title")}
              </h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {t("about.story.paragraph1")}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("about.story.paragraph2")}
            </p>

            <div className="bg-persian-50 border-l-4 border-persian-500 p-6 rounded-r-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="text-persian-600" size={24} />
                <h3 className="text-xl font-bold text-persian-800">
                  {t("about.story.missionTitle")}
                </h3>
              </div>
              <p className="text-persian-700 leading-relaxed">
                {t("about.story.missionText")}
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {t("about.story.paragraph3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
