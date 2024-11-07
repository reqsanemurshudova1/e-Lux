import React, { useEffect, useState } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import "./blog.css";
import Pagination from "../pages/Pagination/";
import { Link } from "react-router-dom";
import BlogRight from "../Components/BlogRight";

export default function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setBlogData(data.posts); 
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(blogData.length / blogsPerPage)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogData.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Navbar />
      <div className="blogs container">
        <div className="blog-left">
          {currentBlogs.map((blog, index) => (
            <Link to={`/blog/${blog.id}`} key={index}>
              <div className="blog" data-aos="zoom-in">
                <div className="blog-img">
                <img src={`http://localhost:8000/storage/${blog.image}`} alt="blog" />

                </div>
                <div className="blog-desc">
                  <div className="top-desc">
                    <div className="blog-category">{blog.category}</div>
                    <div className="blog-date">
                      <span>{blog.date}</span> <span>{blog.seller}</span>
                    </div>
                  </div>
                  <div className="blog-title">{blog.title}</div>
                </div>
              </div>
            </Link>
          ))}
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <BlogRight blogData={blogData} />
      </div>
      <Footer />
    </div>
  );
}
