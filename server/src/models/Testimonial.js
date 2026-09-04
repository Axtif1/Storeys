import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  image: { type: String },
  signature: { type: String },
  isVisible: { type: Boolean, default: true }
}, {
  timestamps: true
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema)
export default Testimonial
