import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/blogs">blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">users</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item>
            {user ? (
              <Nav.Link>{user.name} logged in</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">login</Nav.Link>
            )}
          </Nav.Item>
          <Nav.Item>
            {user && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
