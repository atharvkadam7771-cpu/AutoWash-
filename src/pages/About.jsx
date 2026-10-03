import React from 'react'

export default function About() {
  const specs = [
    { 
      id: 1, 
      tag: "Platform", 
      title: "What is AutoWash?", 
      desc: "AutoWash is an on-demand doorstep vehicle wash and detailing system designed to eliminate the need to visit physical service centers or wait in long queues." 
    },
    { 
      id: 2, 
      tag: "Convenience", 
      title: "Doorstep Execution", 
      desc: "Users can easily select their vehicle type (car or bike), choose a professional cleaning package, and schedule a convenient time slot right at their home or office." 
    },
    { 
      id: 3, 
      tag: "Technology", 
      title: "Full-Stack Architecture", 
      desc: "Built with a fast, dynamic React.js frontend and supported by robust service workflows to ensure smooth appointment booking and management." 
    }
  ]

  return (
    <div>
      <div className="banner-header">
        <h1>About AutoWash System</h1>
        <p>Simplifying vehicle care and detailing through on-demand doorstep scheduling.</p>
      </div>

      <div className="section-title">System Overview & Highlights</div>

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