const express = require('express')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.use(express.json())

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {

  const { title, author, url, __v, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    __v,
    likes: likes || 0
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter