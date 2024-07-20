import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <div className='hero container'>
      <div className="hero-left">
        <div className="hero-left-top">
          <span><b>TRENDY FASHION</b> COLLECTION</span>
          <p>Finding your fashion has never been easier. Browse the best selection of famous fashion brands that suit your style and preferences.</p>
          <button className='shop-btn'>SHOP NOW</button>
        </div>
        <div className="hero-left-bottom">
          <div className="plus">
            <div className="plus-left">
              <span className='text-title'>80+</span>
              <span className='text-content'>Unique Style</span>
            </div>
            <div className="plus-right">
              <span className='text-title'>40+</span>
              <span className='text-content'>Brand Trusted</span>
            </div>
          </div>
          <div className="circles">
            <div className="blue"></div>
            <div className="orange"></div>
          </div>
          <p>80+ Molestie hendrerit amet sapien volutpat.</p>
        </div>
      </div>
      <div className="hero-right">
        <img src="/Assets/brandCatalog.png" alt="Brand Catalog" />
        <img src="/Assets/Round.png" alt="" />
      </div>
    </div>
  );
}
