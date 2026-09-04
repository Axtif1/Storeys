import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'
import heroBg from '../assets/image-1.png'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const passwordChecks = [
    { label: 'At least 8 characters', valid: form.password.length >= 8 },
    { label: 'Contains a number', valid: /\d/.test(form.password) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match")
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#242424] flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={heroBg}
          alt="Dubai Real Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-10 left-10">
          <img src={logo} alt="Storeys" className="h-6 w-auto brightness-0 invert" />
        </div>

        <div className="absolute bottom-12 left-10 right-10">
          <p className="text-white font-semibold text-[28px] leading-snug max-w-[320px]">
            Start your Dubai real estate journey today
          </p>
          <p className="text-gray-300 text-[14px] mt-3 font-medium">
            Join thousands of investors and property seekers.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16">
        <div className="lg:hidden mb-10">
          <img src={logo} alt="Storeys" className="h-6 w-auto brightness-0 invert" />
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h2 className="text-3xl md:text-[34px] font-semibold text-white mb-3">
            Create your account
          </h2>
          <p className="text-gray-400 text-[14px] mb-10 font-medium">
            Join Storeys Real Estate — Dubai's fastest growing brokerage.
          </p>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full bg-[#333333] border border-gray-600 rounded-lg px-4 py-3 pr-12 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {form.password && (
                <div className="mt-2 flex gap-4">
                  {passwordChecks.map((check) => (
                    <div key={check.label} className="flex items-center gap-1.5">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${check.valid ? 'bg-green-500' : 'bg-gray-600'}`}>
                        {check.valid && <Check className="w-2 h-2 text-white" />}
                      </div>
                      <span className={`text-[11px] transition-colors ${check.valid ? 'text-green-400' : 'text-gray-600'}`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className={`w-full bg-[#333333] border rounded-lg px-4 py-3 text-[14px] text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  form.confirmPassword && form.password !== form.confirmPassword
                    ? 'border-red-500/50 focus:border-red-400'
                    : 'border-gray-600 focus:border-white'
                }`}
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-400 text-[12px] mt-1.5">Passwords don't match</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-black px-10 py-3 rounded-full text-[14px] font-semibold hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <p className="text-gray-400 text-[14px]">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold hover:underline transition-all">
              Sign in
            </Link>
          </p>

          <p className="mt-4">
            <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors text-[13px]">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
