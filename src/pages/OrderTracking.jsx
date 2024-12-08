import React, { useEffect, useState } from 'react';
import Navbar from '../Components/HomePage/Navbar/Navbar';
import Footer from '../Components/HomePage/Footer/Footer';
import './Cart.css';

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);

 
  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
          },
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.data);
          // console.log(orders);
        } else {
          console.error('Error fetching orders:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, []);

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
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="product-info">
                  {order.order_details.map((product, idx) => (
                    <div key={idx}>
                      <img src={`http://localhost:8000/storage/${product.image}`} alt={product.product_name} />
                      <div>
                        <p>{product.product_name}</p>
                        <p>Size <span>{product.size}</span></p>
                      </div>
                    </div>
                  ))}
                </td>
                <td>{order.created_at}</td>
                <td>{order.uid}</td>
                <td>${order.total}</td>
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
