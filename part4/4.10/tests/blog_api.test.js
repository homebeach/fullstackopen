const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  try {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
  } catch (error) {
    console.log(error)
  }
})

test('all blogs are returned', async () => {
  try {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  } catch (error) {
    console.log(error)
  }
})

test('check if id field is defined for each blog', () => {
  initialBlogs.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('test adding blog entry', async () => {
  const blogEntry = {
    title: 'Test',
    author: 'Test',
    url: 'https://test.com/',
    likes: 0,
    __v: 0
  }

  try {

    await api
      .post('/api/blogs')
      .send(blogEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(response.status).toBe(200)
    expect(blogs).toHaveLength(initialBlogs.length + 1)

    const addedBlog = blogs.find(blog => blog.title === 'Test')

    expect(addedBlog).toBeDefined()
  } catch (error) {
    console.log(error)
  }
})


afterAll(async () => {
  await mongoose.connection.close()
})