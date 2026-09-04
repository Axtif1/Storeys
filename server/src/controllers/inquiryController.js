import Inquiry from '../models/Inquiry.js'

export const createInquiry = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, description } = req.body
    const inquiry = new Inquiry({ firstName, lastName, email, phone, description })
    const createdInquiry = await inquiry.save()
    res.status(201).json(createdInquiry)
  } catch (error) {
    next(error)
  }
}

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 })
    res.json(inquiries)
  } catch (error) {
    next(error)
  }
}

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)

    if (inquiry) {
      inquiry.status = req.body.status || inquiry.status
      const updatedInquiry = await inquiry.save()
      res.json(updatedInquiry)
    } else {
      res.status(404)
      throw new Error('Inquiry not found')
    }
  } catch (error) {
    next(error)
  }
}

export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)

    if (inquiry) {
      await inquiry.deleteOne()
      res.json({ message: 'Inquiry removed' })
    } else {
      res.status(404)
      throw new Error('Inquiry not found')
    }
  } catch (error) {
    next(error)
  }
}
