import React from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] pt-20 pb-8 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* Column 1: Brand, Action Buttons & Text */}
          <div className="lg:col-span-5 pr-0 lg:pr-6">
            <div className="flex items-center mb-6">
              <img src={logo} alt="STOREYS" className="h-6 w-auto" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button className="bg-[#1e1e1e] text-white px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-black transition-all">
                Book a Valuation
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="bg-transparent border border-gray-300 text-gray-800 px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-gray-100 transition-all">
                Explore More
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-gray-500 text-[13px] leading-relaxed font-normal max-w-md">
              Storeys is a top real estate brokerage in Dubai, excelling in Sales, Leasing, and Off-Plan properties. With 20+ years of expertise, we offer innovative strategies, helping investors maximize their real estate potential in a dynamic market.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-5 text-[15px]">Quick Links</h4>
            <ul className="space-y-3 text-[13px] text-gray-500 font-normal">
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-black transition-colors">List a Property</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Dubai Communities</a></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-5 text-[15px]">Our Services</h4>
            <ul className="space-y-3 text-[13px] text-gray-500 font-normal">
              <li><a href="#" className="hover:text-black transition-colors">Holiday Homes</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Interiors</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Mortgage</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Property Management</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Commercial</a></li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-5 text-[15px]">Get in Touch</h4>
            <ul className="space-y-3 text-[13px] text-gray-500 mb-6 font-normal">
              <li>
                <a href="tel:0567897077" className="hover:text-black transition-colors">
                  056 789 7077
                </a>
              </li>
              <li>
                <a href="mailto:enquiries@storeys.ae" className="hover:text-black transition-colors">
                  enquiries@storeys.ae
                </a>
              </li>
              <li className="leading-relaxed text-gray-500">
                G10, Building No. 3,<br />
                Arenco Offices,<br />
                DIP, Dubai
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200/70 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500">
          <p>&copy; 2025 Storeys All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
