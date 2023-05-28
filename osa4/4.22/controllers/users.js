const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password } = request.body

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const passwordHash = bcrypt.hashSync(password, salt)

    if (!username || !password) {
      return response.status(400).json({ error: 'Username and password are required' })
    }

    if (username.length < 3 || password.length < 3) {
      return response.status(400).json({ error: 'Username and password must be at least 3 characters long' })
    }
    
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    response.status(500).json({ error: 'An unexpected error occurred' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter