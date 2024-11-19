import React, { useState } from 'react';

const BlogForm = ({createBlog, user}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id,
    };

    createBlog(blogObject);

  };

  return (
    <form onSubmit={addBlog}>
      <input value={title} onChange={handleTitleChange} />
      <input value={author} onChange={handleAuthorChange} />
      <input value={url} onChange={handleUrlChange} />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
