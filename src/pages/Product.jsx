import React, { useEffect, useState } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import Subscribe from "../Components/HomePage/Subscribe/Subscribe";
import Pagination from "../pages/Pagination/";
import "./Product.css";
import FilterModal from "../Components/HomePage/FilterModal/FilterModal";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    sortBy: "",
    color: "",
    category: "",
    style: "",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
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
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let newFilteredProducts = products;

      // if (selectedFilter.sortBy) {
      //   newFilteredProducts = newFilteredProducts.sort((a, b) => {
      //     if (selectedFilter.sortBy === 'price') {
      //       return a.price - b.price;
      //     } else if (selectedFilter.sortBy === 'rating') {
      //       return a.rating - b.rating;
      //     } else if (selectedFilter.sortBy === 'date') {
      //       return new Date(b.date) - new Date(a.date);
      //     }
      //     return 0;
      //   });
      // }

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

      if (selectedFilter.style) {
        newFilteredProducts = newFilteredProducts.filter(
          // TODO: filter by style
          (product) => product.style === selectedFilter.style[0]
        );
      }

      setFilteredProducts(newFilteredProducts);
    };

    filterProducts();
  }, [selectedFilter, products]);

  const handleFilterChange = (name, value) => {
    setSelectedFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleResetFilters = () => {
    setSelectedFilter({
      sortBy: "",
      color: "",
      category: "",
      style: "",
    });
  };

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="filter container">
        <h1 className="search-heading container">
          All Products ({products.length})
        </h1>
        <div className={`shortandfilter ${isFilterModalOpen ? "hidden" : ""}`}>
          <div className="short">
            <select
              name="sortBy"
              onChange={(e) =>
                handleFilterChange(e.target.name, e.target.value)
              }
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
        <div className="product-result container">
          {currentProducts.map((product) => (
            <div className="prdct-cart" key={product.id} data-aos="zoom-in">
              <div className="prdct-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="prdct-desc">
                <div className="prdct-left">
                  <div className="prdct-name">{product.name}</div>
                  <div className="prdct-category">{product.category}</div>
                </div>
                <div className="prdct-right">
                  <div className="prdct-price">${product.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={closeFilterModal}
          onFilterChange={handleFilterChange}
          filterValues={selectedFilter}
          onResetFilters={handleResetFilters}
        />
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
