import React from 'react'
import { ArrowRight } from 'lucide-react'
import aboutImg from '../assets/image-1.png'

const AboutStoreys = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div className="space-y-8 pr-4">
          <div className="max-w-[538px]">
            <h3 
              className="text-[#1A1A1A] mb-4"
              style={{
                fontFamily: "'Atyp Display TRIAL', sans-serif",
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '25px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              About Storeys
            </h3>
            <h2 
              className="text-[#1A1A1A] mb-5 max-w-[460px]"
              style={{
                fontFamily: "'Atyp Display TRIAL', sans-serif",
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '120%',
                letterSpacing: '0%'
              }}
            >
              The Brightest And Fastest-Growing Real Estate<br />Brokerage Firm in Dubai
            </h2>
            <p 
              className="text-[#555555] max-w-[510px]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '150%',
                letterSpacing: '0%'
              }}
            >
              At Storeys, we specialize in Sales and Leasing, excelling in the<br />Off-Plan Sector with a team boasting 20+ years of combined<br />experience. Our Hybrid Approach allows us to evolve, learn, and<br />adapt to the ever-changing market.
            </p>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{ zIndex: 6 - i }} className="w-[42px] h-[42px] rounded-full border-2 border-white bg-gray-200 shadow-sm flex items-center justify-center overflow-hidden relative">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Team" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-[13px] font-medium leading-tight">
              Meet Our<br/>Professional Team
            </p>
          </div>

          <div className="space-y-6 pt-4 max-w-[480px]">
            <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
              <span 
                className="text-[#1A1A1A] w-[180px] shrink-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '70.95px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                20+
              </span>
              <p 
                className="text-[#1A1A1A]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '125%',
                  letterSpacing: '0%'
                }}
              >
                years of combined<br/>experience.
              </p>
            </div>
            <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
              <span 
                className="text-[#1A1A1A] w-[180px] shrink-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '70.95px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                93%
              </span>
              <p 
                className="text-[#1A1A1A]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '125%',
                  letterSpacing: '0%'
                }}
              >
                Unmatched expertise in<br/>Off-Plan investments
              </p>
            </div>
            <div className="flex items-center gap-6 pb-2">
              <span 
                className="text-[#1A1A1A] w-[180px] shrink-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '70.95px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                23
              </span>
              <p 
                className="text-[#1A1A1A]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '125%',
                  letterSpacing: '0%'
                }}
              >
                Comprehensive solutions for investors & property owners
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden h-[500px] lg:h-[700px] group cursor-pointer w-full max-w-[500px] ml-auto">
          <img 
            src={aboutImg} 
            alt="Dubai Real Estate" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white font-medium text-[17px] max-w-[250px] drop-shadow-md leading-snug">
              Your Gateway To Dubai's Real Estate Future
            </p>
          </div>

          <div className="absolute top-6 right-6">
            <button className="bg-white/95 backdrop-blur-sm text-gray-900 px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 hover:bg-white transition-colors shadow-lg">
              Explore More <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutStoreys
