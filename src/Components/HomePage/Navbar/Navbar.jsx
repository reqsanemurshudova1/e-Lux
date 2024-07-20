import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Login/Register";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [registerOpen, setRegisterOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const closeLogin = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
    
  };


  return (
    <div>
      <nav className="navbar container">
        <div className="burger-menu" onClick={toggleMenu}>
          {!isOpen ? (
            <img src="/Assets/menu-icon.svg" alt="menu" />
          ) : (
            <img src="/Assets/close-icon.svg" alt="close" />
          )}
          {isOpen && (
            <div className="burger-menu-items">
              <ul>
                <li>
                  <NavLink to="/">Menu</NavLink>
                </li>
                <li>
                  <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                  <NavLink to="/blog">Order tracking</NavLink>
                </li>
                <li>
                  <NavLink to="/blog">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
                <li>
                  <NavLink to="/adress">Address</NavLink>
                </li>
              </ul>
              <span className="my-account" onClick={toggleLogin}>My Account</span>
            </div>
          )}
        </div>
        <div className="nav-left">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-logo">
          <img src="/Assets/Group.jpg" alt="Lux logo" className="logo" />
          <span>LUX</span>
        </div>
        <div className="nav-right">
          <div className="search">
            <img src="/Assets/search.jpg" alt="" />
            <input type="text" placeholder="Search.." />
          </div>
          <div className="shop">
            <img src="/Assets/bag-2.jpg" alt="" />
          </div>
          <button className="login-button" onClick={toggleLogin}>
            Login
          </button>
        </div>
      </nav>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
      {loginOpen && <Login toggleLogin={toggleLogin} closeLogin={closeLogin} />}
      {registerOpen && <Register closeRegister={closeRegister} />}
    </div>
  );
}
