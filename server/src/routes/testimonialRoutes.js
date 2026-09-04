import express from 'express'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, toggleVisibility } from '../controllers/testimonialController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const setOptionalUser = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    } catch {

    }
  }
  next()
}

router.route('/')
  .get(setOptionalUser, getTestimonials)
  .post(protect, admin, upload.single('image'), createTestimonial)

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateTestimonial)
  .delete(protect, admin, deleteTestimonial)

router.route('/:id/visibility')
  .patch(protect, admin, toggleVisibility)

export default router
