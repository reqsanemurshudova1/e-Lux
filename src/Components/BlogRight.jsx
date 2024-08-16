import React from "react";

export default function BlogRight({ blogData }) {
  return (
    <div className="blog-right">
      <div className="searchBlog">
        <input type="text" placeholder="Search" />
      </div>
      <div className="category-list">
        <h2>Categories</h2>
        <ul>
          <li>Lifestyle</li>
          <li>Promo</li>
          <li>Travel</li>
          <li>Design</li>
          <li>Business</li>
          <li>Fashion</li>
          <li>Brand</li>
        </ul>
      </div>
      <div className="popular-blog">
        <div className="popular-blog-title">Popular Article</div>
        {blogData.slice(0, 4).map((blog, index) => (
          <div key={index} className="popular-blog-item">
            <div className="popular-blog-img">
              <img src={blog.image} alt="blog" />
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
        <div className="popular-author-title">Popular Author</div>
        {blogData.slice(0, 4).map((author, index) => (
          <div key={index} className="popular-author-item">
            <div className="popular-author-img">
              <img src={author.authorImage} alt="author" />
            </div>
            <div className="popular-author-info">
              <div className="popular-author-name">{author.authorName}</div>
              <div className="popular-author-articles">
                {author.authorArticles} Articles
              </div>
            </div>
            <button className="follow-button">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}
