import Testimonial from '../models/Testimonial.js'

export const getTestimonials = async (req, res, next) => {
  try {
    const isAdmin = req.user && req.user.role === 'admin'
    const filter = isAdmin ? {} : { isVisible: true }
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 })
    res.json(testimonials)
  } catch (error) {
    next(error)
  }
}

export const createTestimonial = async (req, res, next) => {
  try {
    const { name, location, role, content, rating, signature } = req.body
    let image = ''

    if (req.file) {
      image = req.file.path
    }

    if (!name || !location || !content) {
      res.status(400)
      throw new Error('Please provide name, location, and content')
    }

    const testimonial = new Testimonial({
      name,
      location,
      role,
      content,
      rating: rating || 5,
      signature,
      image
    })

    const createdTestimonial = await testimonial.save()
    res.status(201).json(createdTestimonial)
  } catch (error) {
    next(error)
  }
}

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)

    if (testimonial) {
      testimonial.name = req.body.name || testimonial.name
      testimonial.location = req.body.location || testimonial.location
      testimonial.role = req.body.role || testimonial.role
      testimonial.content = req.body.content || testimonial.content
      testimonial.rating = req.body.rating || testimonial.rating
      testimonial.signature = req.body.signature || testimonial.signature
      testimonial.isVisible = req.body.isVisible !== undefined ? req.body.isVisible : testimonial.isVisible

      if (req.file) {
        testimonial.image = req.file.path
      }

      const updatedTestimonial = await testimonial.save()
      res.json(updatedTestimonial)
    } else {
      res.status(404)
      throw new Error('Testimonial not found')
    }
  } catch (error) {
    next(error)
  }
}

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)

    if (testimonial) {
      await testimonial.deleteOne()
      res.json({ message: 'Testimonial removed' })
    } else {
      res.status(404)
      throw new Error('Testimonial not found')
    }
  } catch (error) {
    next(error)
  }
}

export const toggleVisibility = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)

    if (testimonial) {
      testimonial.isVisible = !testimonial.isVisible
      const updatedTestimonial = await testimonial.save()
      res.json(updatedTestimonial)
    } else {
      res.status(404)
      throw new Error('Testimonial not found')
    }
  } catch (error) {
    next(error)
  }
}
