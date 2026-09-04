import express from 'express'
import { getDevelopers, createDeveloper, deleteDeveloper, updateDeveloper } from '../controllers/developerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getDevelopers)
  .post(protect, admin, upload.single('logo'), createDeveloper)

router.route('/:id')
  .put(protect, admin, upload.single('logo'), updateDeveloper)
  .delete(protect, admin, deleteDeveloper)

export default router
