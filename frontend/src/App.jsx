import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import CityPage from './pages/CityPage'
import CategoryPage from './pages/CategoryPage'
import SubcategoryPage from './pages/SubcategoryPage'
import EventDetail from './pages/EventDetail'
import EventsPage from './pages/EventsPage'
import Dashboard from './pages/Dashboard'
import BusinessDashboard from './pages/BusinessDashboard'

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/city/:cityName" element={<CityPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route
              path="/category/:categoryId/subcategory/:subcategoryId"
              element={<SubcategoryPage />}
            />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  )
}

export default App
