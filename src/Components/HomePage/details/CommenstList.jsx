import React from "react";
import Comment from "./Comment";
import ReviewSummary from "./ReviewSummary";

const CommentsList = ({ comments = [], reviews = [], rating }) => {
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
      <div className="comments-list">
        <div className="write-rev">
          <span className="write">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.625 10.3796C2.625 12.7272 3.8675 14.794 5.77412 16.0968C5.77325 16.845 5.775 17.853 5.775 18.9108L8.86463 17.3822C9.39313 17.4837 9.93912 17.5388 10.5 17.5388C14.833 17.5388 18.375 14.3512 18.375 10.3796C18.375 6.40796 14.833 3.22034 10.5 3.22034C6.167 3.22034 2.625 6.40796 2.625 10.3796Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.4126 11.287V11.1058C10.4126 10.5126 10.7792 10.1915 11.1467 9.94472C11.5054 9.70322 11.8651 9.38822 11.8651 8.80722C11.8651 8.00484 11.2149 7.35559 10.4134 7.35559C9.61194 7.35559 8.96094 8.00397 8.96094 8.80634" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.4112 13.3336C10.3386 13.3336 10.28 13.3922 10.2809 13.4648C10.2809 13.5375 10.3395 13.5961 10.4121 13.5961C10.4847 13.5961 10.5434 13.5375 10.5434 13.4648C10.5434 13.3922 10.4856 13.3336 10.4112 13.3336" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Discussion
          </span>
          <div className="sortRev">
            <select>
              <option value="">Most recent</option>
              <option value="">Highest rating</option>
              <option value="">Lowest rating</option>
            </select>
          </div>
        </div>

        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
