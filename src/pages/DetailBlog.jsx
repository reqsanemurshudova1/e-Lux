import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import BlogRight from "../Components/BlogRight";


export default function DetailBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/posts/${id}`); // Laravel API URL
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const selectedBlog = await response.json();
        setBlog(selectedBlog);
    
        const allBlogsResponse = await fetch(`http://localhost:8000/api/posts`);
        const allBlogsData = await allBlogsResponse.json();
        setBlogData(allBlogsData.posts);
      } catch (error) {
        console.error(error);
      }
    };
    
    
    fetchBlogDetail();
  }, [id]);


  return (
    <div>
      <Navbar />
      <div className="blogs container ">
      <div className="blog-detail ">
      <div className="blog-img-det">
  <img src={`http://localhost:8000/storage/${blog?.image}`} alt="blog" />
</div>
<div className="blog-desc">
  <div className="top-desc">
    <div className="blog-category">{blog?.category}</div>
    <div className="blog-date">
      <span>{new Date(blog?.created_at).toLocaleDateString()}/</span> 
      <span>{blog?.seller}</span>
    </div>
  </div>
  <div className="blog-title">{blog?.title}</div>
</div>
<div className="blog-content">
  <p>{blog?.content}</p>
</div>

        </div>
        <BlogRight blogData={blogData} />
      </div>
    
      <Footer />
    </div>
  );
}
