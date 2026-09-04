import mongoose from 'mongoose'

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const Developer = mongoose.model('Developer', developerSchema)
export default Developer
