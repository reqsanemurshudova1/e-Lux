import React, { useEffect, useState } from "react";
import DetailsDesc from "./DetailsDesc";
import ReviewList from "./ReviewList";
import Comment from "./Comment";
import "./common.css";

export default function DescRevDisc({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {

      const response = await fetch(`http://localhost:8000/api/product-reviews/${product.id}`);
      const data = await response.json();
    
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (product.id) {
      fetchReviews();
    }
  }, [product.id]);

  const comments = product.comments || [];

  return (
    <div className="desc-rev-disc container">
      <div className="titles">
        <h2
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </h2>
        <h2
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </h2>
        {/* <h2
          className={activeTab === "discussions" ? "active" : ""}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions ({comments.length})
        </h2> */}
      </div>
      <div className="border"></div>
      <span
        className="activespan"
        style={{
          transform: `translateX(${
            activeTab === "description"
              ? "0%"
              : activeTab === "reviews"
              ? "100%"
              : "200%"
          })`,
        }}
      ></span>
      {activeTab === "description" && <DetailsDesc product={product} />}
      {activeTab === "reviews" && <ReviewList reviews={reviews} rating={product.rating} />}
      {/* {activeTab === "discussions" && (
        <div className="comments-section">
          {comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
          ) : (
            <p>No discussions available.</p>
          )}
        </div>
      )} */}
    </div>
  );
}
