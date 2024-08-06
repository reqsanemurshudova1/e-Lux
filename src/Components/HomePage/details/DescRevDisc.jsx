import React, { useState } from 'react';
import DetailsDesc from './DetailsDesc';
import ReviewList from './ReviewList';
import Discussions from './Discussions';
import './common.css';

export default function DescRevDisc({ product }) {
  
  const [activeTab, setActiveTab] = useState('description');
  console.log('Product:', product);
  console.log('Reviews:', product.reviews);
  console.log('Comments:', product.comments);
  
  return (
    <div className='desc-rev-disc container'>
      <div className="titles">
        <h2
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => setActiveTab('description')}
        >
          Description
        </h2>
        <h2
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({product.reviews.length})
        </h2>
        <h2
          className={activeTab === 'discussions' ? 'active' : ''}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions({product.comments.length})
        </h2>
      </div>
      <div className="border"></div>
      <span className="activespan" style={{ transform: `translateX(${activeTab === 'description' ? '0%' : activeTab === 'reviews' ? '100%' : '200%'})` }}></span>
      {activeTab === 'description' && <DetailsDesc product={product} />}
      {activeTab === 'reviews' && <ReviewList reviews={product.reviews} rating={product.rating} />}
      
      {activeTab === 'discussions' && <Discussions rating={product.rating} comments={product.comments}  reviews={product.reviews} />}
    </div>
  );
}
