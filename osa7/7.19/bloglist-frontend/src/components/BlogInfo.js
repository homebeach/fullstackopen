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
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:3001/api/blogs/${id}`);
          const data = await response.json();

          if (data) {
            setBlog(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async (event) => {
    event.preventDefault();

    if (id) {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      setBlog(updatedBlog);
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    if (id && commentText) {
      // Assuming you have an API endpoint for adding comments
      const response = await fetch(`http://localhost:3001/api/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(updatedBlog);
        setCommentText(""); // Clear the comment text box
      } else {
        console.error("Failed to add comment");
      }
    }
  };

  return (
    <div className="blog-container" style={blogStyle}>
      <div>{blog.title}</div>
      <div>
        {id ? (
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
            {/* Add comment input box and button */}
            <div>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <ul>
              {blog.comments &&
                blog.comments.map((comment, index) => (
                  <li key={index}>{comment.text}</li>
                ))}
            </ul>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default BlogInfo;
