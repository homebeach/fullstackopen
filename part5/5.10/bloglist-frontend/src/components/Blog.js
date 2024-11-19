import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const blogFormRef = useRef();

  const handleLike = (event) => {
    event.preventDefault();

    blog.likes = blog.likes + 1;
    updateBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title}
      </div>

      <Togglable buttonLabel="view" buttonHideLabel="hide" ref={blogFormRef}>
        <div> 
          {blog.author}<br/>
          {blog.url}<br/>
          {blog.likes} <button onClick={handleLike}>like</button><br/>
          {blog.user && blog.user.name}
        </div>
      </Togglable>
    </div>  
  );
};

export default Blog;
