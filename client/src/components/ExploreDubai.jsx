import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'

const ExploreDubai = () => {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const { data } = await axios.get(`${api}/api/areas`)
        setAreas(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAreas()
  }, [api])

  if (loading || areas.length === 0) return null

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p 
            className="text-gray-500 mb-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center'
            }}
          >
            Popular Areas
          </p>
          <h2 
            className="text-[#1a1a1a]"
            style={{
              fontFamily: "'Atyp Display TRIAL', sans-serif",
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '50px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center'
            }}
          >
            Explore Dubai
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <div 
              key={area._id}
              className="bg-white flex flex-col h-full"
            >
              <div className="w-full h-[258px] rounded-[15px] overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={area.image.startsWith('/') ? `${api}${area.image}` : area.image}
                  alt={area.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 
                className="text-[#1a1a1a] mb-2"
                style={{
                  fontFamily: "'Atyp Display TRIAL', sans-serif",
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {area.title}
              </h3>
              <p 
                className="text-gray-500 mb-5 flex-grow"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '18px',
                  lineHeight: '130%',
                  letterSpacing: '0%'
                }}
              >
                {area.description}
              </p>
              <div className="mt-auto">
                <button className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-[14px] font-medium flex items-center gap-2 hover:bg-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-max">
                  Explore More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreDubai
