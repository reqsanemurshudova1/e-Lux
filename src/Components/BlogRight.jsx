import React from "react";

export default function BlogRight({ blogData }) {
  return (
    <div className="blog-right">
      <div className="searchBlog">
        <input type="text" placeholder="Axtar" />
      </div>
      <div className="category-list">
        <h2>Kategoriyalar</h2>
        <ul>
          <li>Həyat tərzi</li>
          <li>Promo</li>
          <li>Səyahət</li>
          <li>Dizayn</li>
          <li>Biznes</li>
          <li>Dəb</li>
          <li>Brend</li>
        </ul>
      </div>
      <div className="popular-blog">
        <div className="popular-blog-title">Məhşur bloglar</div>
        {blogData.slice(0, 4).map((blog, index) => (
          <div key={index} className="popular-blog-item">
            <div className="popular-blog-img">
            <img src={`http://localhost:8000/storage/${blog.image}`} alt="blog" />

            </div>
            <div className="popular-blog-desc">
              <div className="popular-blog-title">{blog.title}</div>
              <div className="popular-blog-date">
                {blog.date} | by {blog.seller}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="popular-author">
        <div className="popular-author-title">Məhşur müəlliflər</div>
        {blogData.slice(0, 4).map((author, index) => (
          <div key={index} className="popular-author-item">
            <div className="popular-author-img">
              <img src={`http://localhost:8000/storage/${author.author_image}`} alt="author" />
            </div>
            <div className="popular-author-info">
              <div className="popular-author-name">{author.author}</div>
              <div className="popular-author-articles">
                {author.authorArticles} Articles
              </div>
            </div>
            <button className="follow-button">İzlə</button>
          </div>
        ))}
      </div>
    </div>
  );
}
