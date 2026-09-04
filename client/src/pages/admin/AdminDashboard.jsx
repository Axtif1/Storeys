import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MessageSquare, Inbox, Eye } from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTestimonials: 0,
    visibleTestimonials: 0,
    totalInquiries: 0,
    newInquiries: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        
        const [testRes, inqRes] = await Promise.all([
          axios.get(`${api}/api/testimonials`, config),
          axios.get(`${api}/api/inquiries`, config)
        ])

        setStats({
          totalTestimonials: testRes.data.length,
          visibleTestimonials: testRes.data.filter(t => t.isVisible).length,
          totalInquiries: inqRes.data.length,
          newInquiries: inqRes.data.filter(i => i.status === 'new').length
        })
      } catch (error) {
        console.error('Error fetching stats', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  if (loading) return <div className="text-gray-500">Loading dashboard...</div>

  const statCards = [
    { title: 'Total Testimonials', value: stats.totalTestimonials, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Visible Testimonials', value: stats.visibleTestimonials, icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Total Inquiries', value: stats.totalInquiries, icon: Inbox, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'New Inquiries', value: stats.newInquiries, icon: Inbox, color: 'text-orange-600', bg: 'bg-orange-50' }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
