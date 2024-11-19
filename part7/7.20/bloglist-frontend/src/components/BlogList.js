import React from "react";
import { Button } from "react-bootstrap";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogList = ({ blogs, createBlog, user, updateBlog, handleDelete, blogFormRef }) => (
  <>
    <Togglable id="new-blog" buttonLabel="new blog" buttonHideLabel="cancel" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} user={user} />
    </Togglable>
    {blogs && blogs.map((blog, index) => (
      <div key={blog.id} style={{ backgroundColor: index % 2 === 1 ? "#f0f0f0" : "inherit" }}>
        <Blog blog={blog} updateBlog={updateBlog} />
        <Button variant="danger" onClick={() => handleDelete(blog)}>delete</Button>
      </div>
    ))}
  </>
);

export default BlogList;
