import React, { useState, useEffect } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";

import "./Details.css";

export default function Details() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProducts(data.products);

        if (data.products.length > 0) {
          setSelectedProduct(data.products[0]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (!selectedProduct) return null;

  return (
    <div>
      <Navbar />
      <div className="product-details">
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
          <div className="product-rate">Rating: {selectedProduct.rating}</div>
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
                >
                
                </span>
              ))}
            </div>
          </div>
         <div className="btn"> <div className="product-price">
           ${selectedProduct.price.toFixed(2)}
          </div>
          <div className="product-btn">
            <button>Add to Cart</button>
          </div></div>
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

      
      <Footer />
    </div>
  );
}
