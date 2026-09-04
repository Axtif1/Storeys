import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Trash2, Edit, Plus, Loader, X } from 'lucide-react'

import { toast } from 'react-toastify'

const AdminDevelopers = () => {
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  
  // Form State
  const [currentDeveloper, setCurrentDeveloper] = useState(null)
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState(null)
  
  const fileInputRef = useRef(null)
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const fetchDevelopers = async () => {
    try {
      const { data } = await axios.get(`${api}/api/developers`)
      setDevelopers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDevelopers()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this developer logo?')) {
      setActionLoading(true)
      setDeletingId(id)
      try {
        const token = localStorage.getItem('adminToken')
        await axios.delete(`${api}/api/developers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchDevelopers()
        toast.success('Developer deleted successfully')
      } catch {
        toast.error('Failed to delete')
      } finally {
        setActionLoading(false)
        setDeletingId(null)
      }
    }
  }

  const openEditModal = (dev) => {
    setCurrentDeveloper(dev)
    setNewName(dev.name)
    setNewImage(null)
    setShowModal(true)
  }

  const openAddModal = () => {
    setCurrentDeveloper(null)
    setNewName('')
    setNewImage(null)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newName) {
      toast.error('Please provide a name.')
      return
    }
    if (!currentDeveloper && !newImage) {
      toast.error('Please select an image file.')
      return
    }

    const formData = new FormData()
    formData.append('name', newName)
    if (newImage) formData.append('logo', newImage)

    setIsUploading(true)
    setActionLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      if (currentDeveloper) {
        await axios.put(`${api}/api/developers/${currentDeveloper._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Developer updated successfully')
      } else {
        await axios.post(`${api}/api/developers`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        })
        toast.success('Developer created successfully')
      }
      
      setShowModal(false)
      setNewName('')
      setNewImage(null)
      setCurrentDeveloper(null)
      fetchDevelopers()
    } catch (err) {
      toast.error('Failed to save developer')
      console.error(err)
    } finally {
      setIsUploading(false)
      setActionLoading(false)
    }
  }

  if (loading) return <div className="text-gray-500">Loading developers...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Developers</h1>
        <button 
          onClick={openAddModal}
          disabled={actionLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            actionLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand-blue text-white hover:bg-blue-600'
          }`}
        >
          <Plus className="w-4 h-4" /> Add Developer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600">Logo</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {developers.map(dev => (
              <tr key={dev._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <div className="w-[120px] h-[60px] flex items-center justify-center bg-white border border-gray-200 rounded p-2">
                     <img 
                       src={dev.logo.startsWith('/') ? `${api}${dev.logo}` : dev.logo} 
                       alt={dev.name} 
                       className="max-w-full max-h-full object-contain" 
                     />
                  </div>
                </td>
                <td className="p-4 text-sm font-medium text-gray-900">{dev.name}</td>
                <td className="p-4 flex gap-2 items-center h-full pt-8">
                  <button 
                    onClick={() => openEditModal(dev)}
                    disabled={actionLoading} 
                    className="p-1.5 text-gray-500 hover:text-gray-900 rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50" 
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(dev._id)}
                    disabled={actionLoading} 
                    className="p-1.5 text-red-500 hover:text-white rounded bg-red-50 hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center justify-center" 
                    title="Delete"
                  >
                    {deletingId === dev._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
            {developers.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">No developers found.</td>
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
              {currentDeveloper ? 'Edit Developer' : 'Add New Developer'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Developer Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. Emaar"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo Image {currentDeveloper && '(Leave empty to keep current)'}
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
                  accept="image/*"
                  required={!currentDeveloper}
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
                  {isUploading ? (currentDeveloper ? 'Saving...' : 'Uploading...') : (currentDeveloper ? 'Save Changes' : 'Upload Developer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDevelopers
