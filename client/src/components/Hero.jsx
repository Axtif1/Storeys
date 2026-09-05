import React from 'react'
import PropertySearch from './PropertySearch'
import heroBg from '../assets/image.png'

const Hero = () => {
  return (
    <div className="relative h-[calc(100vh-72px)] min-h-[600px] mt-[72px] flex items-center justify-center mb-24 md:mb-32">
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-16">
        <h1 
          className="text-white mb-2.5 drop-shadow-lg"
          style={{
            fontFamily: "'Atyp Display TRIAL', sans-serif",
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '50px',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
        >
          Integrity. Expertise. Excellence.
        </h1>
        <p 
          className="text-gray-200 max-w-2xl mx-auto drop-shadow-md"
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
          Dubai's fastest growing brokerage, while providing a new standard of service.
        </p>
      </div>

      <PropertySearch />
    </div>
  )
}

export default Hero
