import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'closed'],
    default: 'new' 
  }
}, {
  timestamps: true
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)
export default Inquiry
