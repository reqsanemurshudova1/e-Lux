import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer container">
      <div className="foot">
        <div className="logo">
          <div className="title">
            <img src="/Assets/Group.jpg" alt="Lux logo" className="logo" />
            <span>LUX</span>
          </div>
          <div className="text">
            Finding your fashion has never been easier. Browse the best
            selection of famous fashion brands that suit your style and
            preferences.
          </div>
        </div>
        <div className="menu">
          <div className="title">Menu</div>
          <div className="text">
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li><Link to="/order">Order Tracking </Link></li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="FAQ">
          <div className="title">About</div>
          <div className="text">
            <ul>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Term of Conditsions</li>
            </ul>
          </div>
        </div>
        <div className="connect">
          <div className="title">Connect</div>
          <div className="text">
            <ul>
              <li>Contact us</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        <div className="payment">
          <div className="title">Payment Method</div>
          <div className="card-images">
            <ul>
              <li>
                <img src="/Assets/paypal.jpg" alt="" />
              </li>

              <li>
                <img src="/Assets/applepay.svg" alt="" />
              </li>
              <li>
                <img src="/Assets/mastercard.svg" alt="" />
              </li>
              <li>
                <img src="/Assets/visa.svg" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copy">© 2022 Company Name® Global Inc.</div>
    </div>
  );
}
