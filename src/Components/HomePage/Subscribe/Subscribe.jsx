import React from 'react'
import './Subscribe.css'

export default function Subscribe() {
  return (
    <div className='subscribe container'>
      <div className="title"> Abunə Olun və $15 Endirim Qazanın</div>
      <div className="content">80+ müxtəlif məhsullar ilə geniş seçim imkanı</div>
      <div className="search-subscribe">
        <input type="email" placeholder='E-poçtunuzu daxil edin' />
        <button className='btn-subsrcibe'>Abunə Ol</button>
      </div>
    </div>
  )
}
