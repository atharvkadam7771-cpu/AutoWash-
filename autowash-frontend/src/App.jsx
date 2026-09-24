import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import BookService from './pages/BookService';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

function Navigation() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    // Redirect without popup, sending a success message
    navigate('/login', { state: { redirectMessage: 'You have been successfully logged out.', isError: false } });
  };

  const navLinkStyle = { color: 'white', textDecoration: 'none', border: '1px solid white', padding: '5px 15px', borderRadius: '4px', marginLeft: '10px', cursor: 'pointer', background: 'transparent' };

  return (
    <div style={{ backgroundColor: '#213a8f', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ color: 'white', margin: 0 }}>AutoWash Booking Portal</h2>
      <div>
        <Link to="/home" style={navLinkStyle}>Home</Link>
        <Link to="/about" style={navLinkStyle}>About</Link>
        <Link to="/contact" style={navLinkStyle}>Contact</Link>
        
        {loggedInUser ? (
          <button onClick={handleLogout} style={navLinkStyle}>Logout ({loggedInUser})</button>
        ) : (
          <Link to="/login" style={navLinkStyle}>Login / Sign Up</Link>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<BookService />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}