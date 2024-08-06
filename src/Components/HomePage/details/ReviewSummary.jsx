import React from 'react';

const ReviewSummary = ({ rating, totalReviews, userPhotos }) => {
  return (
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
  );
};

export default ReviewSummary;
