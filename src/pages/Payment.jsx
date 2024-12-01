import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import { CheckoutContext } from "../context/CheckoutContext";
import PaymentModal from "../Components/PaymentModal/PaymentModal";

import axios from "axios";

export default function Payment() {
  const { selectedProducts, shippingCost, productTotal, totalCost } = useContext(CheckoutContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggle=()=>{
  
    setModalOpen(!isModalOpen)
  }
     
      const closeModal = () => {
        setModalOpen(false);
      };


  const [data, setData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [card_details, setcardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/payment-methods");
        setData(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };
    fetchPaymentMethods();
  }, []);

  const handlePaymentClick = async () => {

    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const payload = {
      paymentMethodId: selectedPaymentMethod,
      card_details: selectedPaymentMethod === 1 ? card_details : null,
      totalAmount: totalCost,
      products: selectedProducts.map((product) => ({
        id: product.id,
        name: product.product_name,
        price: product.product_price,
        quantity: product.quantity,
      })),
    };
  console.log("Payload:", payload);
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/process-payment", payload);
      if (response.data.success) {

        setModalOpen(true); // Modalı aç
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="paymentDiv container">
        <form className="paymentForm">
          <span>Select Payment Method</span>
          <div className="selectPayment">
            {data.map((method) => (
              <div className="payPal" key={method.id}>
                <div className="left">
                  <span>
                    <img src={`http://localhost:8000/storage/${method.img}`} alt="" />
                  </span>
                  <span>{method.name}</span>
                </div>
                <div className="right">
                  <label className="custom-checkbox">
                  <input
  type="radio"
  name="pay"
  onChange={() => setSelectedPaymentMethod(method.id)}
/>
                    <div className="checkbox-box"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>

         
            
              <span>Credit Card Details</span>
              <input
                type="text"
                placeholder="Cardholder Name"
                value={card_details.cardholderName}
                onChange={(e) =>
                  setcardDetails({ ...card_details, cardholderName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Card Number"
                value={card_details.cardNumber}
                onChange={(e) =>
                  setcardDetails({ ...card_details, cardNumber: e.target.value })
                }
              />
              <div className="cardInfo">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={card_details.expirationDate}
                  onChange={(e) =>
                    setcardDetails({ ...card_details, expirationDate: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={card_details.cvc}
                  onChange={(e) =>
                    setcardDetails({ ...card_details, cvc: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={card_details.postalCode}
                  onChange={(e) =>
                    setcardDetails({ ...card_details, postalCode: e.target.value })
                  }
                />
              </div>
         


        </form>

        <div className="orderSummary">
          <div className="title">Order Summary</div>
          <div className="products">
            {selectedProducts.map((product, index) => (
              <div className="product" key={index}>
                <div className="left">
                  <div className="img-container">
                    <img src={`http://localhost:8000/storage/${product.product_image}`} alt={product.name} />
                  </div>
                </div>
                <div className="right">
                  <div className="infoProduct">
                    <span className="title">{product.product_name}</span>
                    <span className="size">Beiges: {product.product_size}</span>
                  </div>
                  <div className="priceCheck">
                    <span className="bold">${product.product_price.toFixed(2)}</span>
                    <span>x{product.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="payText">
            <div className="Subtotal">
              <span className="grayText">Subtotal</span>
              <span className="bold">${productTotal}</span>
            </div>
            <div className="shipMeth">
              <span className="grayText">Shipping cost</span>
              <span className="bold">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="total">
              <span className="grayText">Total</span>
              <span className="bold">${totalCost}</span>
            </div>
            <div className="pay">
              <button onClick={handlePaymentClick} disabled={loading}>
                {loading ? "Processing..." : "Continue To Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
       {isModalOpen && <div className="overlay" onClick={toggle}></div>}
      {isModalOpen && (
        <PaymentModal
          selectedProducts={selectedProducts}
          shippingCost={shippingCost}
          productTotal={productTotal}
          totalCost={totalCost}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
