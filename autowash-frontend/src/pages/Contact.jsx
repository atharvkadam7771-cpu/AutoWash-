import React from 'react';

export default function Contact() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '30px' }}>
        <h2 style={{ color: '#213a8f', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Contact Us</h2>
        <p style={{ lineHeight: '1.6', color: '#555', fontSize: '16px', marginBottom: '25px' }}>
          Have questions about our services or need help with a booking? Reach out to us using the details below:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#444' }}>
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}><strong style={{ color: '#333' }}>Email:</strong> support@autowash.com</div>
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}><strong style={{ color: '#333' }}>Phone:</strong> +91 98765 43210</div>
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}><strong style={{ color: '#333' }}>Office Address:</strong> AutoWash HQ, Tech Park, Navi Mumbai, Maharashtra, India</div>
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}><strong style={{ color: '#333' }}>Working Hours:</strong> Monday - Sunday, 9:00 AM to 8:00 PM</div>
        </div>
      </div>
    </div>
  );
}