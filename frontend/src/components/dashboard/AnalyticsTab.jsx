import React from "react";
import { TrendingUp, Phone, Mail, Globe, Star } from "lucide-react";

const AnalyticsTab = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Analytics & Performance</h3>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">
                {analytics.views.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Phone Calls</p>
              <p className="text-2xl font-bold text-green-600">
                {analytics.clicksPhone}
              </p>
            </div>
            <Phone className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +8% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Email Contacts</p>
              <p className="text-2xl font-bold text-purple-600">
                {analytics.clicksEmail}
              </p>
            </div>
            <Mail className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +15% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Website Visits</p>
              <p className="text-2xl font-bold text-orange-600">
                {analytics.clicksWebsite}
              </p>
            </div>
            <Globe className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +22% from last month</p>
        </div>
      </div>

      {/* Rating & Reviews */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Customer Feedback</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {analytics.averageRating}
            </div>
            <div className="flex justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={
                    star <= Math.floor(analytics.averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-600">Average Rating</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {analytics.totalReviews}
            </div>
            <p className="text-gray-600">Total Reviews</p>
            <p className="text-sm text-green-600 mt-1">↗ +5 new this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
