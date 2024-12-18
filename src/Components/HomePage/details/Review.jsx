import React, { useState } from 'react';
import profilePhoto from "/public/Assets/user.photo.jpg";

const Review = ({ review }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < review.common_review; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M18.3065 4.67978L20.6532 9.37311C20.9732 10.0264 21.8265 10.6531 22.5465 10.7731L26.7999 11.4798C29.5199 11.9331 30.1599 13.9064 28.1999 15.8531L24.8932 19.1598C24.3332 19.7198 24.0265 20.7998 24.1999 21.5731L25.1465 25.6664C25.8932 28.9064 24.1732 30.1598 21.3065 28.4664L17.3199 26.1064C16.5999 25.6798 15.4132 25.6798 14.6799 26.1064L10.6932 28.4664C7.83988 30.1598 6.10655 28.8931 6.85321 25.6664L7.79988 21.5731C7.97321 20.7998 7.66655 19.7198 7.10655 19.1598L3.79988 15.8531C1.85321 13.9064 2.47988 11.9331 5.19988 11.4798L9.45321 10.7731C10.1599 10.6531 11.0132 10.0264 11.3332 9.37311L13.6799 4.67978C14.9599 2.13311 17.0399 2.13311 18.3065 4.67978Z"
            fill="#F4C700"
          />
        </svg>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/reviews/${review.id}/like`, {
        method: 'POST',
      });
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      console.error('Error liking the review:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`/reviews/${review.id}/dislike`, {
        method: 'POST',
      });
      const data = await response.json();
      setDislikes(data.dislikes);
    } catch (error) {
      console.error('Error disliking the review:', error);
    }
  };

  return (
    <div className="review">
      <img src={profilePhoto} alt={`${review.profile_name}'s profile`} className="profile-image" />
      <div className="review-content">
        <h3>{review.profile_name}</h3>
        <div className="rating">
          {renderStars()}
          <span className="create-date">{formatDate(review.created_at)}</span>
        </div>
        <p>{review.comment}</p>
        <div className="likes-dislikes">
          <span onClick={handleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6.99219 15.4084V6.94169C6.99219 6.60835 7.09219 6.28335 7.27552 6.00835L9.55052 2.62502C9.90885 2.08335 10.8005 1.70002 11.5589 1.98335C12.3755 2.25835 12.9172 3.17502 12.7422 3.99169L12.3089 6.71669C12.2755 6.96669 12.3422 7.19169 12.4839 7.36669C12.6255 7.52502 12.8339 7.62502 13.0589 7.62502H16.4839C17.1422 7.62502 17.7089 7.89169 18.0422 8.35835C18.3589 8.80835 18.4172 9.39169 18.2089 9.98335L16.1589 16.225C15.9005 17.2584 14.7755 18.1 13.6589 18.1H10.4089C9.85052 18.1 9.06719 17.9084 8.70885 17.55L7.64219 16.725C7.23385 16.4167 6.99219 15.925 6.99219 15.4084Z" fill="#E16F3D"/>
              <path d="M4.34102 5.31665H3.48268C2.19102 5.31665 1.66602 5.81665 1.66602 7.04998V15.4333C1.66602 16.6667 2.19102 17.1667 3.48268 17.1667H4.34102C5.63268 17.1667 6.15768 16.6667 6.15768 15.4333V7.04998C6.15768 5.81665 5.63268 5.31665 4.34102 5.31665Z" fill="#E16F3D"/>
            </svg> {likes}
          </span>
          <span onClick={handleDislike}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.00093 18.4166C8.75926 18.4166 8.51759 18.375 8.29259 18.2916C7.25093 17.95 6.58426 16.8 6.81759 15.7333L7.22593 13.1083C7.23426 13.05 7.23426 12.9666 7.17593 12.9C7.13426 12.8583 7.07593 12.8333 7.00926 12.8333H3.67593C2.85926 12.8333 2.15093 12.4916 1.73426 11.9C1.32593 11.325 1.24259 10.5666 1.50926 9.83331L3.50093 3.76665C3.80926 2.55831 5.10093 1.58331 6.43426 1.58331H9.60093C10.0676 1.58331 11.0843 1.72498 11.6259 2.26665L14.1509 4.21665L13.3843 5.20831L10.8009 3.20831C10.5926 2.99998 10.0676 2.83331 9.60093 2.83331H6.43426C5.68426 2.83331 4.87593 3.43331 4.70926 4.10831L2.69259 10.2333C2.55926 10.6 2.58426 10.9333 2.75926 11.175C2.94259 11.4333 3.27593 11.5833 3.68426 11.5833H7.01759C7.45093 11.5833 7.85093 11.7666 8.12593 12.0833C8.40926 12.4083 8.53426 12.8416 8.46759 13.2916L8.05093 15.9666C7.95093 16.4333 8.26759 16.9583 8.71759 17.1083C9.11759 17.2583 9.65093 17.0416 9.83426 16.775L13.2509 11.6916L14.2843 12.3916L10.8676 17.475C10.4759 18.0583 9.73426 18.4166 9.00093 18.4166Z" fill="#292D32"/>
              <path d="M16.3496 15.0833H15.5163C13.9746 15.0833 13.2246 14.3583 13.2246 12.875V4.70833C13.2246 3.225 13.9746 2.5 15.5163 2.5H16.3496C17.8913 2.5 18.6413 3.225 18.6413 4.70833V12.875C18.6413 14.3583 17.8913 15.0833 16.3496 15.0833Z" fill="#E16F3D"/>
            </svg> {dislikes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
