import React, { useState } from 'react';
import Review from './Review';
import WriteModal from './WriteModal';
import ReviewSummary from './ReviewSummary';

const ReviewList = ({ reviews, rating }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalReviews = reviews.length;
  const userPhotos = reviews.map(review => review.userPhotos);

  return (
    <div className="common-rev">
      <div className="rev-left">
        <ReviewSummary 
          rating={rating} 
          totalReviews={totalReviews} 
          userPhotos={userPhotos} 
        />
      </div>
      <div className="review-list">
        <div className="write-rev">
          <span className="write" onClick={() => setIsModalOpen(!isModalOpen)}>
            <img src="/Assets/revPen.svg" alt="" />
            {isModalOpen ? 'Cancel Review' : 'Write a review'}
          </span>
          <div className="sortRev">
            <select>
              <option value="">Most recent</option>
              <option value="">Highest rating</option>
              <option value="">Lowest rating</option>
            </select>
          </div>
        </div>
        <div className="modal">
          <WriteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
