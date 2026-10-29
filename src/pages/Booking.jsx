import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Booking() {
  const location = useLocation()
  const navigate = useNavigate()

  // Selected package received from Services page
  const selectedPackage = location.state?.package || {
    name: "Quick Foam Wash (Bike)",
    category: "Two-Wheeler",
    price: 249,
    desc: "Pressure wash, active foam shampoo, and tire polish."
  }

  // Booking form state
  const [formData, setFormData] = useState({
    owner_name: '',
    vehicle_number: '',
    mobile_number: '',
    service_address: '',
    service_date: '',
    time_slot: ''
  })

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Submit to Node/Express MySQL Backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.time_slot) {
      setErrorMsg("Please select an available time slot!")
      return
    }

    setLoading(true)

    const bookingPayload = {
      package_name: selectedPackage.name,
      category: selectedPackage.category,
      price: selectedPackage.price,
      owner_name: formData.owner_name,
      vehicle_number: formData.vehicle_number,
      mobile_number: formData.mobile_number,
      service_address: formData.service_address,
      service_date: formData.service_date,
      time_slot: formData.time_slot
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMsg(`Booking confirmed! (Booking ID: ${data.bookingId})`)
        setTimeout(() => {
          navigate('/services')
        }, 1500)
      } else {
        setErrorMsg(data.error || "Failed to book slot.")
      }
    } catch (err) {
      console.error("Connection error:", err)
      setErrorMsg("Unable to reach backend server on port 5000.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Selected Package Details */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#0f172a' }}>{selectedPackage.name}</h2>
        <span className="badge" style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
          {selectedPackage.category}
        </span>
        <p style={{ color: '#64748b', fontSize: '13px', margin: '8px 0' }}>{selectedPackage.desc}</p>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0891b2' }}>₹{selectedPackage.price}</div>
      </div>

      {/* Confirmation and Error Banners */}
      {successMsg && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '6px', fontSize: '14px', fontWeight: '500', border: '1px solid #bbf7d0' }}>
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '14px', fontWeight: '500', border: '1px solid #fecaca' }}>
          ⚠ {errorMsg}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>Owner Full Name</label>
          <input
            type="text"
            name="owner_name"
            required
            placeholder="Enter your name"
            value={formData.owner_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>Vehicle Number (e.g., MH 04 AB 1234)</label>
          <input
            type="text"
            name="vehicle_number"
            required
            placeholder="Enter vehicle registration number"
            value={formData.vehicle_number}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>Mobile Number</label>
          <input
            type="tel"
            name="mobile_number"
            required
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile_number}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>Doorstep Service Address</label>
          <input
            type="text"
            name="service_address"
            required
            placeholder="House/Flat No, Street, Society, Landmark"
            value={formData.service_address}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>Service Date</label>
          <input
            type="date"
            name="service_date"
            required
            value={formData.service_date}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#334155' }}>Time Slot</label>
          <select
            name="time_slot"
            required
            value={formData.time_slot}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
          >
            <option value="">Select Time Slot</option>
            <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM</option>
            <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
            <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
            <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{ flex: 1, padding: '12px', backgroundColor: '#0891b2', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? "Saving to Database..." : "Confirm & Dispatch Technician"}
          </button>
          <button
            type="button"
            onClick={() => navigate('/services')}
            style={{ padding: '12px 20px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}