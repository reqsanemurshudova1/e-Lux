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

    if (password !== confirmPassword) {
      setError('Şifrələr uyğun gəlmir.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword, 
      });

      setSuccess('Qeydiyyat uğurla tamamlandı! İndi daxil ola bilərsiniz.');
      setTimeout(() => {
        closeRegister();
        openLogin();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Xəta baş verdi.');
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
          alt="bağla"
          onClick={closeRegister}
        />
        <h1>Qeydiyyat</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleRegister}>
          <label>Ad və Soyad</label>
          <input
            type="text"
            placeholder="Adınızı daxil edin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <label>Şifrəni təsdiq edin</label>
          <input
            type="password"
            placeholder="Şifrəni təsdiq edin"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn-register" type="submit" disabled={loading}>
            {loading ? 'Qeydiyyat edilir...' : 'Qeydiyyat'}
          </button>
        </form>
        <p>
          Artıq hesabınız var?{' '}
          <a
            href="#"
            onClick={() => {
              closeRegister();
              openLogin();
            }}
          >
            Daxil olun
          </a>
          <br />
          və ya aşağıdakı üsullarla qeydiyyatdan keçin
        </p>
     
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
