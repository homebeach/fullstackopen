import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const blogFormRef = useRef();

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title}
      </div>

      <Togglable buttonLabel="view" buttonHideLabel="hide" ref={blogFormRef}>
        <div> 
          {blog.author}<br/>
          {blog.url}<br/>
          {blog.likes} <button>like</button><br/>
        </div>
      </Togglable>
    </div>  
  );
};

export default Blog;
