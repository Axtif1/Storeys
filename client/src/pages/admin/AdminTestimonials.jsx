import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, Edit, Eye, EyeOff, Plus, X, Loader } from 'lucide-react'

import { toast } from 'react-toastify'

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  
  // Form State
  const [currentTestimonial, setCurrentTestimonial] = useState(null)
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [newSignature, setNewSignature] = useState('')
  const [newImage, setNewImage] = useState(null)
  
  const fileInputRef = React.useRef(null)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const { data } = await axios.get(`${api}/api/testimonials`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTestimonials(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const toggleVisibility = async (id) => {
    setActionLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      await axios.patch(`${api}/api/testimonials/${id}/visibility`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTestimonials()
      toast.success('Visibility updated')
    } catch {
      toast.error('Failed to toggle visibility')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setActionLoading(true)
      setDeletingId(id)
      try {
        const token = localStorage.getItem('adminToken')
        await axios.delete(`${api}/api/testimonials/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchTestimonials()
        toast.success('Testimonial deleted successfully')
      } catch {
        toast.error('Failed to delete')
      } finally {
        setActionLoading(false)
        setDeletingId(null)
      }
    }
  }

  const openEditModal = (testimonial) => {
    setCurrentTestimonial(testimonial)
    setNewName(testimonial.name)
    setNewLocation(testimonial.location)
    setNewContent(testimonial.content)
    setNewRating(testimonial.rating)
    setNewSignature(testimonial.signature || '')
    setNewImage(null)
    setShowModal(true)
  }

  const openAddModal = () => {
    setCurrentTestimonial(null)
    setNewName('')
    setNewLocation('')
    setNewContent('')
    setNewRating(5)
    setNewSignature('')
    setNewImage(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newName || !newLocation || !newContent) {
      toast.error('Please provide name, location, and content.')
      return
    }

    const formData = new FormData()
    formData.append('name', newName)
    formData.append('location', newLocation)
    formData.append('content', newContent)
    formData.append('rating', newRating)
    if (newSignature) formData.append('signature', newSignature)
    if (newImage) formData.append('image', newImage)

    setIsUploading(true)
    setActionLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      if (currentTestimonial) {
        await axios.put(`${api}/api/testimonials/${currentTestimonial._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Testimonial updated successfully')
      } else {
        await axios.post(`${api}/api/testimonials`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Testimonial created successfully')
      }
      
      setShowModal(false)
      setNewName('')
      setNewLocation('')
      setNewContent('')
      setNewRating(5)
      setNewSignature('')
      setNewImage(null)
      setCurrentTestimonial(null)
      fetchTestimonials()
    } catch (err) {
      toast.error('Failed to save testimonial')
      console.error(err)
    } finally {
      setIsUploading(false)
      setActionLoading(false)
    }
  }

  if (loading) return <div className="text-gray-500">Loading testimonials...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
        <button 
          onClick={openAddModal}
          disabled={actionLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            actionLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand-blue text-white hover:bg-blue-600'
          }`}
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Location</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Rating</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Visibility</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  {t.image ? (
                    <img 
                      src={t.image.startsWith('/') ? `${api}${t.image}` : t.image} 
                      alt={t.name} 
                      className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                      N/A
                    </div>
                  )}
                </td>
                <td className="p-4 text-sm font-medium text-gray-900">{t.name}</td>
                <td className="p-4 text-sm text-gray-600">{t.location}</td>
                <td className="p-4 text-sm text-gray-600">{t.rating}/5</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${t.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {t.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {t.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button 
                    onClick={() => toggleVisibility(t._id)} 
                    disabled={actionLoading}
                    className="p-1.5 text-gray-500 hover:text-blue-600 rounded bg-gray-100 hover:bg-blue-50 transition-colors disabled:opacity-50" 
                    title="Toggle Visibility"
                  >
                    {t.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => openEditModal(t)}
                    disabled={actionLoading}
                    className="p-1.5 text-gray-500 hover:text-gray-900 rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50" 
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(t._id)} 
                    disabled={actionLoading}
                    className="p-1.5 text-red-500 hover:text-white rounded bg-red-50 hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center justify-center" 
                    title="Delete"
                  >
                    {deletingId === t._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">No testimonials found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative my-8">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {currentTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location / Subtitle</label>
                  <input 
                    type="text" 
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content</label>
                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue h-32 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signature Font (Optional)</label>
                  <input 
                    type="text" 
                    value={newSignature}
                    onChange={(e) => setNewSignature(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                    placeholder="e.g. John D."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="5"
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portrait Image {currentTestimonial ? '(Leave empty to keep current)' : '(Optional)'}
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
                  accept="image/*"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isUploading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand-blue text-white hover:bg-blue-600'
                  }`}
                >
                  {isUploading ? (currentTestimonial ? 'Saving...' : 'Uploading...') : (currentTestimonial ? 'Save Changes' : 'Add Testimonial')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTestimonials
