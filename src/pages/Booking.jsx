import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function Booking() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedPkg = location.state?.package

  const [confirmed, setConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    ownerName: '',
    vehicleNumber: '',
    phone: '',
    address: '',
    date: '',
    slot: ''
  })

  if (!selectedPkg) {
    return (
      <div className="banner-header">
        <h2>No Package Selected</h2>
        <p>Please choose a cleaning package first before setting up an appointment.</p>
        <Link to="/services" className="btn-cyan" style={{ marginTop: '16px' }}>
          View Services
        </Link>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In full-stack architecture, this data is sent via fetch() to your Java Servlet backend
    setConfirmed(true)
  }

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div className="banner-header">
        <h1>Confirm Doorstep Appointment</h1>
        <p>Provide your vehicle and location details for technician dispatch.</p>
      </div>

      <div className="booking-card">
        <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <h3>{selectedPkg.name}</h3>
          <span className="badge">{selectedPkg.category}</span>
          <p className="card-desc" style={{ margin: '8px 0 0 0' }}>{selectedPkg.desc}</p>
          <p className="price-tag" style={{ marginTop: '10px' }}>₹{selectedPkg.price}</p>
        </div>

        {confirmed ? (
          <div>
            <div className="success-note">
              Appointment successfully booked for {formData.ownerName} ({formData.vehicleNumber}) on {formData.date} at {formData.slot}!
            </div>
            <button className="btn-secondary" style={{ width: '100%', marginTop: '10px' }} onClick={() => navigate('/services')}>
              Book Another Service
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <label>Owner Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              required 
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            />

            <label>Vehicle Number (e.g., MH 04 AB 1234)</label>
            <input 
              type="text" 
              placeholder="Enter vehicle registration number" 
              required 
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
            />

            <label>Mobile Number</label>
            <input 
              type="tel" 
              placeholder="Enter 10-digit mobile number" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <label>Doorstep Service Address</label>
            <input 
              type="text" 
              placeholder="House/Flat No, Street, Society, Landmark" 
              required 
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <label>Service Date</label>
            <input 
              type="date" 
              required 
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <label>Time Slot</label>
            <select 
              required 
              value={formData.slot}
              onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
            >
              <option value="" disabled>Select Time Slot</option>
              <option>08:00 AM - 10:00 AM</option>
              <option>10:00 AM - 12:00 PM</option>
              <option>02:00 PM - 04:00 PM</option>
              <option>04:00 PM - 06:00 PM</option>
            </select>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button type="submit" className="btn-cyan" style={{ flex: 1 }}>
                Confirm & Dispatch Technician
              </button>
              <button type="button" className="btn-secondary" onClick={() => navigate('/services')}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}