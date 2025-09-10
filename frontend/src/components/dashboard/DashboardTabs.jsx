import React from "react";
import { BarChart3, Building, Clock, TrendingUp } from "lucide-react";

const DashboardTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "overview"
              ? "border-persian-500 text-persian-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <BarChart3 size={18} />
            <span>Overview</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("business-info")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "business-info"
              ? "border-persian-500 text-persian-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Building size={18} />
            <span>Business Info</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("working-hours")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "working-hours"
              ? "border-persian-500 text-persian-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Clock size={18} />
            <span>Working Hours</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "analytics"
              ? "border-persian-500 text-persian-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            <TrendingUp size={18} />
            <span>Analytics</span>
          </div>
        </button>
      </nav>
    </div>
  );
};

export default DashboardTabs;
