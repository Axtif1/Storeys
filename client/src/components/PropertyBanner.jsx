import React from 'react'
import { ArrowRight } from 'lucide-react'
import listPropertyBg from '../assets/list-property-bg.png'

const PropertyBanner = () => {
  return (
    <section className="relative w-full h-[320px] md:h-[350px] flex items-center justify-center my-0">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${listPropertyBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 
          className="text-white mb-4"
          style={{
            fontFamily: "'Atyp Display TRIAL', sans-serif",
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '60px',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
        >
          List your property
        </h2>
        <p 
          className="text-white mb-8 max-w-2xl mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '18px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center'
          }}
        >
          Take your property ‘Exclusive’ with Storeys and enjoy all the exclusive benefits.
        </p>
        <button 
          className="bg-white text-gray-900 px-8 py-3.5 rounded-full flex items-center gap-2 mx-auto hover:bg-gray-100 transition-colors shadow-lg"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
        >
          Book a Valuation <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}

export default PropertyBanner
