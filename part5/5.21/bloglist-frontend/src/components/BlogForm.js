import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id,
    }

    createBlog(blogObject)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>title:</label>
        <input
          id="title"
          aria-label="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>author:</label>
        <input
          id="author"
          aria-label="author"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          id="url"
          aria-label="url"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogForm