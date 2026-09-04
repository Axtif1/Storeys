import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'
import heroBg from '../assets/image.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate(from === '/admin' ? '/' : from || '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
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
            Your Gateway to Dubai's Real Estate Future
          </p>
          <p className="text-gray-300 text-[14px] mt-3 font-medium">
            Dubai's fastest growing brokerage.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16">
        <div className="lg:hidden mb-10">
          <img src={logo} alt="Storeys" className="h-6 w-auto brightness-0 invert" />
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h2 className="text-3xl md:text-[34px] font-semibold text-white mb-3">
            Welcome back
          </h2>
          <p className="text-gray-400 text-[14px] mb-10 font-medium">
            Sign in to your Storeys account to continue.
          </p>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                    Signing in...
                  </>
                ) : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <p className="text-gray-400 text-[14px]">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-semibold hover:underline transition-all">
              Create one free
            </Link>
          </p>

          <p className="mt-4 text-gray-400 text-[14px]">
            <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors text-[13px]">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
