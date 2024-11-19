const express = require('express')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.use(express.json())

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const { title, author, url, likes } = request.body

    if (!title || !url) {
      return response.status(400).json({ error: 'Title and URL are required' })
    }

    const firstUser = await User.findOne();

    if (!firstUser) {
      return response.status(400).json({ error: 'No users found in the database' });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: firstUser._id
    });

    const savedBlog = await blog.save();

    firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
    await firstUser.save()

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', ['username', 'name', 'blogs']);

    response.status(201).json(populatedBlog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message });
    } else {
      response.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

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