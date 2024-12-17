import React, { useState } from 'react';
import RatingReview from './RatingReview';
import { useParams } from 'react-router-dom';

const WriteModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const { id } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(id);


    fetch("http://127.0.0.1:8000/api/product-reviews",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id, // replace with the actual product ID
          common_review: rating,
          profile_name: name,
          email: email,
          comment: comment,
        }),
      }
    ).then((a) => a.json()).then((b) => console.log(b)
    )
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
            <button type="submit" className="send-review" >Send Review</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default WriteModal;