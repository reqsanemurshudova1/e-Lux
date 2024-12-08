import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Login/Register";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown üçün state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();
        setProducts(data.products || data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
     
      axios
        .get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser({ name: response.data.name }))
        .catch((err) => console.error("Failed to fetch user info:", err));
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLogin = () => setLoginOpen(!loginOpen);

  const closeLogin = () => setLoginOpen(false);

  const changeModal = () => {
    setRegisterOpen(!registerOpen);
    setLoginOpen(!loginOpen);
  };

  const closeRegister = () => setRegisterOpen(false);

  const toggleSearch = () => setSearchOpen(!searchOpen);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = products.filter((item) =>
        item.product_name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.length > 0) {
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
      }
      navigate(`/search?query=${searchQuery}`);
      closeSearch();
    }
  };

  const removeRecentSearch = (search) =>
    setRecentSearches(recentSearches.filter((item) => item !== search));

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    const results = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setDropdownOpen(false); // Dropdownu bağla
  };
  const goToCart = async () => {
    if (!user) {
      alert("Please log in to view your cart.");
      toggleLogin(); // Login modalını açar
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        navigate("/mycart", {
          state: { basketItems: data.basketItems, totalPrice: data.totalPrice },
        });
      } else if (response.status === 401) {
        console.error("Unauthorized: Please log in");
      } else if (response.status === 404) {
        console.error("Endpoint not found");
      } else {
        console.error("An error occurred");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
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
                  <NavLink to="/order">Order tracking</NavLink>
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
                <li>
                  <span className="my-account" onClick={toggleLogin}>
                    My Account
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="nav-left">
          <ul>
            <li>
              <NavLink to="/">Ana Səhifə</NavLink>
            </li>
            <li>
              <NavLink to="/product">Məhsullar</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Əlaqə</NavLink>
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
            </div>
          )}
         <div className="shop" onClick={goToCart}>
            <img src="/Assets/bag-2.jpg" alt="Shop" />
          </div>
          {!user ? (
            <button className="login-button" onClick={toggleLogin}>
              Giriş
            </button>
          ) : (
            <div className="user-dropdown">
               <i className="fas fa-user-circle user-icon" onClick={toggleDropdown}></i>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={logout}>Hesabdan çıx</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {loginOpen && (
        <Login
          closeLogin={closeLogin}
          changeModal={changeModal}
          setUser={setUser}
        />
      )}
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
                <Link to={`/product/${item.id}/details`} key={item.id}>
                  <div className="search-result">
                    <img src={item.image} alt={item.name} />
                    <div className="search-result-details">
                      <div className="left">
                        <p>{item.product_name}</p>
                        <p>{item.fit}</p>
                      </div>
                      <div className="right">
                        <p>$ {item.product_price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results">No results found.</div>
          )}
        </div>
      )}
      {registerOpen && <Register closeRegister={closeRegister} />}
    </div>
  );
}
