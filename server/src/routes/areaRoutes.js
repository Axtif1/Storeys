import express from 'express'
import { getAreas, createArea, deleteArea, updateArea } from '../controllers/areaController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getAreas)
  .post(protect, admin, upload.single('image'), createArea)

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateArea)
  .delete(protect, admin, deleteArea)

export default router
