import React from 'react';
import './Comment.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const comments = [
  {
    text: "I recently purchased the most beautiful dress from this brand and I couldn't be happier with my purchase! The dress is made of high-quality materials and fits like a glove. The color is so vibrant and the cut is extremely flattering.",
    author: "James Lipshutz",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "I absolutely love my new shoes! They are so comfortable and stylish at the same time. The quality is amazing and they have held up really well after multiple wears. I especially love the attention to detail in the design - the little touches really make them stand out.",
    author: "Giana Dokidis",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "I've been using my new handbag for a few weeks now and I'm absolutely in love with it! The size is perfect - it's big enough to hold all of my essentials but not so big that it's cumbersome to carry around.",
    author: "Jordyn Botosh",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "I absolutely love my new shoes! They are so comfortable and stylish at the same time. The quality is amazing and they have held up really well after multiple wears. I especially love the attention to detail in the design - the little touches really make them stand out.",
    author: "Giana Dokidis",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "I've been using my new handbag for a few weeks now and I'm absolutely in love with it! The size is perfect - it's big enough to hold all of my essentials but not so big that it's cumbersome to carry around.",
    author: "Jordyn Botosh",
    imgSrc: "./Assets/quote.jpg"
  },
];

export default function Comments() {
  return (

    <div className='comments container'>
       <div className="head">
        <div className="title">What our clients have to say!</div>
        <div className="content">80+ Molestie hendrerit amet sapien volutpat.</div>
      </div>
         <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
        340: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
          560: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
       
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >

        {comments.map((comment, index) => (
          <SwiperSlide key={index}>
            <div className="comment-list"><div className="comment-card">
            <div className="img">
                  <img src={comment.imgSrc} alt="" />
                </div>
              <div className="comment-main">{comment.text}</div>
            
                
                <div className="comment-author">{comment.author}</div>
           
            </div></div>
          </SwiperSlide>
        ))}


      </Swiper>
     
      

      
      
    </div>
  );
}
