import React from "react";
import "./product.css";

export default function Product() {
  return (
    <div className="productlatest container">
      <div className="product-title">
      <div className="title-left">Ən Son Kolleksiyalar üçün Yeni Stil</div>
        <div className="title-right">
          Hər hansı bir tədbir üçün mükəmməl olan geyim, ayaqqabı və aksesuarların ən son kolleksiyasını kəşf edin. 
          Gündəlik geyimdən rəsmi geyimə qədər, gardırobunuzu yeniləmək və trenddə qalmaq üçün ehtiyacınız olan hər şey var.
        </div>
      </div>
      <div className="product-cards">
        <div className="product-style">
          <div className="head">
            <div className="title">Yeni Günlük Stil</div>
            <div className="content">Kolleksiya</div>
            <button>İndi al</button>
            <img src="/Assets/wide.png" alt="" />
          </div>
          <img src="/Assets/men.png" alt="" />
        </div>
        <div className="spring-dating">
          <div className="head">
            <div className="title">
            Bahar <span>Randevu</span>
            </div>
            <div className="content">Kolleksiya</div>
          </div>
          <img src="/Assets/stylishwomen.png" alt="" />
        </div>
        <div className="price">
        <div className="head">
            <div className="title">15$ ENDİRİM </div>
            <div className="content">Mağazamızda və ya veb saytımızda bütün məhsullara tətbiq edilir</div>
          </div>
          <img src="/Assets/iconstar.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
