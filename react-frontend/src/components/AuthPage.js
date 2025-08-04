import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: 'raymondmontfort07@gmail.com',
    password: 'password123'
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Test backend connection on component mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await axios.get('/api/intern-data/1');
      console.log('Backend connection successful:', response.data);
    } catch (error) {
      console.error('Backend connection failed:', error);
      showMessage('Warning: Cannot connect to backend server. Please make sure the backend is running on port 3000.', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', loginData);
      const response = await axios.post('/api/login', loginData);
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        onLogin(response.data.user);
        showMessage(response.data.message, 'success');
      } else {
        showMessage(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        showMessage(error.response.data.message || 'Login failed', 'error');
      } else if (error.request) {
        console.error('No response received:', error.request);
        showMessage('Cannot connect to server. Please check if backend is running.', 'error');
      } else {
        console.error('Error setting up request:', error.message);
        showMessage('Login failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting signup with:', signupData);
      const response = await axios.post('/api/register', signupData);
      console.log('Signup response:', response.data);
      
      if (response.data.success) {
        onLogin(response.data.user);
        showMessage(response.data.message, 'success');
      } else {
        showMessage(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        showMessage(error.response.data.message || 'Account creation failed', 'error');
      } else if (error.request) {
        console.error('No response received:', error.request);
        showMessage('Cannot connect to server. Please check if backend is running.', 'error');
      } else {
        console.error('Error setting up request:', error.message);
        showMessage('Account creation failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (form, field, value) => {
    if (form === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <h1>
            <FontAwesomeIcon icon={faHeart} /> Fundraising Intern Portal
          </h1>
          <p>Welcome to your fundraising dashboard</p>
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="auth-tabs">
          <button 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        <form 
          className={`auth-form ${activeTab === 'login' ? '' : 'hidden'}`}
          onSubmit={handleLogin}
        >
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={loginData.email}
              onChange={(e) => handleInputChange('login', 'email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={loginData.password}
              onChange={(e) => handleInputChange('login', 'password', e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%' }}
          >
            <FontAwesomeIcon icon={faSignInAlt} /> 
            {loading ? ' Logging in...' : ' Login'}
          </button>
        </form>

        {/* Signup Form */}
        <form 
          className={`auth-form ${activeTab === 'signup' ? '' : 'hidden'}`}
          onSubmit={handleSignup}
        >
          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <input
              type="text"
              id="signup-name"
              value={signupData.name}
              onChange={(e) => handleInputChange('signup', 'name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              value={signupData.email}
              onChange={(e) => handleInputChange('signup', 'email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              value={signupData.password}
              onChange={(e) => handleInputChange('signup', 'password', e.target.value)}
              placeholder="Create a password"
              minLength="6"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%' }}
          >
            <FontAwesomeIcon icon={faUserPlus} /> 
            {loading ? ' Creating Account...' : ' Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage; 