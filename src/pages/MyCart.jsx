import React, { useState, useEffect } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        headers: {
          // aa etmisiz_)))))) daha doğrusu gpt edib həə? kasjdsftebiki
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
        fetchCart(); // Sepeti güncelle
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

  const calculateTotal = () => {
    return selectedItems
      .reduce(
        (total, index) =>
          total + cart[index].product.price * cart[index].stock_count,
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
          <div>
            <div className="cartContent">
              <ul>
                {cart.map((item, index) => (
                  <li key={item.id}>
                    <img src={item.product.image} alt={item.product.name} />
                    <p>{item.product.name}</p>
                    <p>Price: ${item.product.price}</p>
                    <p>Quantity: {item.stock_count}</p>
                    <button onClick={() => addToCart(item.product.id)}>
                      +
                    </button>
                    <button onClick={() => removeFromCart(item.product.id)}>
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <h3>Total: ${calculateTotal()}</h3>
              </div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
