import React, { useState } from 'react';
import Review from './Review';
import WriteModal from './WriteModal';

const ReviewList = ({ reviews, rating }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalReviews = reviews.length;
  const userPhotos = reviews.map(review => review.userPhotos);

  return (
    <div className="common-rev">
      <div className="rev-left">
        <div className="review-summary">
          <div className="product-rate">
            <span>{rating}</span>
        <div className="star">
        {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star"
                style={{
                  color: rating >= star ? "gold" : "gray",
                  fontSize: "25px",
                }}
              >
                ★
              </span>
            ))}
        </div>
           
          </div>
          <p>Based on {totalReviews} reviews</p>
          <div className="user-photos">
            {userPhotos.map((photo, index) => (
              <img key={index} src={photo} alt={`User ${index + 1}'s profile`} />
            ))}
          </div>
        </div>
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
