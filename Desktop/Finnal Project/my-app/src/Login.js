// src/Login.js
import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import axios                from 'axios';
import './Login.css';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const API = 'http://localhost:5001/Users';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email:    '',
    username: '',
    password: ''
  });
  const [error, setError]             = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading]         = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        // ← match backend POST /Users/login
        const { data } = await axios.post(`${API}/login`, {
          username: formData.username.trim(),
          password: formData.password.trim()
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/Dashboard');
      } else {
        // ← match backend POST /Users/register
        const { data } = await axios.post(`${API}/register`, {
          email:    formData.email.trim(),
          username: formData.username.trim(),
          password: formData.password.trim()
        });
        setSuccessMessage(data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (isLogin ? 'Login failed' : 'Signup failed')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-auth-bg">
      <div className="modern-auth-logo">
        <span className="modern-auth-logo-text">Stocky</span>
      </div>
      <div className={`modern-auth-card ${isLogin ? '' : 'signup-mode'}`}>
        <div className="modern-auth-toggle">
          <span
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccessMessage('');
            }}
          >
            Login
          </span>
          <span
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccessMessage('');
            }}
          >
            Signup
          </span>
        </div>

        <form
          className="modern-auth-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>

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
            <div className="modern-input-group">
              <FontAwesomeIcon icon={faEnvelope} className="modern-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          )}

          <div className="modern-input-group">
            <FontAwesomeIcon icon={faUser} className="modern-input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="modern-input-group">
            <FontAwesomeIcon icon={faLock} className="modern-input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="modern-btn"
            disabled={loading}
          >
            {loading
              ? (isLogin ? 'Logging in…' : 'Signing up…')
              : (isLogin ? 'Login'     : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
