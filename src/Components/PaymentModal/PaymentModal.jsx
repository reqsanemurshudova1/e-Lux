import React from 'react';
import { Link } from 'react-router-dom';
import { CheckoutContext } from '../../context/CheckoutContext';
import { useContext } from "react";
import "./Modal.css";

export default function PaymentModal() {
    const { selectedProducts, productTotal, shippingCost, totalCost } =
    useContext(CheckoutContext); 
  return (
    <div className='payment-modal'> 
      <div className="modal-header">
        <img src="./Assets/succes.svg" alt="Success" />
        <h2>Payment Successful</h2>
        <p>Thanks for your order, the order confirmation has been sent to customer@gmail.com</p>
        <span className="total-label">Total Payment</span>
        <h2 className="total-amount">$ {totalCost}</h2>
      </div>
      <div className="order-summary-container">   
  <div className="form-inf">
  <div className="top-info">
         <div className="ref-inf">
         <span>Reference number</span>
          <span>123456789</span>

         </div>
         <div className="date-inf">
         <span>Transaction Date</span>
          <span>12/12/2022</span>
         </div>
          </div> 
          <div className="bottom-info">
         <div className="ref-inf">
         <span>Shipping method</span>
          <span>123456789</span>

         </div>
         <div className="date-inf">
         <span>Payment method</span>
          <span>12/12/2022</span>
         </div>
          </div> 
  </div>

        <div className="summary-title">Your order </div>
        <div className="product-list">
          {selectedProducts.map((product, index) => (
           <div className="product" key={index}>
           <div className="left">
             <div className="img-container">
               <img src={product.image} alt={product.name} />
             </div>
           </div>
           <div className="right">
             <div className="infoProduct">
               <span className="title">{product.name}</span>
               <span className="size">Beiges:{product.size}</span>
             </div>
             <div className="priceCheck">
               <span className="bold">${product.price.toFixed(2)}</span>
               <span>x{product.quantity}</span>
             </div>
           </div>
         </div>
          ))}
        </div>
        <div className="payment-summary">
        
          <div className="subtotal">
            <span className="label">SubTotal</span>
            <span className="value">${productTotal}</span>
          </div>
          <div className="discount-amount">
            <span className="label">Discount:</span>
            <span className="value">$0</span>
          </div>
          <div className="shipping-cost">
            <span className="label">Shipping cost</span>
            <span className="value">${shippingCost.toFixed(2)}</span>
          </div>
          <div className="total-cost">
            <span className="label">Total</span>
            <span className="value">${totalCost}</span>
          </div>
          <div className="action-buttons">
            <Link to="/product">
              <button className="continue-shopping">Continue Shopping</button>
            </Link>
            <button className="download-receipt">Download Receipt</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
