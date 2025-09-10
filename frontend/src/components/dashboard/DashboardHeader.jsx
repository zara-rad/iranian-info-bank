import React from "react";
import { Building } from "lucide-react";

const DashboardHeader = ({ user }) => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.fullName}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="text-persian-600" size={24} />
            <span className="font-medium text-persian-600">Business Owner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;
