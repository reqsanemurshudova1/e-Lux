import React from 'react';
import './Comment.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const comments = [
  {
    text: "Bu markadan ən gözəl paltarı yeni aldım və alışımda heç bir peşmançılığım yoxdur! Paltar yüksək keyfiyyətli materiallardan hazırlanıb və əla uyğun gəlir. Rəngi çox canlıdır və kəsimi çox təsir edicidir.",
    author: "James Lipshutz",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "Yeni ayaqqabılarımı tamamilə sevirəm! Həm çox rahatdır, həm də şıx görünürlər. Keyfiyyəti inanılmazdır və bir neçə dəfə geyildikdən sonra hələ də yaxşı vəziyyətdədir. Xüsusilə dizayndakı detallara diqqət etməyimi çox bəyənirəm - kiçik toxunuşlar onları fərqləndirir.",
    author: "Giana Dokidis",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "Yeni çantamı bir neçə həftədir istifadə edirəm və ona tamamilə aşiqəm! Ölçüsü mükəmməldir - bütün vacib əşyalarımı daşıyacaq qədər böyükdür, amma daşımaqda çətinlik yaratacaq qədər böyük deyil.",
    author: "Jordyn Botosh",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "Yeni ayaqqabılarımı tamamilə sevirəm! Həm çox rahatdır, həm də şıx görünürlər. Keyfiyyəti inanılmazdır və bir neçə dəfə geyildikdən sonra hələ də yaxşı vəziyyətdədir. Xüsusilə dizayndakı detallara diqqət etməyimi çox bəyənirəm - kiçik toxunuşlar onları fərqləndirir.",
    author: "Giana Dokidis",
    imgSrc: "./Assets/quote.jpg"
  },
  {
    text: "Yeni çantamı bir neçə həftədir istifadə edirəm və ona tamamilə aşiqəm! Ölçüsü mükəmməldir - bütün vacib əşyalarımı daşıyacaq qədər böyükdür, amma daşımaqda çətinlik yaratacaq qədər böyük deyil.",
    author: "Jordyn Botosh",
    imgSrc: "./Assets/quote.jpg"
  },
];

export default function Comments() {
  return (
    <div className='comments container'>
       <div className="head">
        <div className="title">Müştərilərimizin nə dediyini oxuyun!</div>
        <div className="content">80+ müxtəlif məhsullar ilə geniş seçim imkanı.</div>
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
