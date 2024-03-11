import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogInfo = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const { id } = useParams();

  const [blog, setBlog] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Fetch data using the ID
          const response = await fetch(`http://localhost:3001/api/blogs/${id}`);
          const data = await response.json();

          // Update the blog if data is available
          if (data) {
            setBlog(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, [id]);

  const handleLike = async (event) => {
    event.preventDefault();

    // If ID exists, update the blog using the updateBlog hook
    if (id) {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      setBlog(updatedBlog);
    }
  };

  return (
    <div className="blog-container" style={blogStyle}>
      <div>{blog.title}</div>
      <div>
        {id ? (
        // Display existing blog if ID exists
          <>
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
            {/* Display comments */}
            <h4>Comments:</h4>
            <ul>
              {blog.comments &&
              blog.comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
            </ul>
          </>
        ) : (
        // Display loading message if ID doesn't exist
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default BlogInfo;
