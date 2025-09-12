import React from "react";
import { Eye, Phone, Mail, Star, Calendar } from "lucide-react";

const OverviewTab = ({ analytics, businessData }) => {
  if (!businessData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-600">
        Loading business data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-blue-600">
                {analytics.views.toLocaleString()}
              </p>
            </div>
            <Eye className="h-12 w-12 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Phone Clicks</p>
              <p className="text-3xl font-bold text-green-600">
                {analytics.clicksPhone}
              </p>
            </div>
            <Phone className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Email Clicks</p>
              <p className="text-3xl font-bold text-purple-600">
                {analytics.clicksEmail}
              </p>
            </div>
            <Mail className="h-12 w-12 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-3xl font-bold text-yellow-600">
                {analytics.averageRating}
              </p>
            </div>
            <Star className="h-12 w-12 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {analytics.totalReviews} reviews
          </p>
        </div>
      </div>

      {/* Business Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Business Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${
                businessData?.isVerified ? "bg-green-500" : "bg-orange-500"
              }`}
            ></div>
            <div>
              <p className="font-medium text-gray-900">Verification Status</p>
              <p
                className={`text-sm ${
                  businessData?.isVerified ? "text-green-600" : "text-orange-600"
                }`}
              >
                {businessData?.isVerified
                  ? "Verified"
                  : "Pending Verification"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${
                businessData?.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div>
              <p className="font-medium text-gray-900">Listing Status</p>
              <p
                className={`text-sm ${
                  businessData?.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {businessData?.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Member Since</p>
              <p className="text-sm text-gray-600">
                {businessData?.createdAt
                  ? new Date(businessData.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;



// import React from "react";
// import { Eye, Phone, Mail, Star, Calendar } from "lucide-react";

// const OverviewTab = ({ analytics, businessData }) => {
//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Views</p>
//               <p className="text-3xl font-bold text-blue-600">
//                 {analytics.views.toLocaleString()}
//               </p>
//             </div>
//             <Eye className="h-12 w-12 text-blue-600" />
//           </div>
//           <p className="text-sm text-gray-500 mt-2">This month</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Phone Clicks</p>
//               <p className="text-3xl font-bold text-green-600">
//                 {analytics.clicksPhone}
//               </p>
//             </div>
//             <Phone className="h-12 w-12 text-green-600" />
//           </div>
//           <p className="text-sm text-gray-500 mt-2">This month</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Email Clicks</p>
//               <p className="text-3xl font-bold text-purple-600">
//                 {analytics.clicksEmail}
//               </p>
//             </div>
//             <Mail className="h-12 w-12 text-purple-600" />
//           </div>
//           <p className="text-sm text-gray-500 mt-2">This month</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Rating</p>
//               <p className="text-3xl font-bold text-yellow-600">
//                 {analytics.averageRating}
//               </p>
//             </div>
//             <Star className="h-12 w-12 text-yellow-600" />
//           </div>
//           <p className="text-sm text-gray-500 mt-2">
//             {analytics.totalReviews} reviews
//           </p>
//         </div>
//       </div>

//       {/* Business Status */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4">Business Status</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="flex items-center space-x-3">
//             <div
//               className={`w-4 h-4 rounded-full ${
//                 businessData.isVerified ? "bg-green-500" : "bg-orange-500"
//               }`}
//             ></div>
//             <div>
//               <p className="font-medium text-gray-900">Verification Status</p>
//               <p
//                 className={`text-sm ${
//                   businessData.isVerified
//                     ? "text-green-600"
//                     : "text-orange-600"
//                 }`}
//               >
//                 {businessData.isVerified ? "Verified" : "Pending Verification"}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div
//               className={`w-4 h-4 rounded-full ${
//                 businessData.isActive ? "bg-green-500" : "bg-red-500"
//               }`}
//             ></div>
//             <div>
//               <p className="font-medium text-gray-900">Listing Status</p>
//               <p
//                 className={`text-sm ${
//                   businessData.isActive ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {businessData.isActive ? "Active" : "Inactive"}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <Calendar className="w-4 h-4 text-blue-500" />
//             <div>
//               <p className="font-medium text-gray-900">Member Since</p>
//               <p className="text-sm text-gray-600">
//                 {new Date(businessData.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewTab;
