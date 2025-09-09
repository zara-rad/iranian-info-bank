import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"

import { useAuth } from "../utils/AuthContext"

// Components
import RegisterHeader from "../components/register/RegisterHeader"
import StepIndicator from "../components/register/StepIndicator"
import Step1AccountInfo from "../components/register/Step1AccountInfo"
import Step2BusinessInfo from "../components/register/Step2BusinessInfo"
import Step3Branding from "../components/register/Step3Branding"
import Step4Payment from "../components/register/Step4Payment"
import Step5Terms from "../components/register/Step5Terms"
import RegisterNavigation from "../components/register/RegisterNavigation"

const Register = () => {
  const { t } = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()

  // Steps
  const [currentStep, setCurrentStep] = useState(1)

  // States
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

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
  })

  // Load categories
  useEffect(() => {
    import("../data/categories").then((module) => {
      setCategories(module.categories)
    })
  }, [])

  // Navigation
  const nextStep = () => setCurrentStep(currentStep + 1)
  const prevStep = () => setCurrentStep(currentStep - 1)

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!acceptedTerms) {
      toast.error("You must accept the Terms & Privacy Policy")
      return
    }

    setIsProcessingPayment(true)

    try {
      // Dummy example – replace with your API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Registration completed successfully!")
      navigate("/login")
    } catch (err) {
      toast.error("Registration failed, please try again.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-persian-600 hover:text-persian-700 font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register





// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { 
//   Eye, EyeOff, Mail, Lock, User, Phone, Building, 
//   Upload, X, Check, CreditCard, Euro, FileText,
//   ChevronDown, ChevronUp, Loader
// } from 'lucide-react'
// import { useAuth } from '../utils/AuthContext'
// import toast from 'react-hot-toast'

// const Register = () => {
//   const { t } = useTranslation()
//   const { register } = useAuth()
//   const navigate = useNavigate()
  
//   const [currentStep, setCurrentStep] = useState(1)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [categories, setCategories] = useState([])
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [selectedSubcategories, setSelectedSubcategories] = useState([])
//   const [showSubcategories, setShowSubcategories] = useState(false)
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
//   const [logoFile, setLogoFile] = useState(null)
//   const [logoPreview, setLogoPreview] = useState(null)
//   const [acceptedTerms, setAcceptedTerms] = useState(false)
//   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

//   // Payment states
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false)
//   const [paymentCompleted, setPaymentCompleted] = useState(false)
//   const [paymentDetails, setPaymentDetails] = useState(null)

//   const [formData, setFormData] = useState({
//     // Account Information
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
    
//     // Business Information
//     businessName: '',
//     phone: '',
//     category: '',
//     subcategories: [],
    
//     // Branding & Description
//     descriptionEnglish: '',
//     descriptionGerman: '',
//     descriptionPersian: '',
//     logo: null,
    
//     // Payment
//     paymentMethod: 'stripe'
//   })

//   // Sample categories data

//   useEffect(() => {
//     // Import categories from data file
//     import('../data/categories').then(module => {
//       setCategories(module.categories)
//     })
//   }, [])

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category)
//     setSelectedSubcategories([])
//     setShowCategoryDropdown(false)
//     setFormData({
//       ...formData,
//       category: category.id,
//       subcategories: []
//     })
//     setShowSubcategories(category.subcategories && category.subcategories.length > 0)
//   }

//   const handleSubcategoryToggle = (subcategory) => {
//     const isSelected = selectedSubcategories.find(sub => sub.id === subcategory.id)
//     let newSubcategories
    
//     if (isSelected) {
//       newSubcategories = selectedSubcategories.filter(sub => sub.id !== subcategory.id)
//     } else {
//       newSubcategories = [...selectedSubcategories, subcategory]
//     }
    
//     setSelectedSubcategories(newSubcategories)
//     setFormData({
//       ...formData,
//       subcategories: newSubcategories.map(sub => sub.id)
//     })
//   }

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       // Check file size (3MB limit)
//       if (file.size > 3 * 1024 * 1024) {
//         toast.error('File size must be less than 3MB')
//         return
//       }
      
//       // Check file type
//       if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
//         toast.error('Only JPG and PNG files are allowed')
//         return
//       }
      
//       setLogoFile(file)
//       setFormData({ ...formData, logo: file })
      
//       // Create preview
//       const reader = new FileReader()
//       reader.onload = (e) => setLogoPreview(e.target.result)
//       reader.readAsDataURL(file)
//     }
//   }

//   const removeLogo = () => {
//     setLogoFile(null)
//     setLogoPreview(null)
//     setFormData({ ...formData, logo: null })
//   }

//   const validateStep = (step) => {
//     switch (step) {
//       case 1:
//         if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
//           toast.error('Please fill in all required fields')
//           return false
//         }
//         if (formData.password !== formData.confirmPassword) {
//           toast.error('Passwords do not match')
//           return false
//         }
//         if (formData.password.length < 6) {
//           toast.error('Password must be at least 6 characters')
//           return false
//         }
//         return true
      
//       case 2:
//         if (!formData.businessName || !formData.phone || !formData.category) {
//           toast.error('Please fill in all required business information')
//           return false
//         }
//         return true
      
//       case 3:
//         if (!formData.descriptionEnglish && !formData.descriptionGerman && !formData.descriptionPersian) {
//           toast.error('Please provide at least one description')
//           return false
//         }
//         return true
      
//       case 4:
//         return true // Payment step validation handled separately
      
//       case 5:
//         if (!acceptedTerms) {
//           toast.error('You must accept the Terms & Privacy Policy')
//           return false
//         }
//         return true
      
//       default:
//         return true
//     }
//   }

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1)
//   }

//   const handlePayment = async () => {
//     setIsProcessingPayment(true)
    
//     try {
//       const response = await fetch('/api/payment/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           paymentMethod: formData.paymentMethod,
//           userData: {
//             fullName: formData.fullName,
//             email: formData.email,
//             password: formData.password,
//             phone: formData.phone,
//             businessName: formData.businessName,
//             businessCategory: formData.category,
//             businessSubcategories: formData.subcategories,
//             descriptionEnglish: formData.descriptionEnglish,
//             descriptionGerman: formData.descriptionGerman,
//             descriptionPersian: formData.descriptionPersian
//           }
//         })
//       })

//       const data = await response.json()
      
//       if (response.ok) {
//         setPaymentDetails(data)
        
//         if (formData.paymentMethod === 'stripe') {
//           // For Stripe, you would integrate Stripe Elements here
//           toast.success('Payment initiated! Complete payment to finish registration.')
//           // Simulate payment completion for demo
//           setTimeout(() => {
//             completeRegistration(data.paymentIntentId)
//           }, 2000)
//         } else if (formData.paymentMethod === 'paypal') {
//           toast.success('Redirecting to PayPal...')
//           // Simulate PayPal completion for demo
//           setTimeout(() => {
//             completeRegistration('PAYPAL_' + Date.now())
//           }, 3000)
//         } else if (formData.paymentMethod === 'bank') {
//           setPaymentCompleted(true)
//           toast.success('Bank transfer details provided. Complete transfer to activate account.')
//         }
//       } else {
//         toast.error(data.message || 'Payment initiation failed')
//       }
//     } catch (error) {
//       toast.error('Payment error. Please try again.')
//     }
    
//     setIsProcessingPayment(false)
//   }

//   const completeRegistration = async (transactionId) => {
//     try {
//       const response = await fetch('/api/payment/confirm-payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           paymentIntentId: formData.paymentMethod === 'stripe' ? transactionId : undefined,
//           paypalTransactionId: formData.paymentMethod === 'paypal' ? transactionId : undefined,
//           bankTransferReference: formData.paymentMethod === 'bank' ? transactionId : undefined,
//           paymentMethod: formData.paymentMethod,
//           userData: {
//             fullName: formData.fullName,
//             email: formData.email,
//             password: formData.password,
//             phone: formData.phone,
//             businessName: formData.businessName,
//             businessCategory: formData.category,
//             businessSubcategories: formData.subcategories,
//             descriptionEnglish: formData.descriptionEnglish,
//             descriptionGerman: formData.descriptionGerman,
//             descriptionPersian: formData.descriptionPersian
//           }
//         })
//       })

//       const data = await response.json()
      
//       if (response.ok) {
//         setPaymentCompleted(true)
//         toast.success('Registration completed successfully!')
//         setTimeout(() => {
//           navigate('/login')
//         }, 2000)
//       } else {
//         toast.error(data.message || 'Registration failed')
//       }
//     } catch (error) {
//       toast.error('Registration error. Please try again.')
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateStep(5)) return
    
//     // Start payment process
//     await handlePayment()
//   }

//   const renderStepIndicator = () => (
//     <div className="flex items-center justify-center mb-8">
//       {[1, 2, 3, 4, 5].map((step) => (
//         <div key={step} className="flex items-center">
//           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
//             currentStep >= step 
//               ? 'bg-persian-600 text-white' 
//               : 'bg-gray-200 text-gray-500'
//           }`}>
//             {currentStep > step ? <Check size={20} /> : step}
//           </div>
//           {step < 5 && (
//             <div className={`w-12 h-1 mx-2 ${
//               currentStep > step ? 'bg-persian-600' : 'bg-gray-200'
//             }`} />
//           )}
//         </div>
//       ))}
//     </div>
//   )

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">👤 Account Information</h3>
//         <p className="text-gray-600">Create your account credentials</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//         <div className="relative">
//           <input
//             type="text"
//             name="fullName"
//             required
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//             placeholder="Your full name"
//           />
//           <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//         <div className="relative">
//           <input
//             type="email"
//             name="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//             placeholder="your@email.com"
//           />
//           <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//         <div className="relative">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//             placeholder="••••••••"
//           />
//           <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
//         <div className="relative">
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             name="confirmPassword"
//             required
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//             placeholder="••••••••"
//           />
//           <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">🏢 Business Information</h3>
//         <p className="text-gray-600">Tell us about your business</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
//         <div className="relative">
//           <input
//             type="text"
//             name="businessName"
//             required
//             value={formData.businessName}
//             onChange={handleChange}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//             placeholder="Your business name"
//           />
//           <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//         <div className="relative">
//           <input
//             type="tel"
//             name="phone"
//             required
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//             placeholder="+49 123 456 789"
//           />
//           <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Select Category *</label>
//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//             className="w-full text-left p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-between"
//           >
//             <div>
//               {selectedCategory ? (
//                 <>
//                   <span className="font-medium flex items-center">
//                     <span className="mr-2">{selectedCategory.icon}</span>
//                     {selectedCategory.name}
//                   </span>
//                   <p className="text-sm text-gray-500 mt-1">{selectedCategory.nameGerman}</p>
//                 </>
//               ) : (
//                 <span className="text-gray-500">Choose a category...</span>
//               )}
//             </div>
//             <ChevronDown className={`transform transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} size={20} />
//           </button>
          
//           {showCategoryDropdown && (
//             <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   type="button"
//                   onClick={() => handleCategorySelect(category)}
//                   className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="flex items-center">
//                     <span className="text-2xl mr-3">{category.icon}</span>
//                     <div>
//                       <span className="font-medium block">{category.name}</span>
//                       <p className="text-sm text-gray-500">{category.nameGerman}</p>
//                       <p className="text-xs text-gray-400">{category.businessCount} businesses</p>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {showSubcategories && selectedCategory && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Subcategories (Multiple Selection Allowed)
//           </label>
//           <div className="space-y-2 max-h-60 overflow-y-auto">
//             {selectedCategory.subcategories.map((subcategory) => (
//               <label key={subcategory.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selectedSubcategories.find(sub => sub.id === subcategory.id) ? true : false}
//                   onChange={() => handleSubcategoryToggle(subcategory)}
//                   className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500"
//                 />
//                 <div className="ml-3">
//                   <span className="font-medium text-gray-900">{subcategory.name}</span>
//                   <p className="text-sm text-gray-500">{subcategory.nameGerman}</p>
//                   <p className="text-xs text-gray-400">{subcategory.businessCount} businesses</p>
//                 </div>
//               </label>
//             ))}
//           </div>
//           {selectedSubcategories.length > 0 && (
//             <div className="mt-3 p-3 bg-persian-50 rounded-lg">
//               <p className="text-sm font-medium text-persian-800 mb-2">Selected Subcategories:</p>
//               <div className="flex flex-wrap gap-2">
//                 {selectedSubcategories.map((sub) => (
//                   <span key={sub.id} className="px-3 py-1 bg-persian-600 text-white text-sm rounded-full flex items-center space-x-2">
//                     <span>{sub.name}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleSubcategoryToggle(sub)}
//                       className="hover:bg-persian-700 rounded-full p-1 transition-colors"
//                     >
//                       <X size={12} />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setSelectedSubcategories([])}
//                 className="mt-2 text-sm text-persian-600 hover:text-persian-700 underline"
//               >
//                 Clear all selections
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData({
//                     ...formData,
//                     category: selectedCategory?.id || '',
//                     subcategories: selectedSubcategories.map(sub => sub.id)
//                   })
//                   toast.success(`Saved ${selectedSubcategories.length} subcategories for ${selectedCategory?.name}`)
//                 }}
//                 className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
//               >
//                 Save Selection ({selectedSubcategories.length})
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">🖼️ Branding & Description</h3>
//         <p className="text-gray-600">Add your business description and logo</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Business Logo/Image</label>
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//           {logoPreview ? (
//             <div className="relative inline-block">
//               <img src={logoPreview} alt="Logo preview" className="max-w-32 max-h-32 object-contain mx-auto" />
//               <button
//                 type="button"
//                 onClick={removeLogo}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ) : (
//             <div>
//               <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <p className="text-gray-600 mb-2">Upload your business logo or image</p>
//               <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 3MB</p>
//               <input
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png"
//                 onChange={handleLogoUpload}
//                 className="hidden"
//                 id="logo-upload"
//               />
//               <label
//                 htmlFor="logo-upload"
//                 className="inline-block bg-persian-600 hover:bg-persian-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
//               >
//                 Choose File
//               </label>
//             </div>
//           )}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Description in English</label>
//         <textarea
//           name="descriptionEnglish"
//           value={formData.descriptionEnglish}
//           onChange={handleChange}
//           rows={4}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//           placeholder="Describe your business in English..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Description in German (Deutsch)</label>
//         <textarea
//           name="descriptionGerman"
//           value={formData.descriptionGerman}
//           onChange={handleChange}
//           rows={4}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500"
//           placeholder="Beschreiben Sie Ihr Unternehmen auf Deutsch..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Description in Persian (فارسی)</label>
//         <textarea
//           name="descriptionPersian"
//           value={formData.descriptionPersian}
//           onChange={handleChange}
//           rows={4}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 text-right"
//           placeholder="کسب و کار خود را به فارسی توضیح دهید..."
//           dir="rtl"
//         />
//       </div>
//     </div>
//   )

//   const renderStep4 = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">💳 Payment</h3>
//         <p className="text-gray-600">Complete payment to activate your account</p>
//       </div>

//       {paymentCompleted && formData.paymentMethod === 'bank' && paymentDetails && (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//           <h4 className="font-bold text-green-800 mb-4">Bank Transfer Details</h4>
//           <div className="space-y-2 text-sm">
//             <p><strong>Account Holder:</strong> {paymentDetails.bankDetails.accountHolder}</p>
//             <p><strong>IBAN:</strong> {paymentDetails.bankDetails.iban}</p>
//             <p><strong>BIC:</strong> {paymentDetails.bankDetails.bic}</p>
//             <p><strong>Amount:</strong> €{paymentDetails.amount}</p>
//             <p><strong>Reference:</strong> {paymentDetails.bankDetails.reference}</p>
//           </div>
//           <p className="text-green-700 mt-4 text-sm">
//             Please transfer the exact amount with the reference number. Your account will be activated after we confirm the payment.
//           </p>
//         </div>
//       )}

//       {isProcessingPayment && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
//           <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
//           <p className="text-blue-800">Processing payment...</p>
//         </div>
//       )}

//       <div className="bg-persian-50 border border-persian-200 rounded-lg p-6 text-center">
//         <div className="flex items-center justify-center mb-4">
//           <Euro className="text-persian-600 mr-2" size={24} />
//           <span className="text-3xl font-bold text-persian-600">12</span>
//         </div>
//         <p className="text-gray-700 font-medium">One-time registration fee</p>
//         <p className="text-sm text-gray-600 mt-2">Includes 1 year of listing</p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-4">Select Payment Method</label>
//         <div className="space-y-3">
//           <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="stripe"
//               checked={formData.paymentMethod === 'stripe'}
//               onChange={handleChange}
//               className="w-4 h-4 text-persian-600 border-gray-300 focus:ring-persian-500"
//             />
//             <CreditCard className="ml-3 mr-2 text-gray-400" size={20} />
//             <div>
//               <span className="font-medium">Credit/Debit Card (Stripe)</span>
//               <p className="text-sm text-gray-500">Secure payment with Visa, Mastercard, etc.</p>
//             </div>
//           </label>

//           <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="paypal"
//               checked={formData.paymentMethod === 'paypal'}
//               onChange={handleChange}
//               className="w-4 h-4 text-persian-600 border-gray-300 focus:ring-persian-500"
//             />
//             <div className="ml-3 mr-2 w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
//             <div>
//               <span className="font-medium">PayPal</span>
//               <p className="text-sm text-gray-500">Pay with your PayPal account</p>
//             </div>
//           </label>

//           <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="bank"
//               checked={formData.paymentMethod === 'bank'}
//               onChange={handleChange}
//               className="w-4 h-4 text-persian-600 border-gray-300 focus:ring-persian-500"
//             />
//             <div className="ml-3 mr-2 w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">€</div>
//             <div>
//               <span className="font-medium">Bank Transfer</span>
//               <p className="text-sm text-gray-500">Direct bank transfer (SEPA)</p>
//             </div>
//           </label>
//         </div>
//       </div>
//     </div>
//   )

//   const renderStep5 = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">📋 Terms & Privacy</h3>
//         <p className="text-gray-600">Please review and accept our terms</p>
//       </div>

//       <div className="border border-gray-300 rounded-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h4 className="font-medium text-gray-900">Privacy Policy & Terms of Service</h4>
//           <button
//             type="button"
//             onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}
//             className="text-persian-600 hover:text-persian-700 flex items-center"
//           >
//             {showPrivacyPolicy ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             <span className="ml-1">{showPrivacyPolicy ? 'Hide' : 'Show'}</span>
//           </button>
//         </div>

//         {showPrivacyPolicy && (
//           <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto text-sm text-gray-700 space-y-3">
//             <h5 className="font-medium">Privacy Policy</h5>
//             <p>
//               We collect and process your personal data in accordance with GDPR regulations. 
//               Your information will be used solely for the purpose of providing our directory services.
//             </p>
            
//             <h5 className="font-medium">Terms of Service</h5>
//             <p>
//               By registering, you agree to provide accurate information about your business. 
//               You are responsible for keeping your listing information up to date.
//             </p>
            
//             <h5 className="font-medium">Payment Terms</h5>
//             <p>
//               The registration fee is non-refundable. Your listing will be active for 12 months 
//               from the date of payment confirmation.
//             </p>
            
//             <h5 className="font-medium">Content Guidelines</h5>
//             <p>
//               All business information must be accurate and appropriate. We reserve the right 
//               to remove listings that violate our community guidelines.
//             </p>
//           </div>
//         )}

//         <div className="mt-6">
//           <label className="flex items-start">
//             <input
//               type="checkbox"
//               checked={acceptedTerms}
//               onChange={(e) => setAcceptedTerms(e.target.checked)}
//               className="w-4 h-4 text-persian-600 border-gray-300 rounded focus:ring-persian-500 mt-1"
//             />
//             <span className="ml-3 text-sm text-gray-700">
//               I have read and accept the{' '}
//               <button
//                 type="button"
//                 onClick={() => setShowPrivacyPolicy(true)}
//                 className="text-persian-600 hover:text-persian-700 underline"
//               >
//                 Privacy Policy and Terms of Service
//               </button>
//               {' '}*
//             </span>
//           </label>
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white font-bold text-2xl">IIB</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
//             <p className="text-gray-600">Join Iranian Info Bank Germany</p>
//           </div>

//           {/* Step Indicator */}
//           {renderStepIndicator()}

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             {currentStep === 1 && renderStep1()}
//             {currentStep === 2 && renderStep2()}
//             {currentStep === 3 && renderStep3()}
//             {currentStep === 4 && renderStep4()}
//             {currentStep === 5 && renderStep5()}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Previous
//                 </button>
//               )}
              
//               <div className="ml-auto">
//                 {currentStep < 5 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="px-6 py-3 bg-persian-600 hover:bg-persian-700 text-white rounded-lg transition-colors"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     disabled={isLoading || !acceptedTerms || isProcessingPayment}
//                     className="px-8 py-3 bg-persian-600 hover:bg-persian-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium flex items-center space-x-2"
//                   >
//                     {isProcessingPayment && <Loader className="animate-spin" size={18} />}
//                     <span>{isLoading || isProcessingPayment ? 'Processing Payment...' : 'Pay & Register'}</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>

//           {/* Login Link */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-persian-600 hover:text-persian-700 font-medium transition-colors">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register