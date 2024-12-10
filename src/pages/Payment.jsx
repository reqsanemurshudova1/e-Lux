import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import { CheckoutContext } from "../context/CheckoutContext";
import PaymentModal from "../Components/PaymentModal/PaymentModal";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

export default function Payment() {
  const { selectedProducts, shippingCost, productTotal, totalCost } =
    useContext(CheckoutContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggle = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [data, setData] = useState([]);
  const [order, setOrder] = useState({});
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
        const response = await axios.get(
          "http://localhost:8000/api/payment-methods"
        );
        setData(response.data?.data || []);
      } catch (error) {
        toast.error("Ödəniş üsullarını əldə edərkən xəta baş verdi")
      }
    };
    fetchPaymentMethods();
  }, []);
  const handlePaymentClick = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Ödəniş metodunu seçin");
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
        size: product.product_size,
        image: product.product_image,
      })),
    };

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8000/api/process-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if ((data.status = "success")) {
        toast.success("Ödəniş uğurla tamamlandı");
        setModalOpen(true);
        setOrder(data?.order);
      }
    } catch (error) {
      console.error("Ödəniş xətası:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <Navbar />
      <div className="paymentDiv container">
        <form className="paymentForm">
          <span>Ödəniş üsulunu seçin</span>
          <div className="selectPayment">
            {data.map((method) => (
              <div className="payPal" key={method.id}>
                <div className="left">
                  <span>
                    <img
                      src={`http://localhost:8000/storage/${method.img}`}
                      alt=""
                    />
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

          <span>Kredit Kart Detalları</span>
          <input
            type="text"
            placeholder="Kart Sahibinin Adı"
            value={card_details.cardholderName}
            onChange={(e) =>
              setcardDetails({
                ...card_details,
                cardholderName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Kart Nömrəsi"
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
                setcardDetails({
                  ...card_details,
                  expirationDate: e.target.value,
                })
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
              placeholder="Poçt Kodu"
              value={card_details.postalCode}
              onChange={(e) =>
                setcardDetails({ ...card_details, postalCode: e.target.value })
              }
            />
          </div>
        </form>

        <div className="orderSummary">
          <div className="title">Sifariş xülasəsi</div>
          <div className="products">
            {selectedProducts.map((product, index) => (
              <div className="product" key={index}>
                <div className="left">
                  <div className="img-container">
                    <img
                      src={`http://localhost:8000/storage/${product.product_image}`}
                      alt={product.name}
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
          <div className="payText">
            <div className="Subtotal">
              <span className="grayText">Aralıq cəm</span>
              <span className="bold">${productTotal}</span>
            </div>
            <div className="shipMeth">
              <span className="grayText">Çatdırılma xərci</span>
              <span className="bold">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="total">
              <span className="grayText">Ümumi</span>
              <span className="bold">${totalCost}</span>
            </div>
            <div className="pay">
              <button onClick={handlePaymentClick} disabled={loading}>
                {loading ? "Emal olunur..." : "Ödənişə Davam Edin"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {isModalOpen && <div className="overlay" onClick={toggle}></div>}
      {isModalOpen && (
        
        <PaymentModal
          order={order}
          selectedProducts={selectedProducts}
          shippingCost={shippingCost}
          productTotal={productTotal}
          totalCost={totalCost}
          selectedPaymentMethod={selectedPaymentMethod}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
