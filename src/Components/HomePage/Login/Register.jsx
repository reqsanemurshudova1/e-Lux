import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register({ closeRegister }) {
  return (
    <div className="register-modal">
      <div className="register">
        <img className='close-icon' src="/Assets/close-icon.svg" alt="close" onClick={closeRegister } />
        <h1>Register</h1>
        <form>
          <label>Fullname</label>
          <input type="text" placeholder='Enter your name' />
          <label>Email</label>
          <input type="email" placeholder='Email' />
          <label>Password</label>
          <input type="password" placeholder='Password' />
          <div className="remember">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <div className="checkbox-box"></div>
              <span>Remember me</span>
            </label>
            <div className="forgot"><a href="#">Forgot Password?</a></div>
          </div>
          <button className='btn-register'>Register</button>
        </form>
        <p>Already have an account? <a href="#" onClick={() => {
          closeRegister();
          openLogin();
        }}>Login</a></p>
        <p>or sign up with</p>
        <div className="social-buttons">
          <button><img src="/Assets/google.svg" alt="" /> Google</button>
          <button><img src="/Assets/facebook.svg" alt="" /> Facebook</button>
        </div>
      </div>
    </div>
  )
}
