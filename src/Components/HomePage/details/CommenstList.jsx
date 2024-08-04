
import React from 'react';
import Comment from './Comment';

const comments = [
    {
        id: 1,
        name: 'Ryan Baptista',
        time: '1 week ago',
        rating: 5,
        text: 'Hi everyone! I just bought a pair of sneakers from this brand, and I absolutely love them! The design is cool and they\'re really comfortable. Has anyone else had any experience with this brand?',
        likes: 6,
        dislikes: 0,
        replies: [
            {
                id: 2,
                name: 'Marilyn Kenter',
                time: '1 week ago',
                rating: 5,
                text: 'I\'ve tried sneakers from brand X too, and I agree with you! The quality is great, and they\'re also reasonably priced. I\'ve been wearing mine for a few months now, and they still look brand new.',
                likes: 6,
                dislikes: 0,
            }
        ]
    },
    {
        id: 3,
        name: 'Jocelyn Franci',
        time: '1 week ago',
        rating: 5,
        text: 'I haven\'t tried brand X yet, but I\'ve seen them in stores. The designs do look appealing, but I\'m concerned about the comfort. Are their shoes comfortable for long-term wear?',
        likes: 6,
        dislikes: 0,
        replies: []
    },
    {
        id: 4,
        name: 'Tiana Geidt',
        time: '1 week ago',
        rating: 5,
        text: 'Based on my experience, shoes from brand X are really comfortable. The soles are cushioned and provide good support. I can wear them all day without feeling tired.',
        likes: 6,
        dislikes: 0,
        replies: []
    }
];

const CommentsList = () => {
    return (




        <div className="common-rev">
            <div className="comments-list">
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
        </div>
    );
};

export default CommentsList;
