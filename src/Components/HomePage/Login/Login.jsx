import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

export default function Login({ closeLogin, changeModal, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // await axios.get("http://localhost:8000/api/login",);

      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response) {
        localStorage.setItem("authToken", response.data.access_token);

        setUser({ name: response.data.user.name });

        // alert("Login successful!");

        closeLogin();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
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
