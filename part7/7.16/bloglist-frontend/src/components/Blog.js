import { useRef } from "react";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogFormRef = useRef();

  const handleLike = (event) => {
    event.preventDefault();

    blog.likes = blog.likes + 1;
    updateBlog(blog);
  };

  return (
    <div className="blog-container" style={blogStyle}>
      <Link to={`/blog/${blog.id}`}>
        <div>{blog.title}</div>
      </Link>

      <Togglable buttonLabel="view" buttonHideLabel="hide" ref={blogFormRef}>
        <div>
          {blog.author}
          <br />
          {blog.url}
          <br />
          {blog.likes}{" "}
          <button id="like" onClick={handleLike}>
            like
          </button>
          <br />
          {blog.user && blog.user.name}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
