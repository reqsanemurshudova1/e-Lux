import React from 'react'
import './Advertising.css'

export default function Advertising() {
  return (
    <div className='advertising container'>
        <div className="outfit" data-aos="fade-right">
            <img src="/Assets/star.svg" alt="" />
            <div className="title">GÜNÜN ÜSLUBU İLHAMI</div>
            <div className="content">80+ müxtəlif məhsullar ilə geniş seçim imkanı.</div>
        </div>
        <div className="casual-style" data-aos="fade-left">
          <div className="title">YENİ GÜNLÜK ÜSLUB</div>
          <img src="/Assets/stylishwomen.png" alt="" />
        </div>
    </div>
  )
}
