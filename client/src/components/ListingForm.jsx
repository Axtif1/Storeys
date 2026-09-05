import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import burjKhalifaImg from '../assets/burj-khalifa-contact.png'

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
    <section className="bg-[#1e1e1e] text-white py-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full min-h-[680px]">

        {/* Left Side - Vertical Image */}
        <div className="lg:w-1/2 min-h-[480px] lg:min-h-full">
          <img
            src={burjKhalifaImg}
            alt="Dubai Real Estate Burj Khalifa"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-[#1e1e1e]">
          <h2 
            className="text-white mb-3"
            style={{
              fontFamily: "'Atyp Display TRIAL', sans-serif",
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '34px',
              lineHeight: '110%',
              letterSpacing: '0%'
            }}
          >
            List Your Property with Storeys Real Estate
          </h2>
          <p 
            className="text-[#CCCCCC] mb-8 max-w-[540px]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '135%',
              letterSpacing: '0%'
            }}
          >
            At Storeys, we believe in adding as much value as possible when you agree to list your property for sale exclusively!
          </p>

          {status === 'success' ? (
            <div className="bg-[#2a2a2a] p-8 rounded-xl border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-gray-300">Your inquiry has been received. Our team will contact you shortly.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Submit another property
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 max-w-[560px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label 
                    className="block text-[#E0E0E0] mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '140%',
                      letterSpacing: '0%'
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="w-full bg-[#2c2c2c] border border-white/30 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-[#E0E0E0] mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '140%',
                      letterSpacing: '0%'
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="w-full bg-[#2c2c2c] border border-white/30 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-[#E0E0E0] mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '140%',
                      letterSpacing: '0%'
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    className="w-full bg-[#2c2c2c] border border-white/30 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-[#E0E0E0] mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '140%',
                      letterSpacing: '0%'
                    }}
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    className="w-full bg-[#2c2c2c] border border-white/30 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  />
                </div>
              </div>

              <div>
                <label 
                  className="block text-[#E0E0E0] mb-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    letterSpacing: '0%'
                  }}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a Brief Description"
                  className="w-full bg-[#2c2c2c] border border-white/30 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors resize-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    letterSpacing: '0%'
                  }}
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">An error occurred while submitting. Please try again.</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-white text-black px-10 py-3 rounded-full text-[16px] font-semibold hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
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
