import React, { useState } from 'react';
import DetailsDesc from './DetailsDesc';
import Review from './Review';
import Discussions from './Discussions';
import './common.css';

export default function DescRevDisc({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className='container'>
      <div className="titles">
        <h2 className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>
          Description
        </h2>
        <h2 className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
          Reviews
        </h2>
        <h2 className={activeTab === 'discussions' ? 'active' : ''} onClick={() => setActiveTab('discussions')}>
          Discussions
        </h2>
      </div>
      <div className="border"></div>
      <span className="activespan" style={{ transform: `translateX(${activeTab === 'description' ? '0%' : activeTab === 'reviews' ? '100%' : '200%'})` }}></span>
      {activeTab === 'description' && <DetailsDesc product={product} />}
      {activeTab === 'reviews' && <Review />}
      {activeTab === 'discussions' && <Discussions />}
    </div>
  );
}
