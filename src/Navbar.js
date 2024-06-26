import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';
import logo from './logo.jpg';

const NavbarComponent = () => {
  const handleNavLinkClick = (path) => {
    window.location.href = path;
  };

  return (
    <Navbar bg="secondary" variant="dark" expand="lg" fixed="top" className="navbar-custom">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="navbar-title">SIPIS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-item">Home</Nav.Link>
            <Nav.Link as={Link} to="/map" className="nav-item" onClick={() => handleNavLinkClick('/map')}>Map</Nav.Link>
            <Nav.Link as={Link} to="/reportgeneration" className="nav-item" onClick={() => handleNavLinkClick('/reportgeneration')}>Data Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item">About</Nav.Link>
            <Nav.Link as={Link} to="/help" className="nav-item">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
