import React, { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-wrapper">
      <div className="banner-header">
        <h1>Contact Support</h1>
        <p>Have questions about bulk fleet cleaning or custom detailing? Reach our support team.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="contact-form-card">
          <h3>Send Us a Message</h3>
          {submitted ? (
            <div className="success-note" style={{ marginTop: '12px' }}>
              Thank you! Your message has been sent to our customer care team.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" required />

              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" required />

              <label>Message / Query</label>
              <textarea rows="4" placeholder="How can we help you?" required></textarea>

              <button type="submit" className="btn-cyan" style={{ marginTop: '8px' }}>
                Send Inquiry
              </button>
            </form>
          )}
        </div>

        <div className="contact-info-card">
          <h3>Customer Support Details</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: '10px 0' }}>📞 Phone Support: +91 98201 AUTO1</p>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: '10px 0' }}>✉️ Email: support@autowash.in</p>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: '10px 0' }}>📍 Headquarters: Thane West, Maharashtra</p>
        </div>
      </div>
    </div>
  )
}