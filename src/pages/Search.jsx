import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import Subscribe from "../Components/HomePage/Subscribe/Subscribe";
import FilterModal from "../Components/HomePage/FilterModal/FilterModal";

import "./Search.css";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    sortBy: "",
    price: "",
    color: "",
    category: "",
    style: "",
  });

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

  useEffect(() => {
    const filterProducts = () => {
      let newFilteredProducts = products;

      if (selectedFilter.sortBy) {
        newFilteredProducts = newFilteredProducts.sort((a, b) => {
          if (selectedFilter.sortBy === 'price') {
            return a.price - b.price;
          } else if (selectedFilter.sortBy === 'rating') {
            return a.rating - b.rating;
          } else if (selectedFilter.sortBy === 'date') {
            return new Date(b.date) - new Date(a.date);
          }
          return 0;
        });
      }

      if (selectedFilter.price) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.price <= selectedFilter.price
        );
      }

      if (selectedFilter.color) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.color === selectedFilter.color
        );
      }

      if (selectedFilter.category) {
        newFilteredProducts = newFilteredProducts.filter((product) =>
          product.category.includes(selectedFilter.category)
        );
      }

      if (selectedFilter.style.length > 0) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => selectedFilter.style.includes(product.style)
        );
      }

      setFilteredProducts(newFilteredProducts);
    };

    filterProducts();
  }, [selectedFilter, products]);

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

  const handleFilterChange = (name, value) => {
    setSelectedFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleResetFilters = () => {
    setSelectedFilter({
      sortBy: "",
      price: "",
      color: "",
      category: "",
      style: "",
    });
  };

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  return (
    <div>
      <Navbar />
      <div className="filter container">
        <h1 className="search-heading container">
          Search Results for ({filteredProducts.length}) <span className="search-query">"{query}"</span>
        </h1>
        <div className="shortandfilter">
          <div className="short">
            <select
              className="sortBy"
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              value={selectedFilter.sortBy}
            >
              <option value="">Sort By</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
            <img src="./Assets/Sort.svg" alt="Sort" />
          </div>
          <div className="filter1" onClick={openFilterModal}>
            Filter <img src="./Assets/Filter.svg" alt="Filter" />
          </div>
        </div>
      </div>
     <div className="productAndFilter">
     {currentProducts.length > 0 ? (
        <div className="search-results1 container">
          {currentProducts.map((product) => (
            <Link to={`/product/${product.id}/details`} key={product.id}>
              <div className="search-result1">
                <img src={product.image} alt={product.name} />
                <div className="search-result-details1">
                  <div className="left1">
                    <p >{product.name}</p>
                    <p>{product.category}</p>
                  </div>
                  <div className="right1">
                    <p>$ {product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found</p>
      )}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onFilterChange={handleFilterChange}
        filterValues={selectedFilter}
        onResetFilters={handleResetFilters}
      />
     </div>
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
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav className="pagination">
    <ul className="pagination-list">
      <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a onClick={prevPage} href="#!" className="pagination-link1">
         <img src="./Assets/left.svg" alt="Previous" /> Previous
        </a>
      </li>
      {pageNumbers.slice(startPage - 1, endPage).map(number => (
        <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
          <a onClick={() => paginate(number)} href="#!" className="pagination-link">
            {number}
          </a>
        </li>
      ))}
      <li className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a onClick={nextPage} href="#!" className="pagination-link1">
          Next <img src="./Assets/right.svg" alt="Next" />
        </a>
      </li>
    </ul>
  </nav>
  );
};
