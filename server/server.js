import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { connectDB } from './src/config/db.js'
import User from './src/models/User.js'

import authRoutes from './src/routes/authRoutes.js'
import testimonialRoutes from './src/routes/testimonialRoutes.js'
import inquiryRoutes from './src/routes/inquiryRoutes.js'
import developerRoutes from './src/routes/developerRoutes.js'
import areaRoutes from './src/routes/areaRoutes.js'
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js'
import path from 'path'


// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())

// Serve uploads statically
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/developers', developerRoutes)
app.use('/api/areas', areaRoutes)

// Error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
  
  // Seed Default Admin User
  try {
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (adminEmail && adminPassword) {
      const adminExists = await User.findOne({ email: adminEmail })
      if (!adminExists) {
        await User.create({
          name: 'Admin',
          email: adminEmail,
          password: adminPassword,
          role: 'admin'
        })
        console.log(`Default admin user seeded (${adminEmail})`)
      }
    } else {
      console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not found in .env. Skipping admin seeding.')
    }
  } catch (error) {
    console.error('Error seeding admin user:', error.message)
  }
})
