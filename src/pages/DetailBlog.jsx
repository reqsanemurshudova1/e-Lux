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
        const response = await fetch(`/blog.json`); // Bütün blogları çekiyoruz
        const data = await response.json();
        const selectedBlog = data.find((b) => b.id === parseInt(id));
        setBlog(selectedBlog);
        setBlogData(data); // Tüm blogları alıyoruz ve sağ tarafa gönderiyoruz
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogDetail();
  }, [id]);


  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="blogs container ">
      <div className="blog-detail ">
        
        <div className="blog-img-det">
                  <img src={blog.image} alt="blog" />
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
                <div className="blog-content">
                    <p>Tips for Choosing Modest and Elegant Muslim Clothing</p>
                    <p>For Muslim women, choosing modest and elegant clothing can be a challenge. However, with the right selection, Muslim clothing can also look beautiful and charming. Here are some tips for choosing the right Muslim clothing to look modest and elegant.</p>
                    <p>1. Pay Attention to the Fabric</p>
                    <p>Choose high-quality and comfortable fabrics that are breathable, such as cotton, linen, or rayon. Make sure that the fabric is easy to maintain and does not wrinkle easily, so that the clothing always looks neat and beautiful.</p>
                    <p>2. Choose a Style that Fits Your Body Shape</p>
                    <p>Pay attention to your body shape when choosing Muslim clothing. Don't choose clothing that is too loose or too tight. Choose the right style that fits your body shape, such as an A-line top or a flared maxi skirt.</p>
                </div>
        </div>
        <BlogRight blogData={blogData} />
      </div>
    
      <Footer />
    </div>
  );
}
