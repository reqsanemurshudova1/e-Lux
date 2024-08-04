import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import DescRevDisc from "../Components/HomePage/details/DescRevDisc";
import "./Details.css";

export default function Details() {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data.products);

        const product = data.products.find((p) => p.id.toString() === id);
        setSelectedProduct(product);

        if (product) {
          const suggestions = data.products.filter(
            (p) => p.category === product.category && p.id !== product.id
          );
          setSuggestedProducts(suggestions);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="product-details container">
        <div className="product-details-img">
          <div className="desc-img">
            {selectedProduct.images.map((img, index) => (
              <img key={index} src={img} alt={`Product detail ${index}`} />
            ))}
          </div>
          <div className="main-img">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
        </div>
        <div className="product-details-desc">
          <h1 className="product-title">{selectedProduct.name}</h1>
          <div className="product-rate">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star"
                style={{
                  color: selectedProduct.rating >= star ? "gold" : "gray",
                  fontSize: "25px",
                }}
              >
                ★
              </span>
            ))}
            {selectedProduct.rating}
          </div>
          <div className="product-size">
            <div>Select Size:</div>
            <div className="size-options">
              {Object.keys(selectedProduct.sizesInStock).map((size) => (
                <span
                  key={size}
                  className={`size-option ${selectedProduct.sizesInStock[size] ? 'in-stock' : 'out-of-stock'}`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="product-color">
            <div>Select Color:</div>
            <div className="color-options">
              {Object.keys(selectedProduct.colors).map((color) => (
                <span
                  key={color}
                  className={`color-option ${selectedProduct.colors[color] ? 'in-stock' : 'out-of-stock'}`}
                  style={{ backgroundColor: selectedProduct.colors[color] ? color.toLowerCase() : '#ddd' }}
                />
              ))}
            </div>
          </div>
          <div className="btn">
            <div className="product-price">${selectedProduct.price.toFixed(2)}</div>
            <div className="product-btn">
              <button>Add to Cart</button>
            </div>
          </div>
          <div className="payment-details">
            <span>
              <img src="/Assets/securePay.svg" alt="" />
              Secure Payment
            </span>
            <span>
              <img src="/Assets/freeShipping.svg" alt="" />
              Free Shipping
            </span>
            <span>
              <img src="/Assets/FreeChanges.svg" alt="" />
              Free Changes & Return
            </span>
            <span>
              <img src="/Assets/sizeFit.svg" alt="" />
              Size & Fit
            </span>
          </div>
        </div>
      </div>
      <DescRevDisc product={selectedProduct} />
      <div className="interested container">
        <h2>You May Be Interested</h2>
        <div className="product-cards1">
          {suggestedProducts.map((product) => (
            <Link to={`/details/${product.id}`} className="prdct-cart" key={product.id} data-aos="zoom-in">
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
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
