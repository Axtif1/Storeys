import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import heroBg from '../assets/image.png'

const ListingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      await axios.post(`${api}/api/inquiries`, formData)
      setStatus('success')
      toast.success('Inquiry submitted successfully!')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', description: '' })
    } catch {
      setStatus('error')
      toast.error('Failed to submit inquiry. Please try again.')
    }
  }

  return (
    <section className="bg-[#242424] text-white py-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left Side - Image */}
        <div className="lg:w-1/2 h-[400px] lg:h-auto">
          <img 
            src={heroBg} 
            alt="Dubai Real Estate Burj Khalifa" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <h2 className="text-3xl md:text-[34px] font-semibold mb-3">
            List Your Property with Storeys Real Estate
          </h2>
          <p className="text-gray-300 text-[14px] mb-10 font-medium max-w-[600px]">
            At Storeys, we believe in adding as much value as possible when you agree to list your property for sale exclusively!
          </p>

          {status === 'success' ? (
            <div className="bg-[#333333] p-8 rounded-xl border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-gray-400">Your inquiry has been received. Our team will contact you shortly.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="mt-6 bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Submit another property
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-[13px] font-medium text-gray-300 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-gray-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-300 mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-gray-300 mb-2">Description</label>
                <textarea 
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a Brief Description"
                  className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">An error occurred while submitting. Please try again.</p>
              )}

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-white text-black px-10 py-3 rounded-full text-[14px] font-semibold hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ListingForm
