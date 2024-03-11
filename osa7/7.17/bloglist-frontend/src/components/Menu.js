// Menu.js
import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  return (
    <div className="menu" style={{ backgroundColor: "grey", padding: "10px" }}>
      <Link to="/blogs" style={{ marginRight: "10px" }}>blogs</Link>
      <Link to="/users">users</Link>
      <span style={{ marginLeft: "10px" }}>{user.name} logged in</span>
      <button style={{ marginLeft: "10px" }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Menu;
