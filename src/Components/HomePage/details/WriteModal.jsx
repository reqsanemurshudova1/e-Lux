import React, { useState } from 'react';
import RatingReview from './RatingReview';

const WriteModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log({ rating, name, email, comment });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      
        <form onSubmit={handleSubmit}>
          <div className="rating-section">
            <label>Quality</label>
            <RatingReview rating={rating} setRating={setRating} />
          </div>
     
         <div className="inputs">
       <div className="topInp">
         <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         </div>
          <textarea

            placeholder="Enter your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
       </div>
          <div className="form-actions">
            <button type="button" className="add-photos">Add Photos</button>
            <button type="submit" className="send-review">Send Review</button>
          </div>
   
        </form>
      </div>
    </div>
  );
};

export default WriteModal;
