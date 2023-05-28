const express = require('express')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.use(express.json())

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response) => {

  const { title, author, url, __v, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  try {
    const blog = new Blog({
      title,
      author,
      url,
      __v,
      likes: likes || 0
    });
  
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation error
      response.status(400).json({ error: error.message });
    } else {
      // Handle other types of errors
      response.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {

  const { title, author, url, __v, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const blog = {
    title,
    author,
    url,
    __v,
    likes: likes || 0
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.status(204).json(updatedBlog)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = blogsRouter