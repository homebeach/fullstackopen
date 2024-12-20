import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLogout = async (event) => {

    try {
      blogService.setToken(null)
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>title:</label>
        <input value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>author:</label>
        <input value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        <label>url:</label>
        <input value={url} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        {blogForm()}
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }


    </div>
  )
}

export default App