import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

export default function Register({ closeRegister, openLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Şifrə və təsdiq şifrəsini yoxlayın
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword, // Laravel bunu yoxlayır
      });

      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => {
        closeRegister();
        openLogin();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-modal">
      <div className="register">
        <img
          className="close-icon"
          src="/Assets/close-icon.svg"
          alt="close"
          onClick={closeRegister}
        />
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleRegister}>
          <label>Fullname</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn-register" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <a
            href="#"
            onClick={() => {
              closeRegister();
              openLogin();
            }}
          >
            Login
          </a>
        </p>
        <p>or sign up with</p>
        <div className="social-buttons">
          <button>
            <img src="/Assets/google.svg" alt="" /> Google
          </button>
          <button>
            <img src="/Assets/facebook.svg" alt="" /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
