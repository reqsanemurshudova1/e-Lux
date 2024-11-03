import React, { useEffect, useState } from 'react';
import './Hero.css';
import axios from 'axios';

export default function Hero() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/home-banners');
        setData(response.data?.data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className='hero container'>
      <div className="hero-left">
        <div className="hero-left-top">
          <span>{data?.header? data?.header: <><b>TRENDY FASHION</b> COLLECTION</>}</span>
          <p>{data?.description? data.description : <>Finding your fashion has never been easier. Browse the best selection of famous fashion brands that suit your style and preferences.</>}</p>
          <button className='shop-btn'>SHOP NOW</button>
        </div>
        <div className="hero-left-bottom">
          <div className="plus">
            <div className="plus-left">
              <span className='text-title'>{data?.style_count? data.style_count : <>0</>}+</span>
              <span className='text-content'>Unique Style</span>
            </div>
            <div className="plus-right">
              <span className='text-title'>{data?.brand_count? data.brand_count : <>0</>}+</span>
              <span className='text-content'>Brand Trusted</span>
            </div>
          </div>
          <div className="circles">
            <div className="blue"></div>
            <div className="orange"></div>
          </div>
          <p>{data?.footer_count}</p>
        </div>
      </div>
      <div className="hero-right">
        <img src={data?.img? `http://e_lux_backend.test/storage/${data.img}`:"/Assets/brandCatalog.png"} alt="Brand Catalog" />
        <img src="/Assets/Round.png" alt="" />
      </div>
    </div>
  );
}
