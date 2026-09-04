import React from 'react'
import { ArrowRight } from 'lucide-react'

const PropertyBanner = () => {
  return (
    <section className="relative w-full h-[320px] md:h-[350px] flex items-center justify-center my-0">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-[42px] font-semibold text-white mb-4 tracking-tight">
          List your property
        </h2>
        <p className="text-[15px] text-gray-100 mb-8 max-w-xl mx-auto font-medium">
          Take your property 'Exclusive' with Storeys and enjoy all the exclusive benefits.
        </p>
        <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 mx-auto hover:bg-gray-100 transition-colors shadow-lg">
          Book a Valuation <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  )
}

export default PropertyBanner
