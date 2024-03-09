import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Blog from "./components/Blog";
import User from "./components/User";
import { useGetAllBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from "./services/blogs";
import { useGetAllUsers } from "./services/users";
import { useAuth } from "./AuthContext";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import "./index.css";

const App = () => {
  const blogFormRef = useRef();
  const { user, setUser, clearUser } = useAuth();
  const { data: users } = useGetAllUsers();
  const { data: blogs, isError, error } = useGetAllBlogs();
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
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
      clearUser();
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
    <Router>
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
            <div>
              <Routes>
                <Route path="/" element={<UserList users={users} />} />
                <Route path="/user/:id" element={<User />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

const UserList = ({ users, onClick }) => (
  <>
    <h1>Users</h1>
    {users && users.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div>
                  <Link to={`/user/${user.id}`} onClick={() => onClick(user)}>
                    {user.username}
                  </Link>
                </div>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No users available</p>
    )}
  </>
);

export default App;
