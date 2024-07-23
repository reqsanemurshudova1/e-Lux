import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login({ closeLogin, openRegister, changeModal }) {
  return (
    <div className="login-modal">
      <div className="login">
        <img
          className="close-icon"
          src="/Assets/close-icon.svg"
          alt="close"
          onClick={closeLogin}
        />
        <h1>Login</h1>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="Password" />
          <div className="remember">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <div className="checkbox-box"></div>
              <span>Remember me</span>
            </label>
            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <button className="btn-login">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={() => {
              changeModal();
            }}
          >
            Register
          </a>
        </p>
        <p>or sign in with</p>
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
