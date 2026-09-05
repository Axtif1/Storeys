import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Menu, X, ArrowRight } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#', active: true },
    { name: 'About Us', href: '#' },
    { name: 'Our Team', href: '#' },
    { name: 'Our Services', href: '#' },
    { name: 'List a Property', href: '#' },
    { name: 'Careers', href: '#' },
  ]

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md transition-all duration-300 border-b border-gray-100/80">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-[80px]">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="Storeys Logo" className="h-7 w-auto" />
          </div>

          {/* Nav items + Contact Us Container */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {/* Desktop Nav Links */}
            <div className="flex items-center gap-6 xl:gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[16px] leading-none transition-colors ${
                    link.active 
                      ? 'text-[#1e1e1e] font-bold' 
                      : 'text-[#4a4a4a] font-normal hover:text-black'
                  }`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Contact Us Button */}
            <a
              href="#contact"
              className="bg-[#212121] hover:bg-black text-white px-7 py-3 rounded-full text-[15px] font-medium flex items-center gap-2.5 transition-all shadow-sm ml-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Contact Us <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
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
          <div className="px-4 pt-3 pb-5 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-base font-medium text-gray-700 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#1e1e1e] text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
