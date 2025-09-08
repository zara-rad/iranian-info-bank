import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app initialization
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Check for admin credentials
      let mockUser
      
      if (email === 'admin@iranianinfo.de' && password === 'admin123') {
        mockUser = {
          id: 1,
          email: email,
          fullName: 'Super Admin',
          role: 'super_admin',
          businessName: null
        }
      } else if (email === 'moderator@iranianinfo.de' && password === 'mod123') {
        mockUser = {
          id: 2,
          email: email,
          fullName: 'Admin User',
          role: 'admin',
          businessName: null
        }
      } else if (email === 'business@example.com' && password === 'business123') {
        mockUser = {
          id: 3,
          email: email,
          fullName: 'Ahmad Hosseini',
          role: 'business_owner',
          businessName: 'Dr. Hosseini Medical Practice'
        }
      } else {
        // Regular business owner
        mockUser = {
          id: 4,
          email: email,
          fullName: 'Business Owner',
          role: 'business_owner',
          businessName: 'Test Business'
        }
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (userData) => {
    try {
      // In a real app, this would be an API call
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        fullName: userData.fullName,
        role: 'business_owner',
        businessName: userData.businessName
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}