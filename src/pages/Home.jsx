import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div className="hero-card">
        <span className="hero-pill">DOORSTEP VEHICLE CARE</span>
        <h1>Professional Car & Bike Wash at Your Doorstep</h1>
        <p>
          Skip physical service stations and waiting lines. Select your vehicle type, choose an eco-friendly detailing package, and schedule expert technicians at your home or office.
        </p>
        <div className="hero-actions">
          <Link to="/services" className="btn-cyan">Book Wash Now</Link>
          <Link to="/contact" className="btn-secondary">Contact Support</Link>
        </div>
      </div>

      <div className="section-title">Why Choose AutoWash?</div>
      <div className="about-grid">
        <div className="info-card">
          <h3>100% Water-Saving Eco Wash</h3>
          <p className="card-desc">Advanced high-pressure steam and micro-fiber waterless techniques protect your vehicle's paint.</p>
        </div>
        <div className="info-card">
          <h3>Verified Expert Technicians</h3>
          <p className="card-desc">Background-verified detailing professionals equipped with professional-grade cleaning products.</p>
        </div>
       <div className="info-card">
          <h3>Doorstep Convenience & Safety</h3>
          <p className="card-desc">Save hours of travel and waiting time while ensuring your car and bike receive professional care right at your doorstep.</p>
        </div>
      </div>
    </div>
  )
}