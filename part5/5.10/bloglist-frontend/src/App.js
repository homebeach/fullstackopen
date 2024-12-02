import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  function displayNoteWithTimeout(message) {
    setNote(<div className="note">{message}</div>);
    setTimeout(() => setNote(''), 5000);
  }

  function displayErrorWithTimeout(message) {
    setError(<div className="error">{message}</div>);
    setTimeout(() => setError(''), 5000);
  }

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
      displayErrorWithTimeout('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const createBlog = (blogObject) => {

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      displayNoteWithTimeout(`A blog named ${returnedBlog.title} added.`);
    });
  };

  const updateBlog = (blogObject) => {

    blogService.update(blogObject.id, blogObject).then((returnedBlog) => {

      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
      displayNoteWithTimeout(`A blog named ${blogObject.title} updated.`);
    });
  };

  const blogFormRef = useRef()

  return (
    <div>
      {error}
      {note}
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="new blog" buttonHideLabel="cancel" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} user={user} />
        </Togglable>

          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      }

    </div>
  )
}

export default App