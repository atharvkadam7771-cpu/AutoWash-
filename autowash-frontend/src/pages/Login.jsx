import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Catch the hidden messages passed from other pages
  const [message, setMessage] = useState(location.state?.redirectMessage || '');
  const [isErrorMsg, setIsErrorMsg] = useState(location.state?.isError || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://localhost:8080/api/login' : 'http://localhost:8080/api/signup';
    
    const payload = isLogin ? { email, password } : { fullName, email, password };

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('loggedInUser', data.fullName);
          navigate('/home'); 
        } else {
          setMessage('Account created successfully! Please log in.');
          setIsErrorMsg(false);
          setIsLogin(true); 
          setFullName(''); setEmail(''); setPassword('');
        }
      } else {
        setMessage(data.message || 'An error occurred.');
        setIsErrorMsg(true);
      }
    })
    .catch(() => {
      setMessage('Server error. Is Tomcat running?');
      setIsErrorMsg(true);
    });
  };

  const inputStyle = { width: '100%', padding: '10px', margin: '8px 0 20px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '30px' }}>
        <h2 style={{ color: '#213a8f', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '15px', textAlign: 'center' }}>
          {isLogin ? 'Account Login' : 'Create an Account'}
        </h2>
        
        {/* Render UI Messages instead of Popups */}
        {message && (
          <div style={{ 
            padding: '10px', marginBottom: '20px', borderRadius: '4px', 
            backgroundColor: isErrorMsg ? '#ffebee' : '#e8f5e9', 
            color: isErrorMsg ? '#c62828' : '#2e7d32', 
            border: `1px solid ${isErrorMsg ? '#ef9a9a' : '#a5d6a7'}`, 
            fontWeight: 'bold', textAlign: 'center', fontSize: '14px' 
          }}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          {!isLogin && (
            <>
              <label style={{ fontWeight: 'bold', color: '#555' }}>Full Name:</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required style={inputStyle} />
            </>
          )}

          <label style={{ fontWeight: 'bold', color: '#555' }}>Email Address:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />

          <label style={{ fontWeight: 'bold', color: '#555' }}>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />

          <button type="submit" style={{ backgroundColor: '#2b60de', color: 'white', border: 'none', padding: '12px', width: '100%', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: '#2b60de', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </p>
      </div>
    </div>
  );
}