import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
import toast from "react-hot-toast";

// Components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import OverviewTab from "../components/dashboard/OverviewTab";
import BusinessInfoTab from "../components/dashboard/BusinessInfoTab";
import WorkingHoursTab from "../components/dashboard/WorkingHoursTab";
import AnalyticsTab from "../components/dashboard/AnalyticsTab";

const BusinessDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const defaultWorkingHours = [
  { day: "monday", open: "", close: "", isClosed: false },
  { day: "tuesday", open: "", close: "", isClosed: false },
  { day: "wednesday", open: "", close: "", isClosed: false },
  { day: "thursday", open: "", close: "", isClosed: false },
  { day: "friday", open: "", close: "", isClosed: false },
  { day: "saturday", open: "", close: "", isClosed: true },
  { day: "sunday", open: "", close: "", isClosed: true },
];
const [formData, setFormData] = useState({
  workingHours: defaultWorkingHours,
});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Business data
  const [businessData, setBusinessData] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [formData, setFormData] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Analytics data (later fetched from backend)
  const [analytics, setAnalytics] = useState({
    views: 0,
    clicksPhone: 0,
    clicksEmail: 0,
    clicksWebsite: 0,
    averageRating: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    if (!user || user.role !== "business_owner") {
      navigate("/login");
      return;
    }

    loadBusinessData();
    loadCategories();
  }, [user, navigate]);

  // ✅ Fetch business info from backend
  const loadBusinessData = async () => {
    try {
      const token = localStorage.getItem("token");
       if (!token) {
      navigate("/login");
      return;
    }
      const res = await fetch("/api/business-owner/business", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

      if (!res.ok) throw new Error("Failed to load business data");

      const data = await res.json();
      setBusinessData(data);
      setFormData(data);
      setSelectedSubcategories(data.subcategories || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading business data:", error);
      toast.error("Error loading business data");
      setLoading(false);
    }
  };

  // ✅ Fetch categories
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Error loading categories");
    }
  };

  // ✅ Input field handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Working hours handler
  const handleWorkingHoursChange = (dayIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: prev.workingHours.map((day, index) =>
        index === dayIndex ? { ...day, [field]: value } : day
      ),
    }));
  };

  // ✅ Toggle subcategories
  const handleSubcategoryToggle = (subcategoryId) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  // ✅ Save business data
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const updatedData = { ...formData, subcategories: selectedSubcategories };

      const res = await fetch("/api/business-owner/business", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update business");

      const data = await res.json();
      setBusinessData(data);
      setEditMode(false);
      toast.success("Business information updated successfully!");
    } catch (error) {
      console.error("Error saving business data:", error);
      toast.error("Error saving business data");
    }
    setSaving(false);
  };

  // ✅ Cancel editing
  const handleCancel = () => {
     if (!businessData) {
    toast.error("No business data to restore");
    return;
  }
    setFormData(businessData);
    setSelectedSubcategories(businessData.subcategories || []);
    setEditMode(false);
  };

  // ✅ Upload logo
  const handleLogoUpload = async (file) => {
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("logo", file);

      const res = await fetch("/api/business-owner/business/logo", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to upload logo");
      const data = await res.json();
      setBusinessData(data);
      setFormData(data);
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      console.error("Logo upload failed:", error);
      toast.error("Error uploading logo");
    }
  };

  // ✅ Upload gallery images
  const handleImageUpload = async (files) => {
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      for (const file of files) {
        fd.append("images", file);
      }

      const res = await fetch("/api/business-owner/business/images", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to upload images");
      const data = await res.json();
      setBusinessData(data);
      setFormData(data);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Error uploading images");
    }
  };

  const breadcrumbItems = [{ label: "Business Dashboard", link: null }];

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Global Search Section */}
      <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalSearch />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Dashboard Header */}
      <DashboardHeader user={user} />

      {/* Dashboard Content */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md mb-8">
            <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="min-h-96">
            {activeTab === "overview" && (
              <OverviewTab
                analytics={analytics}
                businessData={businessData}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "business-info" && (
              <BusinessInfoTab
                formData={formData}
                setFormData={setFormData}
                editMode={editMode}
                setEditMode={setEditMode}
                saving={saving}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                categories={categories}
                selectedSubcategories={selectedSubcategories}
                handleSubcategoryToggle={handleSubcategoryToggle}
                handleLogoUpload={handleLogoUpload}       // ✅ added
                handleImageUpload={handleImageUpload}     // ✅ added
              />
            )}
            {activeTab === "working-hours" && (
              <WorkingHoursTab
                formData={formData}
                handleWorkingHoursChange={handleWorkingHoursChange}
                editMode={editMode}
                setEditMode={setEditMode}
                saving={saving}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            )}
            {activeTab === "analytics" && <AnalyticsTab analytics={analytics} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDashboard;







// import React, { useState, useEffect } from "react";
// import { useAuth } from "../utils/AuthContext";
// import { useNavigate } from "react-router-dom";
// import Breadcrumb from "../components/Breadcrumb";
// import GlobalSearch from "../components/global-search/GlobalSearch.jsx";
// import toast from "react-hot-toast";

// // New imports
// import DashboardHeader from "../components/dashboard/DashboardHeader";
// import DashboardTabs from "../components/dashboard/DashboardTabs";
// import OverviewTab from "../components/dashboard/OverviewTab";
// import BusinessInfoTab from "../components/dashboard/BusinessInfoTab";
// import WorkingHoursTab from "../components/dashboard/WorkingHoursTab";
// import AnalyticsTab from "../components/dashboard/AnalyticsTab";

// const BusinessDashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   // Business data
//   const [businessData, setBusinessData] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);

//   // Analytics data
//   const [analytics, setAnalytics] = useState({
//     views: 0,
//     clicksPhone: 0,
//     clicksEmail: 0,
//     clicksWebsite: 0,
//     averageRating: 0,
//     totalReviews: 0,
//   });

//   useEffect(() => {
//     if (!user || user.role !== "business_owner") {
//       navigate("/login");
//       return;
//     }

//     loadBusinessData();
//     loadCategories();
//   }, [user, navigate]);

//   const loadBusinessData = async () => {
//     try {
//       const mockBusiness = {
//         id: 1,
//         businessName: user.businessName || "My Business",
//         ownerName: user.fullName,
//         email: user.email,
//         phone: "+49 170 1234567",
//         website: "www.mybusiness.de",
//         description:
//           "Professional services for the Iranian community in Germany.",
//         descriptionGerman:
//           "Professionelle Dienstleistungen für die iranische Gemeinde in Deutschland.",
//         descriptionPersian: "خدمات حرفه‌ای برای جامعه ایرانی در آلمان.",
//         address: "Hauptstraße 123",
//         city: "Berlin",
//         state: "Berlin",
//         zipCode: "10115",
//         category: 1,
//         subcategories: [11, 12],
//         logo: null,
//         images: [],
//         workingHours: [
//           { day: "monday", open: "09:00", close: "17:00", isClosed: false },
//           { day: "tuesday", open: "09:00", close: "17:00", isClosed: false },
//           { day: "wednesday", open: "09:00", close: "17:00", isClosed: false },
//           { day: "thursday", open: "09:00", close: "17:00", isClosed: false },
//           { day: "friday", open: "09:00", close: "17:00", isClosed: false },
//           { day: "saturday", open: "10:00", close: "14:00", isClosed: false },
//           { day: "sunday", open: "", close: "", isClosed: true },
//         ],
//         isVerified: true,
//         isActive: true,
//         createdAt: "2024-01-15",
//       };

//       const mockAnalytics = {
//         views: 1250,
//         clicksPhone: 89,
//         clicksEmail: 45,
//         clicksWebsite: 156,
//         averageRating: 4.8,
//         totalReviews: 127,
//       };

//       setBusinessData(mockBusiness);
//       setFormData(mockBusiness);
//       setAnalytics(mockAnalytics);
//       setSelectedSubcategories(mockBusiness.subcategories || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading business data:", error);
//       toast.error("Error loading business data");
//       setLoading(false);
//     }
//   };

//   const loadCategories = async () => {
//     try {
//       const { categories: allCategories } = await import("../data/categories");
//       setCategories(allCategories);
//     } catch (error) {
//       console.error("Error loading categories:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleWorkingHoursChange = (dayIndex, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       workingHours: prev.workingHours.map((day, index) =>
//         index === dayIndex ? { ...day, [field]: value } : day
//       ),
//     }));
//   };

//   const handleSubcategoryToggle = (subcategoryId) => {
//     setSelectedSubcategories((prev) =>
//       prev.includes(subcategoryId)
//         ? prev.filter((id) => id !== subcategoryId)
//         : [...prev, subcategoryId]
//     );
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const updatedData = {
//         ...formData,
//         subcategories: selectedSubcategories,
//       };

//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       setBusinessData(updatedData);
//       setEditMode(false);
//       toast.success("Business information updated successfully!");
//     } catch (error) {
//       console.error("Error saving business data:", error);
//       toast.error("Error saving business data");
//     }
//     setSaving(false);
//   };

//   const handleCancel = () => {
//     setFormData(businessData);
//     setSelectedSubcategories(businessData.subcategories || []);
//     setEditMode(false);
//   };

//   const breadcrumbItems = [{ label: "Business Dashboard", link: null }];

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20">
//         <div className="flex items-center justify-center py-20">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-persian-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20">
//       {/* Global Search Section */}
//       <section className="bg-gradient-to-br from-persian-600 via-persian-700 to-navy-800 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <GlobalSearch />
//         </div>
//       </section>

//       <Breadcrumb items={breadcrumbItems} />

//       {/* Dashboard Header */}
//       <DashboardHeader user={user} />

//       {/* Dashboard Content */}
//       <section className="py-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-xl shadow-md mb-8">
//             <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//           </div>

//           <div className="min-h-96">
//             {activeTab === "overview" && (
//               <OverviewTab
//                 analytics={analytics}
//                 businessData={businessData}
//                 setActiveTab={setActiveTab}
//               />
//             )}
//             {activeTab === "business-info" && (
//               <BusinessInfoTab
//                 formData={formData}
//                 setFormData={setFormData}
//                 editMode={editMode}
//                 setEditMode={setEditMode}
//                 saving={saving}
//                 handleInputChange={handleInputChange}
//                 handleSave={handleSave}
//                 handleCancel={handleCancel}
//                 categories={categories}
//                 selectedSubcategories={selectedSubcategories}
//                 handleSubcategoryToggle={handleSubcategoryToggle}
//               />
//             )}
//             {activeTab === "working-hours" && (
//               <WorkingHoursTab
//                 formData={formData}
//                 handleWorkingHoursChange={handleWorkingHoursChange}
//                 editMode={editMode}
//                 setEditMode={setEditMode}
//                 saving={saving}
//                 handleSave={handleSave}
//                 handleCancel={handleCancel}
//               />
//             )}
//             {activeTab === "analytics" && <AnalyticsTab analytics={analytics} />}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BusinessDashboard;





