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
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response) {
        localStorage.setItem("authToken", response.data.access_token);

        setUser({ name: response.data.user.name });

        closeLogin();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || "Gözlənilməz bir xəta baş verdi.");
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
          alt="bağla"
          onClick={closeLogin}
        />
        <h1>Giriş</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>E-poçt</label>
          <input
            type="email"
            placeholder="E-poçt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Şifrə</label>
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="remember">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <div className="checkbox-box"></div>
              <span>Məni yadda saxla</span>
            </label>
            <div className="forgot">
              <a href="#">Şifrəni unutmusunuz?</a>
            </div>
          </div>
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Giriş edilir..." : "Giriş"}
          </button>
        </form>
        <p>
          Hesabınız yoxdur?{" "}
          <a
            href="#"
            onClick={() => {
              changeModal();
            }}
          >
            Qeydiyyat
          </a>
        </p>
        <p>və ya aşağıdakı üsullarla daxil olun</p>
        <div className="social-buttons">
          <button>
            <img src="/Assets/google.svg" alt="" /> Google ilə
          </button>
          <button>
            <img src="/Assets/facebook.svg" alt="" /> Facebook ilə
          </button>
        </div>
      </div>
    </div>
  );
}
