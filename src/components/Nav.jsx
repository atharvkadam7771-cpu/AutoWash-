import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <NavLink to="/">AutoWash Portal</NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services & Packages</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
      </nav>
    </header>
  )
}