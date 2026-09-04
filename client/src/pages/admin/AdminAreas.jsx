import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Trash2, Plus, X, Loader, Edit } from 'lucide-react'

import { toast } from 'react-toastify'

const AdminAreas = () => {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  
  // Form State
  const [currentArea, setCurrentArea] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState(null)
  
  const fileInputRef = useRef(null)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

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

  useEffect(() => {
    fetchAreas()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this area?')) {
      setActionLoading(true)
      setDeletingId(id)
      try {
        const token = localStorage.getItem('adminToken')
        await axios.delete(`${api}/api/areas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchAreas()
        toast.success('Area deleted successfully')
      } catch {
        toast.error('Failed to delete')
      } finally {
        setActionLoading(false)
        setDeletingId(null)
      }
    }
  }

  const openEditModal = (area) => {
    setCurrentArea(area)
    setNewTitle(area.title)
    setNewDescription(area.description)
    setNewImage(null)
    setShowModal(true)
  }

  const openAddModal = () => {
    setCurrentArea(null)
    setNewTitle('')
    setNewDescription('')
    setNewImage(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTitle || !newDescription) {
      toast.error('Please provide a title and description.')
      return
    }
    if (!currentArea && !newImage) {
      toast.error('Please select an image file.')
      return
    }

    const formData = new FormData()
    formData.append('title', newTitle)
    formData.append('description', newDescription)
    if (newImage) formData.append('image', newImage)

    setIsUploading(true)
    setActionLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      
      if (currentArea) {
        await axios.put(`${api}/api/areas/${currentArea._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Area updated successfully')
      } else {
        await axios.post(`${api}/api/areas`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Area created successfully')
      }
      
      setShowModal(false)
      setNewTitle('')
      setNewDescription('')
      setNewImage(null)
      setCurrentArea(null)
      fetchAreas()
    } catch (err) {
      toast.error('Failed to save area')
      console.error(err)
    } finally {
      setIsUploading(false)
      setActionLoading(false)
    }
  }

  if (loading) return <div className="text-gray-500">Loading areas...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Explore Dubai Areas</h1>
        <button 
          onClick={openAddModal}
          disabled={actionLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            actionLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand-blue text-white hover:bg-blue-600'
          }`}
        >
          <Plus className="w-4 h-4" /> Add Area
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600 w-1/4">Image</th>
              <th className="p-4 text-sm font-semibold text-gray-600 w-1/4">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-600 w-2/4">Description</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {areas.map(area => (
              <tr key={area._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <div className="w-[120px] h-[80px] flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                     <img 
                       src={area.image.startsWith('/') ? `${api}${area.image}` : area.image} 
                       alt={area.title} 
                       className="w-full h-full object-cover" 
                     />
                  </div>
                </td>
                <td className="p-4 text-sm font-medium text-gray-900 align-top pt-8">{area.title}</td>
                <td className="p-4 text-sm text-gray-600 align-top pt-8">{area.description}</td>
                <td className="p-4 flex gap-2 items-center align-top pt-8">
                  <button 
                    onClick={() => openEditModal(area)}
                    disabled={actionLoading} 
                    className="p-1.5 text-gray-500 hover:text-gray-900 rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50" 
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(area._id)} 
                    disabled={actionLoading}
                    className="p-1.5 text-red-500 hover:text-white rounded bg-red-50 hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center justify-center" 
                    title="Delete"
                  >
                    {deletingId === area._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
            {areas.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No areas found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {currentArea ? 'Edit Area' : 'Add New Area'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. Palm Jumeirah"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue h-24 resize-none"
                  placeholder="Short description of the area..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image {currentArea && '(Leave empty to keep current)'}
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
                  accept="image/*"
                  required={!currentArea}
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
                  {isUploading ? (currentArea ? 'Saving...' : 'Uploading...') : (currentArea ? 'Save Changes' : 'Upload Area')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAreas
