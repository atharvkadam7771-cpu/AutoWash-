import React from 'react'

export default function About() {
  const specs = [
    { id: 1, tag: "Tech Stack", title: "React.js Frontend", desc: "Delivers a fast, responsive user interface with immediate dynamic package estimation." },
    
    { id: 3, tag: "Database", title: "MySQL Relational DB", desc: "Persists user bookings, vehicle logs, and package pricing securely with ACID compliance." }
  ]

  return (
    <div>
      <div className="banner-header">
        <h1>About AutoWash System</h1>
        <p>Eliminating physical service station queues through automated doorstep vehicle care.</p>
      </div>

      <div className="section-title">Architecture & Specifications</div>

      <div className="about-grid">
        {specs.map((item) => (
          <div key={item.id} className="info-card">
            <div>
              <span className="badge">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="card-desc" style={{ marginBottom: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}