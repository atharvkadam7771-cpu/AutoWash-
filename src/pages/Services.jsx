import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bikeImg from '../assets/bike.jpg'
import carImg from '../assets/car.png'
import heroImg from '../assets/truck.png'

const servicePackages = [
  { id: 1, name: "Quick Foam Wash (Bike)", category: "Two-Wheeler", price: 249, desc: "Pressure wash, active foam shampoo application, tire polish, and microfiber dry.", image: bikeImg },
  { id: 2, name: "Complete Detailing (Bike)", category: "Two-Wheeler", price: 499, desc: "Foam wash, engine degreasing, chain lube service, and ceramic wax coat.", image: bikeImg },
  { id: 3, name: "Standard Exterior & Interior (Car)", category: "Four-Wheeler", price: 699, desc: "Full foam body wash, glass cleaning, interior vacuuming, and dashboard polish.", image: carImg },
  { id: 4, name: "Deep Interior Spa (Car)", category: "Four-Wheeler", price: 1299, desc: "Seat shampooing, roof fabric cleaning, AC vent sanitization, and floor mat wash.", image: carImg },
  { id: 5, name: "Ultimate Ceramic Shield Detailing", category: "Four-Wheeler", price: 2499, desc: "Multi-stage paint correction, clay bar treatment, and long-lasting ceramic paint protection.", image: heroImg }
]

export default function Services() {
  const navigate = useNavigate()

  const handleBook = (pkg) => {
    navigate('/booking', { state: { package: pkg } })
  }

  return (
    <div>
      <div className="banner-header">
        <h1>Vehicle Wash & Detailing Packages</h1>
        <p>Choose your vehicle category and preferred service tier for doorstep execution.</p>
      </div>

      <div className="section-title">Available Service Packages ({servicePackages.length})</div>

      <div className="services-grid">
        {servicePackages.map((pkg) => (
          <div key={pkg.id} className="service-card" style={{ padding: '0', overflow: 'hidden' }}>
            <img 
              src={pkg.image} 
              alt={pkg.name} 
              style={{ width: '100%', height: '160px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3>{pkg.name}</h3>
                <span className="badge">{pkg.category}</span>
                <p className="card-desc">{pkg.desc}</p>
              </div>

              <div className="card-footer" style={{ marginTop: 'auto' }}>
                <div className="price-tag">
                  ₹{pkg.price}
                </div>
                <button className="btn-cyan" onClick={() => handleBook(pkg)}>
                  Select & Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}