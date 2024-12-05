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
      <span>{data?.header ? data?.header : <><b>TRENDY MODA</b> KOLEKSİYASI</>}</span>
      <p>{data?.description ? data.description : <>      Moda dünyasında ən yaxşı brendlərin kolleksiyasını kəşf edərək, öz üslubunuza və zövqünüzə uyğun ən mükəmməl parçaları tapmaq heç vaxt bu qədər asan olmamışdı. </>}</p>
      <button className='shop-btn'>İNDİ AL</button>
    </div>
    <div className="hero-left-bottom">
      <div className="plus">
        <div className="plus-left">
          <span className='text-title'>{data?.style_count ? data.style_count : <>0</>}+</span>
          <span className='text-content'>Unikal Üslub</span>
        </div>
        <div className="plus-right">
          <span className='text-title'>{data?.brand_count ? data.brand_count : <>0</>}+</span>
          <span className='text-content'>Təsdiqlənmiş Brend</span>
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
    <img src={data?.img ? `http://e_lux_backend.test/storage/${data.img}` : "/Assets/brandCatalog.png"} alt="Brend Kataloqu" />
    <img src="/Assets/Round.png" alt="" />
  </div>
</div>

  );
}
