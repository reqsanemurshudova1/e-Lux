import React from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleCheckout = () => {
    const selectedProducts = selectedItems.map(index => cart[index]);
    navigate('/checkout', { state: { selectedProducts } });
  };
  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    const newQuantity = updatedCart[index].quantity + 1;
    updateQuantity(index, newQuantity);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    const newQuantity = Math.max(updatedCart[index].quantity - 1, 1);
    updateQuantity(index, newQuantity);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((_, index) => index));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, index) => total + cart[index].price * cart[index].quantity,
      0
    ).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="cart container">
        <h2>My Cart</h2>
        {cart.length > 0 ? (
          <>
            <div className="cartContent">
              <ul className="cart-items">
                <div className="check">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                    <div className="checkbox-box"></div>
                  </label>
                  <div className="all">Select All</div>
                  <div className="cart-Title">
                    <h3>Product</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                  </div>
                </div>

                {cart.map((product, index) => (
                  <li key={index} className="cart-item">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleSelectItem(index)}
                      />
                      <div className="checkbox-box"></div>
                    </label>
                    <div className="cart-item-details">
                      <div className="left">
                        <img
                          src={product.image}
                          alt={product.name}
                          width="50"
                        />
                        <div className="content">
                          <div className="cart-item-name">{product.name}</div>
                          <div className="cart-item-size">
                            Size: {product.size}
                          </div>
                        </div>
                      </div>
                      <div className="center">
                        <div className="cart-item-quantity">
                          <button
                            onClick={() => decrementQuantity(index)}
                            className="quantity-button"
                          >
                            -
                          </button>
                          <p className="quantity-display">
                            <span>{product.quantity || 1}</span>
                          </p>
                          <button
                            onClick={() => incrementQuantity(index)}
                            className="quantity-button"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="right">
                        <div className="cart-item-price">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="orderSum">
                <h3>Order Summary</h3>
                <p>
                  The total cost consists of temporary costs, not including
                  shipping costs
                </p>
                <p>
                  Subtotal: $
                  {calculateTotal()}
                </p>
                <p>
                  Total: $
                  {calculateTotal()}
                </p>
               <button onClick={handleCheckout}>
                 Checkout Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <img src="/Assets/shopBag.svg" alt="Empty Cart" />
            <span>Oops! Your cart is empty</span>
            <p>
              Start exploring our collection now and add your favorite items to
              your cart.
            </p>
            <button>
              <a href="/product">Shop Now</a>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
