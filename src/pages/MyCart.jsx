import React, { useState, useEffect } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.basketItems || []);
      } else {
        console.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:8000/api/cart/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        fetchCart();
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:8000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        fetchCart();
      } else {
        console.error("Failed to remove product from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
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
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      console.error("No items selected for checkout");
      return;
    }
  
    const selectedProductsDetails = selectedItems
      .filter((index) => cart[index]?.product)
      .map((index) => ({
        id: cart[index].product.id,
        product_name: cart[index].product.product_name,
        product_price: cart[index].product.product_price,
        quantity: cart[index].stock_count,
        image: `http://localhost:8000/storage/${cart[index].product.image}`,
        product_size: cart[index].selected_size || "N/A",
        product_color: cart[index].selected_color || "N/A",
      }));
  
    navigate("/checkout", { state: { selectedProducts: selectedProductsDetails } });
  };
  

  const calculateTotal = () => {
    return selectedItems
      .reduce(
        (total, index) =>
          total +
          (cart[index]?.product?.product_price || 0) *
            (cart[index]?.stock_count || 1),
        0
      )
      .toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="cart container">
        <h2>My Cart</h2>
        {cart.length > 0 ? (
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

              {cart.map((item, index) => (
                <li key={item.id} className="cart-item">
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
                        src={`http://localhost:8000/storage/${item.product.image}`}
                        alt={item.product.product_name}
                        width="50"
                      />
                      <div className="content">
                        <div className="cart-item-name">
                          {item.product.product_name}
                        </div>
                        <div className="cart-item-size">
                          Size: {item.selected_size || "N/A"}
                          <br />
                          Color: {item.selected_color || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="center">
                      <div className="cart-item-quantity">
                        <button
                          className="quantity-button"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          -
                        </button>
                        <p className="quantity-display">
                          <span>{item.stock_count}</span>
                        </p>
                        <button
                          className="quantity-button"
                          onClick={() => addToCart(item.product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="right">
                      <div className="cart-item-price">
                        ${(item.product.product_price * item.stock_count).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="orderSum">
              <h3>Order Summary</h3>
              <p>
                Subtotal: $<span>{calculateTotal()}</span>
              </p>
              <p>
                Total: $<span>{calculateTotal()}</span>
              </p>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout Now
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <img src="/Assets/shopBag.svg" alt="Empty Cart" />
            <span>Oops! Your cart is empty</span>
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
