import React from 'react'
import { ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'
import iconInstagram from '../assets/icon-instagram.png'
import iconWhatsapp from '../assets/icon-whatsapp.png'
import iconFacebook from '../assets/icon-facebook.png'

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* Column 1: Brand, Action Buttons & Text */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <div className="flex items-center mb-8">
              <img src={logo} alt="STOREYS" className="h-7 w-auto" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button 
                className="bg-[#1e1e1e] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-black transition-all shadow-sm"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '15px'
                }}
              >
                Book a Valuation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                className="bg-transparent border border-gray-400 text-gray-800 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '15px'
                }}
              >
                Explore More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p 
              className="text-[#666666] max-w-md"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%'
              }}
            >
              Storeys is a top real estate brokerage in Dubai, excelling in Sales, Leasing, and Off-Plan properties. With 20+ years of expertise, we offer innovative strategies, helping investors maximize their real estate potential in a dynamic market.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 
              className="text-gray-900 mb-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '35px',
                letterSpacing: '0%'
              }}
            >
              Quick Links
            </h4>
            <ul className="text-[#666666]">
              {['Home', 'About Us', 'Our Team', 'List a Property', 'Careers', 'Dubai Communities'].map((item) => (
                <li key={item} style={{ lineHeight: '35px' }}>
                  <a 
                    href="#" 
                    className="hover:text-black transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      letterSpacing: '0%'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-2">
            <h4 
              className="text-gray-900 mb-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '35px',
                letterSpacing: '0%'
              }}
            >
              Our Services
            </h4>
            <ul className="text-[#666666]">
              {['Holiday Homes', 'Interiors', 'Mortgage', 'Property Management', 'Commercial'].map((item) => (
                <li key={item} style={{ lineHeight: '35px' }}>
                  <a 
                    href="#" 
                    className="hover:text-black transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      letterSpacing: '0%'
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="lg:col-span-3">
            <h4 
              className="text-gray-900 mb-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '35px',
                letterSpacing: '0%'
              }}
            >
              Get in Touch
            </h4>
            <ul className="text-[#666666] mb-6">
              <li style={{ lineHeight: '35px' }}>
                <a 
                  href="tel:0567897077" 
                  className="hover:text-black transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  056 789 7077
                </a>
              </li>
              <li style={{ lineHeight: '35px' }}>
                <a 
                  href="mailto:enquiries@storeys.ae" 
                  className="hover:text-black transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  enquiries@storeys.ae
                </a>
              </li>
              <li 
                className="mt-1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px'
                }}
              >
                G10, Building No. 3,<br />
                Arenco Offices,<br />
                DIP, Dubai
              </li>
            </ul>

            {/* Social Circle Icons */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#E8E8E8] hover:bg-gray-300 flex items-center justify-center transition-colors">
                <img src={iconInstagram} alt="Instagram" className="w-5 h-5 object-contain" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#E8E8E8] hover:bg-gray-300 flex items-center justify-center transition-colors">
                <img src={iconFacebook} alt="Facebook" className="w-5 h-5 object-contain" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#E8E8E8] hover:bg-gray-300 flex items-center justify-center transition-colors">
                <img src={iconWhatsapp} alt="WhatsApp" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-6 border-t border-gray-300/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[#666666]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: '14px'
          }}
        >
          <p>© 2025 Storeys All rights reserved.</p>
          <div className="flex gap-8">
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
