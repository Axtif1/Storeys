import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PropertySearch = () => {
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [type, setType] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)

  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const bedroomOptions = ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms']
  const typeOptions = ['Apartment', 'Villa', 'Townhouse', 'Penthouse']
  const priceOptions = ['Under 1M AED', '1M - 3M AED', '3M - 5M AED', '5M+ AED']

  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '18px', lineHeight: '100%', letterSpacing: '0%' }
  const valueStyle = { fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '100%', letterSpacing: '0%' }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    // Basic search function hook
    console.log('Searching for:', { location, bedrooms, type, priceRange })
  }

  return (
    <div className="absolute bottom-8 md:bottom-12 left-0 right-0 w-full max-w-[1200px] mx-auto z-20 px-4">
      <div
        ref={dropdownRef}
        className="bg-white shadow-[0_20px_40px_rgb(0,0,0,0.12)] p-2 md:p-3 flex flex-col md:flex-row items-center justify-between rounded-[20px] md:rounded-[10px] relative"
      >

        {/* Location */}
        <div className="flex-1 w-full md:border-r border-gray-200 px-6 py-2">
          <label className="block text-gray-900 mb-1" style={labelStyle}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Community or Area"
            className="w-full bg-transparent text-gray-900 focus:outline-none placeholder-gray-500"
            style={valueStyle}
          />
        </div>

        {/* Bedrooms Dropdown */}
        <div className="flex-1 w-full md:border-r border-gray-200 px-6 py-2 relative">
          <label className="block text-gray-900 mb-1" style={labelStyle}>Bedrooms</label>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setActiveDropdown(activeDropdown === 'bedrooms' ? null : 'bedrooms')}
          >
            <span className={bedrooms ? 'text-gray-900' : 'text-gray-500'} style={valueStyle}>
              {bedrooms || 'Select Bedrooms'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeDropdown === 'bedrooms' ? 'rotate-180' : ''}`} />
          </div>
          {activeDropdown === 'bedrooms' && (
            <div className="absolute top-full left-0 mt-4 w-full bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
              {bedroomOptions.map((opt) => (
                <div
                  key={opt}
                  className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                  style={valueStyle}
                  onClick={() => { setBedrooms(opt); setActiveDropdown(null) }}
                >
                  {opt}
                </div>
              ))}
              <div
                className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-red-500 border-t border-gray-100 mt-1"
                style={{ ...valueStyle, fontWeight: 500 }}
                onClick={() => { setBedrooms(''); setActiveDropdown(null) }}
              >
                Clear
              </div>
            </div>
          )}
        </div>

        {/* Types Dropdown */}
        <div className="flex-1 w-full md:border-r border-gray-200 px-6 py-2 relative">
          <label className="block text-gray-900 mb-1" style={labelStyle}>Types</label>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setActiveDropdown(activeDropdown === 'types' ? null : 'types')}
          >
            <span className={type ? 'text-gray-900' : 'text-gray-500'} style={valueStyle}>
              {type || 'Select Types'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeDropdown === 'types' ? 'rotate-180' : ''}`} />
          </div>
          {activeDropdown === 'types' && (
            <div className="absolute top-full left-0 mt-4 w-full bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
              {typeOptions.map((opt) => (
                <div
                  key={opt}
                  className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                  style={valueStyle}
                  onClick={() => { setType(opt); setActiveDropdown(null) }}
                >
                  {opt}
                </div>
              ))}
              <div
                className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-red-500 border-t border-gray-100 mt-1"
                style={{ ...valueStyle, fontWeight: 500 }}
                onClick={() => { setType(''); setActiveDropdown(null) }}
              >
                Clear
              </div>
            </div>
          )}
        </div>

        {/* Price Range Dropdown */}
        <div className="flex-1 w-full px-6 py-2 relative">
          <label className="block text-gray-900 mb-1" style={labelStyle}>Price Range</label>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
          >
            <span className={priceRange ? 'text-gray-900' : 'text-gray-500'} style={valueStyle}>
              {priceRange || 'Min. price - Max. price'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
          </div>
          {activeDropdown === 'price' && (
            <div className="absolute top-full left-0 mt-4 w-[200%] md:w-full bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50 right-0 md:right-auto">
              {priceOptions.map((opt) => (
                <div
                  key={opt}
                  className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                  style={valueStyle}
                  onClick={() => { setPriceRange(opt); setActiveDropdown(null) }}
                >
                  {opt}
                </div>
              ))}
              <div
                className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-red-500 border-t border-gray-100 mt-1"
                style={{ ...valueStyle, fontWeight: 500 }}
                onClick={() => { setPriceRange(''); setActiveDropdown(null) }}
              >
                Clear
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="px-2 w-full md:w-auto mt-4 md:mt-0">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#1e1e1e] hover:bg-black text-white px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '16px' }}
          >
            Search
          </button>
        </div>

      </div>
    </div>
  )
}

export default PropertySearch
