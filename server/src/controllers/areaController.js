import Area from '../models/Area.js'

export const getAreas = async (req, res, next) => {
  try {
    const areas = await Area.find({}).sort({ createdAt: -1 })
    res.json(areas)
  } catch (error) {
    next(error)
  }
}

export const createArea = async (req, res, next) => {
  try {
    const { title, description } = req.body
    let image = ''

    if (req.file) {
      image = req.file.path
    } else {
      res.status(400)
      throw new Error('Please upload an image file')
    }

    if (!title || !description) {
      res.status(400)
      throw new Error('Please provide both title and description')
    }

    const area = new Area({
      title,
      description,
      image
    })

    const createdArea = await area.save()
    res.status(201).json(createdArea)
  } catch (error) {
    next(error)
  }
}

export const updateArea = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const area = await Area.findById(req.params.id)

    if (area) {
      area.title = title || area.title
      area.description = description || area.description

      if (req.file) {
        area.image = req.file.path
      }

      const updatedArea = await area.save()
      res.json(updatedArea)
    } else {
      res.status(404)
      throw new Error('Area not found')
    }
  } catch (error) {
    next(error)
  }
}

export const deleteArea = async (req, res, next) => {
  try {
    const area = await Area.findById(req.params.id)

    if (area) {
      await area.deleteOne()
      res.json({ message: 'Area removed' })
    } else {
      res.status(404)
      throw new Error('Area not found')
    }
  } catch (error) {
    next(error)
  }
}
