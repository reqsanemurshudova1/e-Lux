import React from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import { useContext } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import { useState } from "react";
import PaymentModal from "../Components/PaymentModal/PaymentModal";





export default function Payment({}) {
  const { selectedProducts, shippingCost, productTotal, totalCost } =
    useContext(CheckoutContext);
    const [isModalOpen, setModalOpen] = useState(false);
const toggle=()=>{

  setModalOpen(!isModalOpen)
}
    const handlePaymentClick = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

  return (
    <div>
      <Navbar />
      <div className="paymentDiv container">
        <form className="paymentForm ">
          <span>Select Payment Method</span>
          <div className="selectPayment">
            <div className="payPal">
              <div className="left">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.83145 2.25H12.9495C14.391 2.25 16.1006 2.29685 17.2444 3.30547C18.0083 3.97929 18.4092 5.05284 18.3166 6.20531C18.0028 10.1134 15.6651 12.3023 12.5304 12.3023H10.0061C9.57657 12.3023 9.29179 12.587 9.17064 13.358L8.46621 17.8388C8.42055 18.1296 8.29452 18.3008 8.0645 18.3216H4.91168C4.56184 18.3216 4.43753 18.0539 4.52898 17.4743L6.79934 3.10026C6.89026 2.52423 7.2054 2.25 7.83145 2.25Z"
                      fill="#1B3D92"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.123 6.75H16.2359C18.9808 6.75 20.0144 8.13948 19.8548 10.1843C19.5917 13.5551 17.5536 15.419 14.8504 15.419H13.4854C13.115 15.419 12.8657 15.664 12.7648 16.3296L12.1794 20.1938C12.1414 20.4448 12.0094 20.5923 11.8111 20.6102H8.60506C8.30338 20.6102 8.19609 20.3794 8.27501 19.8795L10.2329 7.48334C10.3113 6.98648 10.583 6.75 11.123 6.75Z"
                      fill="#00A2D3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 13.1403L9.89368 7.48325C9.9722 6.98652 10.2441 6.75004 10.7841 6.75004H15.897C16.7434 6.75004 17.4271 6.88214 17.963 7.12548C17.4493 10.6037 15.1997 12.5363 12.2539 12.5363H9.72951C9.39735 12.5363 9.14912 12.7061 9 13.1403Z"
                      fill="#1B2E7F"
                    />
                  </svg>
                </span>
                <span>PayPal</span>
              </div>
              <div className="right">
                <label className="custom-checkbox">
                  <input type="radio" name="pay" />
                  <div className="checkbox-box"></div>
                </label>
              </div>
            </div>
            <div className="apple">
              <div className="left">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="24"
                    viewBox="0 0 31 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.03966 8.01212C5.69011 8.40419 5.13083 8.71343 4.57155 8.66925C4.50164 8.13913 4.77545 7.57587 5.09587 7.22798C5.44542 6.82486 6.05713 6.53771 6.55233 6.51562C6.61059 7.06784 6.38338 7.609 6.03966 8.01212ZM6.54625 8.77416C6.05353 8.74728 5.60395 8.91462 5.24082 9.04978C5.00713 9.13675 4.80924 9.21041 4.65868 9.21041C4.48973 9.21041 4.28367 9.13282 4.05231 9.0457C3.74915 8.93154 3.40256 8.80103 3.0391 8.80729C2.20601 8.81834 1.43117 9.26563 1.00589 9.97798C0.132012 11.4027 0.778679 13.5121 1.62342 14.6718C2.03706 15.2461 2.53225 15.8756 3.18475 15.8535C3.4718 15.8432 3.6783 15.7602 3.892 15.6742C4.13802 15.5753 4.39361 15.4725 4.79268 15.4725C5.17791 15.4725 5.42231 15.5726 5.65693 15.6687C5.88001 15.7601 6.09423 15.8479 6.41226 15.8425C7.08805 15.8314 7.51334 15.2682 7.92697 14.6939C8.37336 14.0775 8.56952 13.4759 8.59928 13.3846L8.60277 13.3741C8.60206 13.3734 8.59654 13.371 8.58681 13.3668C8.43758 13.302 7.29707 12.8071 7.28613 11.48C7.27515 10.3661 8.19076 9.80167 8.3349 9.71283L8.33492 9.71282C8.34368 9.70742 8.34959 9.70378 8.35226 9.70188C7.76968 8.8846 6.86085 8.79625 6.54625 8.77416ZM11.2227 15.7818V7.17285H14.6308C16.3902 7.17285 17.6194 8.32145 17.6194 10.0002C17.6194 11.6789 16.3669 12.8385 14.5842 12.8385H12.6325V15.7818H11.2227ZM12.6348 8.29919H14.2602C15.4836 8.29919 16.1827 8.91767 16.1827 10.0055C16.1827 11.0934 15.4836 11.7174 14.2543 11.7174H12.6348V8.29919ZM22.276 14.7491C21.9031 15.4228 21.0817 15.848 20.1962 15.848C18.8854 15.848 17.9707 15.108 17.9707 13.9925C17.9707 12.8881 18.8562 12.2531 20.4933 12.1592L22.2527 12.0598V11.5849C22.2527 10.8836 21.7691 10.5026 20.9069 10.5026C20.1962 10.5026 19.6777 10.8505 19.5728 11.3806H18.3028C18.3436 10.2651 19.4505 9.45337 20.9477 9.45337C22.5615 9.45337 23.6101 10.2541 23.6101 11.4966V15.7817H22.3051V14.7491H22.276ZM20.573 14.8264C19.8215 14.8264 19.3438 14.4841 19.3438 13.9595C19.3438 13.4183 19.804 13.1035 20.6837 13.0538L22.2508 12.96V13.4459C22.2508 14.2521 21.5284 14.8264 20.573 14.8264ZM27.9372 16.1186C27.3721 17.6262 26.7254 18.1231 25.3505 18.1231C25.2457 18.1231 24.8961 18.1121 24.8146 18.09V17.0574C24.902 17.0684 25.1175 17.0795 25.2282 17.0795C25.8516 17.0795 26.2011 16.831 26.4167 16.1849L26.5448 15.8039L24.1562 9.53625H25.6302L27.2905 14.6221H27.3197L28.98 9.53625H30.4132L27.9372 16.1186Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span>Apple Pay</span>
              </div>
              <div className="right">
                <label className="custom-checkbox">
                  <input type="radio" name="pay" />
                  <div className="checkbox-box"></div>
                </label>
              </div>
            </div>
          </div>
          <span>Credit Card</span>
          <input type="text" placeholder="Cardholder Name" />
          <input type="text" placeholder="Card Number" />
          <div className="cardInfo">
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVC" />
            <input type="text" placeholder="Postal code" />
          </div>
        </form>

        <div className="orderSummary container">
          <div className="title">Order Summary</div>
          <div className="products">
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
          <div className="payText">
            <div className="discount">
              <label>Discount code</label>
              <input type="text" />
            </div>
            <div className="Subtotal">
              <span className="grayText">SubTotal</span>
              <span className="bold">${productTotal}</span>
            </div>
            <div className="disc">
              <span className="grayText">Discount:</span>
              <span className="bold">$0</span>
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
              <button onClick={handlePaymentClick}>Continue To Payment</button>
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
