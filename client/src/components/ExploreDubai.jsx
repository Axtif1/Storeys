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
          <p className="text-gray-600 font-medium text-[15px] mb-2 tracking-wide">Popular Areas</p>
          <h2 className="text-4xl md:text-[44px] font-medium text-[#1a1a1a]">
            Explore Dubai
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <div 
              key={area._id}
              className="bg-white rounded-[20px] p-4 flex flex-col h-full border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                <img 
                  src={area.image.startsWith('/') ? `${api}${area.image}` : area.image}
                  alt={area.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{area.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                {area.description}
              </p>
              <div className="mt-auto">
                <button className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-black transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg w-max">
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
