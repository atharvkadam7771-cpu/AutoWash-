import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '30px' }}>
        <h2 style={{ color: '#213a8f', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '15px' }}>About AutoWash</h2>
        <p style={{ lineHeight: '1.6', color: '#555', fontSize: '16px' }}>
          Welcome to AutoWash Detailing! We are a premium on-demand doorstep vehicle wash and detailing service. 
          Our mission is to provide top-quality cleaning for your bikes, sedans, and SUVs without you having to leave your home or office.
        </p>
        <p style={{ lineHeight: '1.6', color: '#555', fontSize: '16px' }}>
          This platform is designed to make booking vehicle wash appointments quick and easy. Simply select your package, 
          choose a time slot, and our professionals will be at your doorstep. We use industry-standard cleaning materials to ensure your vehicle looks brand new.
        </p>
       
      </div>
    </div>
  );
}