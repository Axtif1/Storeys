import Developer from '../models/Developer.js'

export const getDevelopers = async (req, res, next) => {
  try {
    const developers = await Developer.find({}).sort({ createdAt: -1 })
    res.json(developers)
  } catch (error) {
    next(error)
  }
}

export const createDeveloper = async (req, res, next) => {
  try {
    const { name } = req.body
    let logo = ''

    if (req.file) {
      logo = req.file.path
    } else {
      res.status(400)
      throw new Error('Please upload an image file')
    }

    if (!name) {
      res.status(400)
      throw new Error('Please add a name')
    }

    const developer = new Developer({
      name,
      logo
    })

    const createdDeveloper = await developer.save()
    res.status(201).json(createdDeveloper)
  } catch (error) {
    next(error)
  }
}

export const updateDeveloper = async (req, res, next) => {
  try {
    const { name } = req.body
    const developer = await Developer.findById(req.params.id)

    if (developer) {
      developer.name = name || developer.name

      if (req.file) {
        developer.logo = req.file.path
      }

      const updatedDeveloper = await developer.save()
      res.json(updatedDeveloper)
    } else {
      res.status(404)
      throw new Error('Developer not found')
    }
  } catch (error) {
    next(error)
  }
}

export const deleteDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id)

    if (developer) {
      await developer.deleteOne()
      res.json({ message: 'Developer removed' })
    } else {
      res.status(404)
      throw new Error('Developer not found')
    }
  } catch (error) {
    next(error)
  }
}
