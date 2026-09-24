import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/packages')
      .then(response => response.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#213a8f', margin: '0 0 10px 0' }}>Find & Book Doorstep Wash Services</h2>
        <p style={{ color: '#666', margin: 0 }}>Select a vehicle package below to reserve your timeslot.</p>
      </div>

      <h4 style={{ color: '#333', marginBottom: '20px' }}>Available Services ({packages.length})</h4>
      
      {packages.length === 0 ? (
        <p>Loading data from database...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {packages.map((pkg) => (
            <div key={pkg.id} style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0' }}>{pkg.name}</h3>
                <span style={{ backgroundColor: '#e0f0ff', color: '#0066cc', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
                  {pkg.vehicleType}
                </span>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '15px' }}>{pkg.description}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ color: '#00a651', fontWeight: 'bold', fontSize: '18px' }}>₹{pkg.price}</span>
                <Link to={`/book?pkgId=${pkg.id}`}>
                  <button style={{ backgroundColor: '#2b60de', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}