import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function BookService() {
  const [searchParams] = useSearchParams();
  const pkgId = searchParams.get('pkgId') || '';
  const navigate = useNavigate();

  // Authentication Check without popups
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      navigate('/login', { state: { redirectMessage: 'You must be logged in to book a service.', isError: true } });
    }
  }, [navigate]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = { customerName: name, customerPhone: phone, packageId: parseInt(pkgId), bookingDate: date, timeSlot: time };

    fetch('http://localhost:8080/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    })
    .then(response => {
      if (response.ok) {
        setMessage('Booking successfully saved to database!');
        setIsError(false);
        setName(''); setPhone(''); setDate(''); setTime('');
      } else {
        setMessage('Error saving booking. Please try again.');
        setIsError(true);
      }
    })
    .catch(() => {
      setMessage('Error connecting to the server.');
      setIsError(true);
    });
  };

  const inputStyle = { width: '100%', padding: '10px', margin: '8px 0 20px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '30px' }}>
        <h2 style={{ color: '#213a8f', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Confirm Reservation</h2>
        
        {message && (
          <div style={{ padding: '15px', marginBottom: '20px', borderRadius: '4px', backgroundColor: isError ? '#ffebee' : '#e8f5e9', color: isError ? '#c62828' : '#2e7d32', border: `1px solid ${isError ? '#ef9a9a' : '#a5d6a7'}`, fontWeight: 'bold', textAlign: 'center' }}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label style={{ fontWeight: 'bold', color: '#555' }}>Customer Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />

          <label style={{ fontWeight: 'bold', color: '#555' }}>Phone Number:</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required style={inputStyle} />

          <label style={{ fontWeight: 'bold', color: '#555' }}>Select Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />

          <label style={{ fontWeight: 'bold', color: '#555' }}>Select Time:</label>
          <select value={time} onChange={e => setTime(e.target.value)} required style={inputStyle}>
            <option value="">--Choose--</option>
            <option value="Morning">Morning (9 AM - 12 PM)</option>
            <option value="Afternoon">Afternoon (1 PM - 4 PM)</option>
            <option value="Evening">Evening (5 PM - 8 PM)</option>
          </select>

          <button type="submit" style={{ backgroundColor: '#00a651', color: 'white', border: 'none', padding: '12px', width: '100%', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
            Submit Reservation
          </button>
        </form>
      </div>
    </div>
  );
}