import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      toast.error(t("auth.loginFailed"));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("auth.login")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("auth.email")}
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("auth.password")}
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-persian-600 hover:bg-persian-700 text-white py-3 rounded-lg transition-colors"
          >
            {isLoading ? t("auth.loading") : t("auth.login")}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t("auth.noAccount")}{" "}
          <Link
            to="/register"
            className="text-persian-600 hover:text-persian-700 font-medium"
          >
            {t("auth.register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;





// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
// import { useAuth } from '../utils/AuthContext'
// import toast from 'react-hot-toast'

// const Login = () => {
//   const { t } = useTranslation()
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const success = await login(formData.email, formData.password)
//       if (success) {
//         toast.success('Login successful!')
//         navigate('/dashboard')
//       } else {
//         toast.error('Invalid email or password')
//       }
//     } catch (error) {
//       toast.error('Login failed. Please try again.')
//     }

//     setIsLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-r from-persian-600 to-gold-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white font-bold text-2xl">IIB</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.login')}</h2>
//             <p className="text-gray-600">{t('auth.welcomeBack')}</p>

//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 {t('auth.email')}
//               </label>
//               <div className="relative">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 transition-colors"
//                   placeholder="your@email.com"
//                 />
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 {t('auth.password')}
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-persian-500 focus:border-persian-500 transition-colors"
//                   placeholder="••••••••"
//                 />
//                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <Link 
//                 to="/forgot-password" 
//                 className="text-sm text-persian-600 hover:text-persian-700 transition-colors"
//               >
//                 {t('auth.forgotPassword')}
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-persian-600 hover:bg-persian-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors"
//             >
//               {isLoading ? t('common.loading') : t('auth.login')}
//             </button>
//           </form>

//           {/* Register Link */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               {t('auth.noAccount')}{' '}
//               <Link to="/register" className="text-persian-600 hover:text-persian-700 font-medium transition-colors">
//                 {t('auth.register')}
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login