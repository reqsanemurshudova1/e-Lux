
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import DescRevDisc from "../Components/HomePage/details/DescRevDisc";
import "./Details.css";
import { Toaster, toast } from "react-hot-toast";

export default function Details() {
  const { id } = useParams(); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [suggestedProducts, setSuggestedProducts] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); 
  const [mainImage, setMainImage] = useState("");


  const addToCart = (product) => {
    if (!selectedSize || !selectedColor) {
      toast.dismiss();
      toast.error("Please select size and color");
      return;
    }

    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (p) =>
        p.id === product.id &&
        p.size === selectedSize &&
        p.color === selectedColor
    );

    if (existingProductIndex > -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.dismiss();
    toast.success("Product added to cart");
  };

 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/product-details/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");

        const data = await response.json();
        setSelectedProduct(data);

        if (data) {
          setMainImage(
            data.image ? `http://localhost:8000/storage/${data.image}` : "/Assets/default.jpg"
          );

         
          if (data.category) {
            const responseAll = await fetch("http://localhost:8000/api/products");
            const allProducts = await responseAll.json();
            const suggestions = allProducts.products.filter(
              (p) => p.category === data.category && p.id !== data.id
            );
            setSuggestedProducts(suggestions);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  if (!selectedProduct) return <p>Loading...</p>;


  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <Navbar />
      <div className="product-details container">
        <div className="product-details-img">
          <div className="desc-img">
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:8000/storage/${img}`}
                alt={`Product detail ${index}`}
                className={`thumbnail ${img === mainImage ? "active" : ""}`}
                onClick={() => setMainImage(`http://localhost:8000/storage/${img}`)}
              />
            ))}
          </div>
          <div className="main-img">
            <img src={mainImage} alt={selectedProduct.name} />
          </div>
        </div>
        <div className="product-details-desc">
          <h1 className="product-title">{selectedProduct.product_name}</h1>
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
          <div className="product-price">
            {selectedProduct.product_price !== undefined
              ? `$${selectedProduct.product_price.toFixed(2)}`
              : "Price not available"}
          </div>
          <div className="product-size">
            <div>Select Size:</div>
            <div className="size-options">
  {(selectedProduct.product_size || []).map((size) => (
    <span
      key={size}
      className={`size-option ${size === selectedSize ? "selected" : ""}`}
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </span>
  ))}
</div>


          </div>
          <div className="product-color">
            <div>Select Color:</div>
            <div className="color-options">
  {(selectedProduct.product_color || []).map((color) => (
    <span
      key={color}
      className={`color-option ${
        color === selectedColor ? "selected" : ""
      }`}
      style={{
        backgroundColor: color.toLowerCase(),
      }}
      onClick={() => setSelectedColor(color)}
    />
  ))}
</div>

          </div>
          <div className="btn">
            <div className="product-btn">
              <button onClick={() => addToCart(selectedProduct)}>
                Add to Cart
              </button>
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
            <Link
              to={`/details/${product.id}`}
              className="prdct-cart"
              key={product.id}
              data-aos="zoom-in"
            >
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
