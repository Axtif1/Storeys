import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, Loader } from 'lucide-react'

import { toast } from 'react-toastify'

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const { data } = await axios.get(`${api}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setInquiries(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.patch(`${api}/api/inquiries/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchInquiries()
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setActionLoading(true)
      setDeletingId(id)
      try {
        const token = localStorage.getItem('adminToken')
        await axios.delete(`${api}/api/inquiries/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchInquiries()
        toast.success('Inquiry deleted successfully')
      } catch {
        toast.error('Failed to delete inquiry')
      } finally {
        setActionLoading(false)
        setDeletingId(null)
      }
    }
  }

  if (loading) return <div className="text-gray-500">Loading inquiries...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Manage Inquiries</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600">Client</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Contact</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Message</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inq => (
              <tr key={inq._id} className="border-b border-gray-50 hover:bg-gray-50 align-top">
                <td className="p-4">
                  <p className="text-sm font-medium text-gray-900">{inq.firstName} {inq.lastName}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-900">{inq.email}</p>
                  <p className="text-xs text-gray-500 mt-1">{inq.phone}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-600 max-w-xs truncate" title={inq.description}>{inq.description}</p>
                </td>
                <td className="p-4">
                  <select 
                    value={inq.status}
                    onChange={(e) => updateStatus(inq._id, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded border outline-none cursor-pointer ${
                      inq.status === 'new' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
                      inq.status === 'contacted' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
                      'bg-green-50 border-green-200 text-green-700'
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleDelete(inq._id)} 
                    disabled={actionLoading}
                    className="p-1.5 text-red-500 hover:text-white rounded bg-red-50 hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center justify-center" 
                    title="Delete"
                  >
                    {deletingId === inq._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">No inquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminInquiries
