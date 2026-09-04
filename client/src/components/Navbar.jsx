import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Our Team', href: '#' },
    { name: 'Our Services', href: '#' },
    { name: 'List a Property', href: '#' },
    { name: 'Careers', href: '#' },
  ]

  return (
    <nav className="fixed w-full z-50 bg-white transition-all duration-300 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="Storeys Logo" className="h-5 sm:h-7 md:h-6 w-auto" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7">
            <a href="#" className="text-gray-900 font-semibold hover:text-black text-[13px]">Home</a>
            <a href="#" className="text-gray-500 font-medium hover:text-gray-900 text-[13px]">About Us</a>
            <a href="#" className="text-gray-500 font-medium hover:text-gray-900 text-[13px]">Our Team</a>
            <a href="#" className="text-gray-500 font-medium hover:text-gray-900 text-[13px]">Our Services</a>
            <a href="#" className="text-gray-500 font-medium hover:text-gray-900 text-[13px]">List a Property</a>
            <a href="#" className="text-gray-500 font-medium hover:text-gray-900 text-[13px]">Careers</a>
          </div>

          {/* Desktop Auth Area */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* Admin Panel Button — only for admins */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Admin Panel
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-[#242424] text-white px-4 py-[9px] rounded-full text-[13px] font-medium hover:bg-black transition-colors"
                  >
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <span className={`mt-1 inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                          {isAdmin ? 'Administrator' : 'Member'}
                        </span>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gray-400" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[13px] font-medium text-gray-700 hover:text-gray-900 px-4 py-[10px] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-[#242424] text-white px-6 py-[10px] rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-black transition-colors"
                >
                  Get Started <span className="text-white text-[15px] leading-none mt-[-1px]">+</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
              {user ? (
                <>
                  {/* User info in mobile */}
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
                  >
                    Sign in
                  </Link>
                  <div className="px-3 py-2">
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full block text-center bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
