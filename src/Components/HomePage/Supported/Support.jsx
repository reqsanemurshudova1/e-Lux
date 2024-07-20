import React from 'react';
import './Support.css';

const logos = [
  { src: './Assets/Zara.jpg', alt: 'Zara' },
  { src: './Assets/guess.jpg', alt: 'Guess' },
  { src: './Assets/fila.jpg', alt: 'Fila' },
  { src: './Assets/gucci.jpg', alt: 'Gucci' },
  { src: './Assets/champion.jpg', alt: 'Champion' },
  { src: './Assets/chanel.jpg', alt: 'Chanel' },
];

export default function Support() {
  return (
    <div className='support container'>
      <div className="support-title">
        We Are Supported By
      </div>
      <div className="support-logos">
        {logos.map((logo, index) => (
          <div className="card-logo" key={index}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
