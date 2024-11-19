import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import {  useGetAllBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from "./services/blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import "./index.css";

const App = () => {
  const blogFormRef = useRef();

  const { data: blogs, isError, error } = useGetAllBlogs();
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const [note, setNote] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  function displayNoteWithTimeout(message) {
    setNote(<div className="note">{message}</div>);
    setTimeout(() => setNote(""), 5000);
  }

  function displayErrorWithTimeout(message) {
    setErrorMessage(<div className="error">{message}</div>);
    setTimeout(() => setErrorMessage(""), 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      displayErrorWithTimeout("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      blogService.setToken(null);
      window.localStorage.clear();
      setUser(null);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("logout failed");
    }
  };

  const createBlog = async (blogObject) => {
    try {
      await createBlogMutation.mutateAsync(blogObject);
      displayNoteWithTimeout(`A blog named ${blogObject.title} added.`);
    } catch (error) {
      displayErrorWithTimeout("Failed to create a blog");
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      console.log("update blog");
      console.log(blogObject);

      await updateBlogMutation.mutate({ id: blogObject.id, newObject: blogObject });
      displayNoteWithTimeout(`A blog named ${blogObject.title} updated.`);
    } catch (error) {
      displayErrorWithTimeout("Failed to update the blog");
    }
  };

  const handleDelete = async (blogObject) => {
    try {
      await deleteBlogMutation.mutateAsync(blogObject.id);
      displayNoteWithTimeout(`A blog named ${blogObject.title} deleted.`);
    } catch (error) {
      displayErrorWithTimeout("Failed to delete the blog");
    }
  };

  return (
    <div>
      {isError && <div className="error">{error.message}</div>}
      {note}
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable id="new-blog" buttonLabel="new blog" buttonHideLabel="cancel" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} user={user} />
          </Togglable>
          {blogs &&
            blogs.map((blog) => (
              <div key={blog.id}>
                <Blog blog={blog} updateBlog={updateBlog} />
                <button onClick={() => handleDelete(blog)}>delete</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
