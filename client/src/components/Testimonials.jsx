import React, { useState, useEffect } from 'react'
import axios from 'axios'
import testimonial1 from '../assets/testimonial-1.png'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      _id: 'fallback_1',
      name: 'Mohamed Kadir',
      location: 'Dubai',
      rating: 5,
      content: "I recently had the pleasure of working with Storeys Real Estate for the purchase of my first home, and I couldn't be happier with the experience. From the moment I contacted them, the team was incredibly responsive and professional. They took the time to understand my needs and provided valuable insights into the market. The process was seamless, and I felt well-supported at every step. Their attention to detail and commitment to ensuring everything went smoothly made all the difference. I highly recommend Storeys to anyone looking for reliable, top-notch real estate services.",
      image: testimonial1,
      signature: 'Mohammed Kadir'
    },
    {
      _id: 'fallback_2',
      name: 'Sarah Jenkins',
      location: 'Dubai Marina',
      rating: 5,
      content: "Storeys provided an exceptional service from start to finish. Their deep knowledge of the Dubai market helped me find the perfect investment property. The team goes above and beyond to ensure everything is seamless.",
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      signature: 'Sarah J.'
    }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const { data } = await axios.get(`${api}/api/testimonials`)
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Failed to load testimonials', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  if (loading && testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-[38px] font-medium text-center text-[#1a1a1a] mb-16">
          What Our Clients Are Saying
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          
          <div className="w-full md:w-5/12">
            <div className="rounded-[16px] overflow-hidden shadow-md h-[350px] md:h-[450px]">
              <img 
                src={current.image && current.image.startsWith('/') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${current.image}` : (current.image || 'https://via.placeholder.com/450')} 
                alt={current.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-7/12 relative">
            <div className="flex flex-col justify-center relative py-4 lg:pl-4">
              <div>
                <h3 className="text-[20px] font-medium text-gray-900 mb-2">{current.name}</h3>
                <p className="text-gray-500 text-[14px] mb-5 font-normal">{current.location}</p>
                
                <div className="flex gap-[2px] mb-5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-[#1a1a1a] text-[#1a1a1a]" />
                  ))}
                </div>

                <p className="text-gray-700 text-[14px] leading-[1.8] mb-8 font-medium">
                  {current.content}
                </p>

                <div className="flex justify-between items-end mt-10">
                  <div className="text-[38px] text-gray-400 opacity-70" style={{fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontStyle: "italic"}}>
                    {current.signature}
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={prev}
                      className="w-[42px] h-[42px] rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={next}
                      className="w-[42px] h-[42px] rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
