import React, { useEffect, useState } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import Subscribe from "../Components/HomePage/Subscribe/Subscribe";
import Pagination from "../pages/Pagination/"; 

import "./Product.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [sortedProducts, setSortedProducts] = useState([]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="filter container">
        <h1 className="search-heading container">All Products ({products.length})</h1>
        <div className="shortandfilter">
          <div className="short">
            <select>
              <option value="short">Sort By</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
            <img src="./Assets/Sort.svg" alt="Sort" />
          </div>
          <div className="filter1">
            Filter <img src="./Assets/Filter.svg" alt="Filter" />
          </div>
        </div>
      </div>
      <div className="product-result container">
        {currentProducts.map((product) => (
          <div className='prdct-cart' key={product.id} data-aos="zoom-in">
            <div className='prdct-img'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='prdct-desc'>
              <div className='prdct-left'>
                <div className='prdct-name'>{product.name}</div>
                <div className='prdct-category'>{product.category}</div>
              </div>
              <div className='prdct-right'>
                <div className='prdct-price'>${product.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <Subscribe />
      <Footer />
    </div>
  );
}
