import React from "react";
import { useGetSingleUser } from "../services/users";
import { useParams } from "react-router-dom";


const User = () => {

  const { id } = useParams(); // Extract userId from URL parameter

  const { data: user, isLoading, isError } = useGetSingleUser(id);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (isError) {
    return <p>Error fetching user data</p>;
  }

  return (
    <div>
      <p>I am user</p>
      <h2>{user.name}</h2>
      <h3>Blogs created:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
