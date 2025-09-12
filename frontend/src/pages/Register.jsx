import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import { useAuth } from "../utils/AuthContext";

// Components
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

  // Steps
  const [currentStep, setCurrentStep] = useState(1);

  // States
  const [isLoading, setIsLoading] = useState(false);
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
    descriptionEnglish: "",
    descriptionGerman: "",
    descriptionPersian: "",
    logo: null,
    paymentMethod: "stripe",
  });

  // Load categories
  useEffect(() => {
    import("../data/categories").then((module) => {
      setCategories(module.categories);
    });
  }, []);

  // Navigation
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.error(t("register.toasts.mustAccept"));
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Dummy example – replace with your API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(t("register.toasts.success"));
      navigate("/login");
    } catch (err) {
      toast.error(t("register.toasts.error"));
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <RegisterHeader />

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Form */}
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

            {/* Navigation */}
            <RegisterNavigation
              currentStep={currentStep}
              prevStep={prevStep}
              nextStep={nextStep}
              isLoading={isLoading}
              isProcessingPayment={isProcessingPayment}
              acceptedTerms={acceptedTerms}
            />
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {t("register.alreadyAccount")}{" "}
              <Link
                to="/login"
                className="text-persian-600 hover:text-persian-700 font-medium transition-colors"
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



