import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px 0', borderBottom: '1px solid #334155' }}>
      <Link to="/" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      <Link to="/book" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>Book Service</Link>
    </nav>
  );
}