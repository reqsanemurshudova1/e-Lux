import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import Subscribe from "../Components/HomePage/Subscribe/Subscribe";
import "./Search.css";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <Navbar />
      <div className="filter container">
        <h1 className="search-heading container">
          Search Results for ({filteredProducts.length}) <span className="search-query">"{query}"</span>
        </h1>
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
      {currentProducts.length > 0 ? (
        <div className="search-results1 container">
          {currentProducts.map((product) => (
            <div className="search-result1" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="search-result-details1">
                <div className="left1">
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                </div>
                <div className="right1">
                  <p>$ {product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results"></p>
      )}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <Subscribe />
      <Footer />
    </div>
  );
}


const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage, nextPage, prevPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="pagination-list">
        <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={prevPage} href="#!" className="pagination-link1">
           <img src="./Assets/left.svg" alt="" /> Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="pagination-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`pagination-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a onClick={nextPage} href="#!" className="pagination-link1">
            Next <img src="./Assets/right.svg" alt="" />
          </a>
        </li>
      </ul>
    </nav>
  );
};
