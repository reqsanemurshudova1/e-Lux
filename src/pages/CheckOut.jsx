import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { CheckoutContext } from "../context/CheckoutContext";

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedProducts,
    setSelectedProducts,
    shippingCost,
    setShippingCost,
    productTotal,
    setProductTotal,
    totalCost,
    setTotalCost,
  } = useContext(CheckoutContext);

  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });
  // console.log(selectedProducts);


  useEffect(() => {
    if (location.state?.selectedProducts) {
      setSelectedProducts(location.state.selectedProducts);
    }
    const total = location.state?.selectedProducts
    ?.reduce((total, product) => total + product.product_price * product.quantity, 0)
    .toFixed(2) || 0;
  
    setProductTotal(total);
    setTotalCost((parseFloat(total) + shippingCost).toFixed(2));
  }, [
    location.state,
    setSelectedProducts,
    setProductTotal,
    shippingCost,
    setTotalCost,
  ]);

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (isFormValid()) {
      try {
        const response = await fetch("http://localhost:8000/api/shipping-address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            shippingCost: parseFloat(shippingCost),
            selectedProducts,
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message || "Shipping details saved successfully!");
  
          navigate("/payment", {
            state: {
              selectedProducts,
              shippingCost,
              productTotal,
              totalCost,
            },
          });
        } else {
          toast.error(result.message || "Failed to save shipping details.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };
  

  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <Navbar />
      <div className="checkOut container">
        <div className="form">
        <form onSubmit={handleSubmit}>
  <label htmlFor="country">Ölkəni seçin</label>
  <select
    name="country"
    id="country"
    value={formData.country}
    onChange={handleInputChange}
  >
    <option value="">Ölkəni seçin</option>
    <option value="Azerbaycan">Azərbaycan</option>
    <option value="Turkiye">Türkiyə</option>
    <option value="Almanya">Almaniya</option>
  </select>

  <label>Çatdırılma ünvanı</label>
  <input
    type="text"
    name="fullName"
    placeholder="Tam adınızı daxil edin"
    value={formData.fullName}
    onChange={handleInputChange}
  />
  <div className="info">
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="phoneNumber"
      placeholder="Telefon nömrəsi"
      value={formData.phoneNumber}
      onChange={handleInputChange}
    />
  </div>
  <input
    type="text"
    name="streetAddress"
    placeholder="Küçənin adı və ev nömrəsini daxil edin"
    value={formData.streetAddress}
    onChange={handleInputChange}
  />
  <div className="city-info">
    <input
      type="text"
      name="city"
      placeholder="Şəhər"
      value={formData.city}
      onChange={handleInputChange}
    />
    <select
      name="state"
      id="state"
      value={formData.state}
      onChange={handleInputChange}
    >
      <option value="">Bölgə</option>
      <option value="State1">Bölgə1</option>
      <option value="State2">Bölgə2</option>
      <option value="State3">Bölgə3</option>
    </select>
  </div>
  <input
    type="text"
    name="postalCode"
    placeholder="Poçt kodu"
    value={formData.postalCode}
    onChange={handleInputChange}
  />
</form>

          <div className="payMethod">
            <div className="dhl">
              <div className="left">
                <div className="logo">
                  {/* DHL logo SVG */}
                </div>
                <div className="text">
                  <span>DHL</span>
                  <span>3 business days</span>
                </div>
              </div>
              <div className="right">
                <span>FREE</span>
                <label className="custom-checkbox">
                  <input
                    type="radio"
                    name="shipping"
                    onChange={() => setShippingCost(0)}
                  />
                  <div className="checkbox-box"></div>
                </label>
              </div>
            </div>
            <div className="fedex">
              <div className="left">
                <div className="logo">
                  {/* Fedex logo SVG */}
                </div>
                <div className="text">
                  <span>Fedex</span>
                  <span>Next day</span>
                </div>
              </div>
              <div className="right">
                <span>$0.88</span>
                <label className="custom-checkbox">
                  <input
                    type="radio"
                    name="shipping"
                    onChange={() => setShippingCost(0.88)}
                  />
                  <div className="checkbox-box"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="orderSummary">
  <div className="title">Sifariş Xülasəsi</div>
  <div className="products">
    {selectedProducts && selectedProducts.map((product, index) => (
      <div className="product" key={index}>
        <div className="left">
          <div className="img-container">
            <img src={`http://localhost:8000/storage/${product.product_image || ""}`} alt={product.product_name || "Məhsul"} />
          </div>
        </div>
        <div className="right">
          <div className="infoProduct">
            <span className="title">{product.product_name || "N/A"}</span>
            <span className="size">Ölçü: {product.product_size || "N/A"}</span>
          </div>
          <div className="priceCheck">
            <span className="bold">${(product.product_price || 0).toFixed(2)}</span>
            <span>x{product.quantity || 0}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className="payText">
    <div className="discount">
      <label>Endirim Kodu</label>
      <input type="text" className="discountInput" />
    </div>
    <div className="Subtotal">
      <span className="grayText">Cəmi Məbləğ</span>
      <span className="bold">${productTotal}</span>
    </div>
    <div className="disc">
      <span className="grayText">Endirim:</span>
      <span className="bold">$0</span>
    </div>
    <div className="shipMeth">
      <span className="grayText">Çatdırılma Haqqı</span>
      <span className="bold">${shippingCost.toFixed(2)}</span>
    </div>
    <div className="total">
      <span className="grayText">Ümumi Məbləğ</span>
      <span className="bold">${totalCost}</span>
    </div>
    <div className="pay">
      <Link to="/payment">
        <button onClick={handleSubmit}>Ödənişə Davam Et</button>
      </Link>
    </div>
  </div>
</div>

      </div>
      <Footer />
    </div>
  );
}