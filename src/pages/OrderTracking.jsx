import React from 'react';
import Navbar from '../Components/HomePage/Navbar/Navbar';
import Footer from '../Components/HomePage/Footer/Footer';
import './Cart.css';
const order = {
  id: 1,
  date: "Thursday 13, 2022",
  refNumber: "1234567890",
  products: [
    {
      name: "Product 1",
      image: "/Assets/T-Shirt.png",
      price: 29.99,
      color: "Red",
      size: "M"
    },
    {
      name: "Product 2",
      image: "/Assets/dress.png",
      price: 39.99,
      color: "Blue",
      size: "L"
    }
  ],
  
};

export default function OrderTracking() {
  return (
    <div>
      <Navbar />
      <div className="order-tracking">
        <h2>Order Tracking</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Date</th>
              <th>Ref Number</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index}>
                <td className="product-info">
                  <img src={product.image} alt={product.name} />
                  <div>
                    <p>{product.name}</p>
                    <p>Size <span>{product.size}</span></p>
                  </div>
                </td>
                <td>{order.date}</td>
                <td>{order.refNumber}</td>
                <td>${product.price}</td>
                <td>
                  <button className="track-order-button">Track order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
