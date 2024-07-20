import React from "react";
import "./product.css";

export default function Product() {
  return (
    <div className="productlatest container">
      <div className="product-title">
        <div className="title-left">New Style for Latest Collections</div>
        <div className="title-right">
          Discover our latest collection of clothing, shoes, and accessories
          that are perfect for any occasion. From casual wear to formal attire,
          we have everything you need to revamp your wardrobe and stay on trend.
        </div>
      </div>
      <div className="product-cards">
        <div className="product-style">
          <div className="head">
            <div className="title">NEW CASUAL STYLE</div>
            <div className="content">Collection</div>
            <button>Shop Now</button>
            <img src="/Assets/wide.png" alt="" />
          </div>
          <img src="/Assets/men.png" alt="" />
        </div>
        <div className="spring-dating">
          <div className="head">
            <div className="title">
              Spring <span>Dating</span>
            </div>
            <div className="content">Collection</div>
          </div>
          <img src="/Assets/stylishwomen.png" alt="" />
        </div>
        <div className="price">
          <div className="head">
            <div className="title">GET $15 OFF</div>
            <div className="content">For all item in our store or website</div>
          </div>
          <img src="/Assets/iconstar.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
