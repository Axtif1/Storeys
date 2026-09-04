import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Developers = () => {
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(true)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const { data } = await axios.get(`${api}/api/developers`)
        setDevelopers(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDevelopers()
  }, [api])

  if (loading || developers.length === 0) return null

  const half = Math.ceil(developers.length / 2)
  const row1 = developers.slice(0, half)
  const row2 = developers.slice(half)

  // Duplicate arrays to create continuous scrolling effect
  const row1Repeated = [...row1, ...row1, ...row1, ...row1]
  const row2Repeated = [...row2, ...row2, ...row2, ...row2]

  return (
    <div className="w-full bg-white pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl md:text-[38px] font-medium text-[#1a1a1a]">
          Our Developers
        </h2>
      </div>
      
      <div className="w-full overflow-hidden relative space-y-4 md:space-y-6">
        {/* Row 1 */}
        <div className="flex w-max animate-marquee gap-4 md:gap-6 px-4">
          {row1Repeated.map((dev, index) => (
            <div 
              key={`row1-${dev.id}-${index}`} 
              className="bg-white border border-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-6 flex items-center justify-center w-[180px] h-[90px] md:w-[220px] md:h-[100px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img 
                src={dev.logo.startsWith('/') ? `${api}${dev.logo}` : dev.logo} 
                alt={dev.name} 
                className="max-w-[130px] max-h-[45px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max animate-marquee-reverse gap-4 md:gap-6 px-4">
          {row2Repeated.map((dev, index) => (
            <div 
              key={`row2-${dev.id}-${index}`} 
              className="bg-white border border-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-6 flex items-center justify-center w-[180px] h-[90px] md:w-[220px] md:h-[100px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img 
                src={dev.logo.startsWith('/') ? `${api}${dev.logo}` : dev.logo} 
                alt={dev.name} 
                className="max-w-[130px] max-h-[45px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Developers
