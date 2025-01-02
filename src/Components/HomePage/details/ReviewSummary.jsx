import React, { useState, useEffect } from "react";

const ReviewSummary = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product-reviews/${productId}`
        );
        const data = await response.json();
  
   
        const reviews = data.data;
      
  
        const totalRating = reviews.reduce((sum, review) => sum + review.common_review, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  
        setRating(averageRating);
        setTotalReviews(reviews.length);
        setUserPhotos(reviews.map((review) => review.profile_photo || ""));
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };
  
    fetchReviewData();
  }, [productId]);
  

  return (
    <div className="review-summary">
      <div className="product-rate">
        <span>{rating.toFixed(1)}</span>
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
          <img
            key={index}
            src={`http://localhost:8000/storage/${photo}`}
            alt={`User ${index + 1}'s photo`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
