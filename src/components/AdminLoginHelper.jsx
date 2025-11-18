import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function AdminLoginHelper() {
  const [email, setEmail] = useState('knupadhyay784@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await login(email, password);
      console.log('Login successful');
      setSuccess(true);
      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px', 
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        Admin Login Helper
      </h2>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
          />
        </div>
        
        {error && (
          <div style={{ 
            color: '#dc3545', 
            backgroundColor: '#f8d7da', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            color: '#155724', 
            backgroundColor: '#d4edda', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            Login successful! Redirecting to dashboard...
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>
      </form>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '4px'
      }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>Instructions:</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Enter admin credentials (knupadhyay784@gmail.com)</li>
          <li>Enter the password for this account</li>
          <li>Click "Login as Admin" to authenticate</li>
          <li>After successful login, you'll be redirected to the dashboard</li>
        </ol>
        <p style={{ marginBottom: 0, fontSize: '14px' }}>
          <strong>Note:</strong> Make sure Firebase security rules are deployed before logging in.
        </p>
      </div>
    </div>
  );
}

export default AdminLoginHelper;