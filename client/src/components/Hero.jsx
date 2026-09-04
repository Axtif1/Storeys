import React from 'react'
import PropertySearch from './PropertySearch'
import heroBg from '../assets/hero.png'

const Hero = () => {
  return (
    <div className="relative h-[calc(100vh-72px)] min-h-[600px] mt-[72px] flex items-center justify-center mb-24 md:mb-32">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-16">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
          Integrity. Expertise. Excellence.
        </h1>
        <p className="text-[17px] md:text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md font-light tracking-wide">
          Dubai's fastest growing brokerage, while providing a new standard of service.
        </p>
      </div>

      <PropertySearch />
    </div>
  )
}

export default Hero
