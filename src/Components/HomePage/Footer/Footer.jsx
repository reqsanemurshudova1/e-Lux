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
          Moda dünyasında ən yaxşı brendlərin kolleksiyasını kəşf edərək, öz üslubunuza və zövqünüzə uyğun ən mükəmməl parçaları tapmaq heç vaxt bu qədər asan olmamışdı.  </div> </div>
        <div className="menu">
          <div className="title">Menyu</div>
          <div className="text">
            <ul>
              <li>Kişilər</li>
              <li>Qadınlar</li>
              <li><Link to="/order">Sifariş İzləmə</Link></li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="FAQ">
          <div className="title">Haqqında</div>
          <div className="text">
            <ul>
              <li>Tez-tez verilən suallar (FAQ)</li>
              <li>Gizlilik Siyasəti</li>
              <li>Şərtlər və Qaydalar</li>
            </ul>
          </div>
        </div>
        <div className="connect">
          <div className="title">Əlaqə</div>
          <div className="text">
            <ul>
              <li>Bizimlə əlaqə</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        <div className="payment">
          <div className="title">Ödəniş Metodu</div>
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
      <div className="copy">© 2024 E_Luxı® Global Inc.</div>
    </div>
  );
}
