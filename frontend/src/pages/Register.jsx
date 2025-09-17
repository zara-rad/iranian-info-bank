import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useAuth } from "../utils/AuthContext";

import RegisterHeader from "../components/register/RegisterHeader";
import StepIndicator from "../components/register/StepIndicator";
import Step1AccountInfo from "../components/register/Step1AccountInfo";
import Step2BusinessInfo from "../components/register/Step2BusinessInfo";
import Step3Branding from "../components/register/Step3Branding";
import Step4Payment from "../components/register/Step4Payment";
import Step5Terms from "../components/register/Step5Terms";
import RegisterNavigation from "../components/register/RegisterNavigation";

const Register = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  businessName: "",
  phone: "",
  category: "",
  subcategories: [],
  // 📝 توضیحات سه‌زبانه
  description: "",
  descriptionGerman: "",
  descriptionPersian: "",
  // 🌐 اطلاعات اضافی
  logo: null,
  website: "",   
  address: "",   
  city: "",      
  workingHours: [], 
  // 💳 پرداخت
  paymentMethod: "stripe",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

 const nextStep = () => {
  if (currentStep === 2) {
    // قبل از رفتن به Step3 مطمئن شو category انتخاب شده
    if (!selectedCategory) {
      toast.error(t("register.toasts.selectCategoryFirst"));
      return;
    }
  }
  setCurrentStep((s) => s + 1);
};

  const prevStep = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast.error(t("register.toasts.mustAccept"));
      return;
    }

    const finalData = {
      ...formData,
      category: selectedCategory?._id || "",
      subcategories: selectedSubcategories.map((s) => s._id),
    };

    console.log("🚀 Final register payload:", finalData);
      console.log("🚀 Sending register data:", finalData);


    setIsProcessingPayment(true);
    try {
      const success = await register(finalData);
      if (success) {
        toast.success(t("register.toasts.success"));
        navigate("/login");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      toast.error(t("register.toasts.error"));
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <RegisterHeader />
          <StepIndicator currentStep={currentStep} />

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <Step1AccountInfo formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 2 && (
              <Step2BusinessInfo
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategories={selectedSubcategories}
                setSelectedSubcategories={setSelectedSubcategories}
                showCategoryDropdown={showCategoryDropdown}
                setShowCategoryDropdown={setShowCategoryDropdown}
              />
            )}
            {currentStep === 3 && (
              <Step3Branding formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 4 && (
              <Step4Payment formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 5 && (
              <Step5Terms
                acceptedTerms={acceptedTerms}
                setAcceptedTerms={setAcceptedTerms}
              />
            )}

            <RegisterNavigation
              currentStep={currentStep}
              prevStep={prevStep}
              nextStep={nextStep}
              isProcessingPayment={isProcessingPayment}
              acceptedTerms={acceptedTerms}
            />
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {t("register.alreadyAccount")}{" "}
              <Link
                to="/login"
                className="text-persian-600 hover:text-persian-700 font-medium"
              >
                {t("auth.login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
