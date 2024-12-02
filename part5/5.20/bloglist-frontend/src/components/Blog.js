import { useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogFormRef = useRef()

  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateBlog(updatedBlog)
  }

  return (
    <div className="blog-container" style={blogStyle}>
      <div>
        {blog.title}
      </div>

      <Togglable buttonLabel="view" buttonHideLabel="hide" ref={blogFormRef}>
        <div>
          {blog.author}<br/>
          {blog.url}<br/>
          {blog.likes} <button id="like" onClick={handleLike}>like</button><br/>
          {blog.user && blog.user.name}
        </div>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired,
  updateBlog: PropTypes.func
}

export default Blog