import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Login/Register";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const closeLogin = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = products.products?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchQuery.length > 0) {
        if (!recentSearches.includes(searchQuery)) {
          setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]); 
        }
        navigate(`/search?query=${searchQuery}`);
        closeSearch();
      }
    }
  };

  const removeRecentSearch = (search) => {
    setRecentSearches(recentSearches.filter((item) => item !== search));
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    const results = products.products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <nav className="navbar container">
        <div className="burger-menu" onClick={toggleMenu}>
          {!isOpen ? (
            <img src="/Assets/menu-icon.svg" alt="menu" />
          ) : (
            <img src="/Assets/close-icon.svg" alt="close" />
          )}
          {isOpen && (
            <div className="burger-menu-items">
              <ul>
                <li>
                  <NavLink to="/">Menu</NavLink>
                </li>
                <li>
                  <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                  <NavLink to="/order-tracking">Order tracking</NavLink>
                </li>
                <li>
                  <NavLink to="/blog">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
                <li>
                  <NavLink to="/address">Address</NavLink>
                </li>
              </ul>
              <span className="my-account" onClick={toggleLogin}>
                My Account
              </span>
            </div>
          )}
        </div>
        <div className="nav-left">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-logo">
          <img src="/Assets/Group.jpg" alt="Lux logo" className="logo" />
          <span>LUX</span>
        </div>
        <div className="nav-right">
          {!searchOpen && (
            <div className="search" onClick={toggleSearch}>
              <img src="/Assets/search.jpg" alt="Search" />
              <input type="text" placeholder="Search.." />
            </div>
          )}
          <div className="shop">
            <img src="/Assets/bag-2.jpg" alt="Shop" />
          </div>
          <button className="login-button" onClick={toggleLogin}>
            Login
          </button>
        </div>
      </nav>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
      {searchOpen && (
        <div className="search-modal">
          <div className="search-modal-content">
            <input
              type="text"
              placeholder="Search for a product..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
            <img
              src="/Assets/close-icon.svg"
              alt="Close"
              onClick={closeSearch}
              className="closeSearch"
            />
          </div>
          {searchResults.length > 0 ? (
            <div className="search-results container">
              {searchResults.map((item) => (
                <div className="search-result" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="search-result-details">
                    <div className="left">
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                    </div>
                    <div className="right">
                      <p>$ {item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="recent-searches container">
              {recentSearches.length > 0 ? (
                <div>
                  <h4>Recent Searches:</h4>
                  <ul>
                    {recentSearches.map((search, index) => (
                      <li
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        {search}{" "}
                        <span
                          className="remove-search"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(search);
                          }}
                        >
                          ×
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="no-results">No recent searches</div>
              )}
            </div>
          )}
        </div>
      )}
      {loginOpen && <Login toggleLogin={toggleLogin} closeLogin={closeLogin} />}
      {registerOpen && <Register closeRegister={closeRegister} />}
    </div>
  );
}
