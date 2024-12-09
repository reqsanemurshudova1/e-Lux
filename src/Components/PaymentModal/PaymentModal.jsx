import React from "react";
import { Link } from "react-router-dom";
import { CheckoutContext } from "../../context/CheckoutContext";
import { useContext } from "react";
import "./Modal.css";
import { useState, useEffect } from "react";

export default function PaymentModal({ order }) {
  // const [orders, setOrders] = useState({});

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8000/api/orders/order_info",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       if (data.success) {
  //         setOrders(data?.data || {});
  //         // console.log(orders);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  const {
    selectedProducts,
    productTotal,
    shippingCost,
    totalCost,
    selectedPaymentMethod,
  } = useContext(CheckoutContext);
  return (
    <div className="payment-modal">
      <div className="modal-header">
        <img src="./Assets/succes.svg" alt="Uğurla" />
        <h2>Ödəniş Uğurla Tamamlandı</h2>
        <p>
          Təşəkkür edirik! Sifariş təsdiqi customer@gmail.com ünvanına
          göndərildi
        </p>
        <span className="total-label">Ümumi Ödəniş</span>
        <h2 className="total-amount">$ {totalCost}</h2>
      </div>
      <div className="order-summary-container">
        <div className="form-inf">
          <div className="top-info">
            <div className="ref-inf">
              <span>İstinad Nömrəsi</span>
              <span>{order?.uid}</span>
            </div>
            <div className="date-inf">
              <span>Əməliyyat Tarixi</span>
              <span>
                {order?.created_at.split("T")[0]}
              </span>
            </div>
          </div>
          <div className="bottom-info">
            <div className="ref-inf">
              <span>Çatdırılma Adresi</span>
              <span>
                {order?.address}
              </span>
            </div>
            <div className="date-inf">
              <span>Ödəniş Metodu</span>
              <span>{order?.payment_type}</span>
            </div>
          </div>
        </div>

        <div className="summary-title">Sizin Sifarişiniz</div>
        <div className="product-list">
          {selectedProducts.map((product, index) => (
            <div className="product" key={index}>
              <div className="left">
                <div className="img-container">
                  <img
                    src={`http://localhost:8000/storage/${product.product_image}`}
                    alt={product.product_name}
                  />
                </div>
              </div>
              <div className="right">
                <div className="infoProduct">
                  <span className="title">{product.product_name}</span>
                  <span className="size">Ölçü: {product.product_size}</span>
                </div>
                <div className="priceCheck">
                  <span className="bold">
                    ${product.product_price.toFixed(2)}
                  </span>
                  <span>x{product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="payment-summary">
          <div className="subtotal">
            <span className="label">Cəmi Məbləğ</span>
            <span className="value">${productTotal}</span>
          </div>
          <div className="discount-amount">
            <span className="label">Endirim:</span>
            <span className="value">$0</span>
          </div>
          <div className="shipping-cost">
            <span className="label">Çatdırılma Haqqı</span>
            <span className="value">${shippingCost.toFixed(2)}</span>
          </div>
          <div className="total-cost">
            <span className="label">Ümumi</span>
            <span className="value">${totalCost}</span>
          </div>
          <div className="action-buttons">
            <Link to="/product">
              <button className="continue-shopping">
                Alış-verişə Davam Et
              </button>
            </Link>
            <button className="download-receipt">Qəbzi Yüklə</button>
          </div>
        </div>
      </div>
    </div>
  );
}
