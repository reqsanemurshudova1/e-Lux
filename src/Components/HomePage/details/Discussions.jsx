import React from 'react';
import CommentsList from './CommenstList';

const Discussions = ({ comments, reviews, rating }) => {
    return (
        <div>
            <CommentsList comments={comments} reviews={reviews} rating={rating} />
        </div>
    );
};

export default Discussions;
