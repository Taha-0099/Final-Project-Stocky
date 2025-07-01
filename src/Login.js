// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const API = 'http://localhost:5001/Users';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const { data } = await axios.post(`${API}/login`, {
          username: formData.username.trim(),
          password: formData.password.trim()
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/Dashboard');
      } else {
        // Signup logic
        const { data } = await axios.post(`${API}/register`, {
          email: formData.email.trim(),
          username: formData.username.trim(),
          password: formData.password.trim()
        });
        setSuccessMessage(data.message);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || 
        (isLogin ? 'Login failed' : 'Signup failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
<>

<div className='headingH'> LOGIN/SIGN-UP </div>


    <div className="auth-container">



      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>

        {successMessage && (
          <div className="success-message">
            {successMessage}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(true);
                setSuccessMessage('');
              }}
            >
              Login Now
            </button>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {!isLogin && (
          <div className="form-group">
            <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label><FontAwesomeIcon icon={faKey} /> Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btnn"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
        </button>

        <p className="toggle-link">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setSuccessMessage('');
          }}>
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </p>
      </form>
    </div>
    </>

  );
};

export default Login;