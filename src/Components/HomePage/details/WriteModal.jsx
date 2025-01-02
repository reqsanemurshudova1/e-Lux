import React, { useState, useRef } from 'react';
import RatingReview from './RatingReview';
import { useParams } from 'react-router-dom';

const WriteModal = ({ isOpen, onClose, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleAddPhotosClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_id', id);
    formData.append('common_review', rating);
    formData.append('profile_name', name);
    formData.append('email', email);
    formData.append('comment', comment);

    if (photo) {
      formData.append('profile_photo', photo);
    }

    fetch('http://127.0.0.1:8000/api/product-reviews', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // Sayfa yenileme işlemi
        window.location.reload(); // Sayfa yenilenecek
      })
      .catch((err) => console.error(err));
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
            <button type="button" className="add-photos" onClick={handleAddPhotosClick}>
              Add Photos
            </button>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button type="submit" className="send-review">
              Send Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteModal;
