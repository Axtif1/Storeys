import mongoose from 'mongoose'

const areaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const Area = mongoose.model('Area', areaSchema)
export default Area
