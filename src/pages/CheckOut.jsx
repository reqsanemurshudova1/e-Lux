import React, { useState } from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { CheckoutContext } from "../context/CheckoutContext";
import { useContext } from "react";

export default function CheckOut() {
  const location = useLocation();
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
  const navigate = useNavigate();

  
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  React.useEffect(() => {
    if (location.state?.selectedProducts) {
      setSelectedProducts(location.state.selectedProducts);
    }
    const total = location.state?.selectedProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
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
    return (
      country &&
      fullName &&
      email &&
      phoneNumber &&
      streetAddress &&
      city &&
      state &&
      postalCode
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate("/payment");
    } else {
   
      alert("Please fill out all the fields");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="checkOut container">
        <div className="form container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Select country</label>
            <select
              name=""
              id=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select country</option>
              <option value="Azerbaycan">Azerbaycan</option>
              <option value="Turkiye">Türkiye</option>
              <option value="Almanya">Almanya</option>
            </select>

            <label>Shipping Address</label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <div className="info">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Enter street name and house number"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className="city-info">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <select
                name=""
                id=""
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                <option value="State1">State1</option>
                <option value="State2">State2</option>
                <option value="State3">State3</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
        
          </form>
          <div className="payMethod">
            <div className="dhl">
              <div className="left">
                <div className="logo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="32"
                    viewBox="0 0 75 32"
                    fill="none"
                  >
                    <path
                      d="M13.1891 9.67993L10.793 12.9459H23.8521C24.5124 12.9459 24.5042 13.1953 24.1814 13.6364C23.8537 14.0824 23.3053 14.8539 22.971 15.3082C22.8014 15.5378 22.4951 15.9557 23.5095 15.9557H28.8501L30.4326 13.7983C31.4141 12.4618 30.5183 9.68158 27.009 9.68158L13.1891 9.67993Z"
                      fill="#D80613"
                    />
                    <path
                      d="M9.82313 20.3202L14.6367 13.7586H20.6096C21.27 13.7586 21.2618 14.0097 20.939 14.4491L19.7204 16.1143C19.5508 16.3439 19.2445 16.7619 20.2589 16.7619H28.259C27.5954 17.6771 25.4348 20.3202 21.5615 20.3202H9.82313ZM37.3872 16.7602L34.777 20.3202H27.8918L30.5019 16.7602H37.3872ZM47.9333 15.9541H31.0948L35.6992 9.67993H42.5812L39.943 13.2779H43.0143L45.6558 9.67993H52.5377L47.9333 15.9541ZM47.3421 16.7602L44.7319 20.3202H37.8499L40.4601 16.7602H47.3421ZM0 18.1644H10.141L9.58764 18.9193H0V18.1644ZM0 16.7602H11.1719L10.6169 17.5152H0V16.7602ZM0 19.5686H9.11172L8.56004 20.3202H0V19.5686ZM75 18.9193H64.8953L65.4502 18.1644H75V18.9193ZM75 20.3202H63.8693L64.4193 19.5686H75V20.3202ZM66.4795 16.7602H75V17.5168H65.9262L66.4795 16.7602ZM62.0694 9.67993L57.4649 15.9541H50.1713L54.779 9.67993H62.0694ZM49.5817 16.7602C49.5817 16.7602 49.0794 17.4507 48.8341 17.7811C47.9711 18.954 48.7336 20.3185 51.5546 20.3185H62.6079L65.218 16.7602H49.5817Z"
                      fill="#D80613"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="57"
                    height="32"
                    viewBox="0 0 57 32"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_42_993)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.5 -12H56.5V44H0.5V-12Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M47.0041 19.0334L45.0251 16.8136L43.0641 19.0334H38.9383L42.9714 14.501L38.9383 9.96854H43.1933L45.1913 12.1698L47.1148 9.96854H51.2225L47.2078 14.4824L51.2774 19.0331L47.0041 19.0334ZM31.0117 19.0334V4.75366H38.9383V7.93663H34.3687V9.96854H38.9383V13.0307H34.3687V15.8415H38.9383V19.0334H31.0117Z"
                        fill="#D9782D"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M27.6689 4.75354V10.5974H27.632C26.8921 9.74646 25.967 9.45042 24.8941 9.45042C22.6957 9.45042 21.0398 10.9455 20.4587 12.9207C19.7955 10.7441 18.086 9.41033 15.5515 9.41033C13.4926 9.41033 11.8674 10.3342 11.0191 11.8397V9.96842H6.76406V7.93651H11.4075V4.75354H2.9707V19.0333H6.76406V13.0305H10.5443C10.428 13.4919 10.3699 13.9661 10.3715 14.4419C10.3715 17.4206 12.6471 19.5109 15.5515 19.5109C17.9933 19.5109 19.6028 18.3639 20.4541 16.2733H17.2037C16.7641 16.9023 16.4303 17.0883 15.5515 17.0883C14.5323 17.0883 13.6532 16.1993 13.6532 15.145H20.2722C20.5592 17.5107 22.4023 19.5513 24.9313 19.5513C26.0225 19.5513 27.0216 19.0147 27.632 18.1083H27.6689V19.0333H31.0122V4.75354H27.6689ZM13.7587 13.0732C13.9696 12.1668 14.6727 11.5736 15.5515 11.5736C16.5181 11.5736 17.1857 12.1482 17.3615 13.0732H13.7587ZM25.6396 16.8593C24.4072 16.8593 23.6414 15.7103 23.6414 14.5116C23.6414 13.2295 24.3076 11.9974 25.6396 11.9974C27.0213 11.9974 27.5707 13.2295 27.5707 14.5116C27.5707 15.7269 26.9879 16.8593 25.6396 16.8593ZM41.499 25.8333V25.5852C41.8252 25.5698 41.949 25.43 41.949 25.1968V23.0878C41.949 22.5606 41.856 22.39 41.4685 22.3746V22.1265L42.5382 22.1239V22.9792H42.5541C42.6547 22.5759 42.9344 22.033 43.399 22.033C43.7276 22.033 43.9847 22.2953 43.9847 22.7107C43.9847 23.0036 43.8162 23.1596 43.6154 23.1596C43.4446 23.1596 43.2528 23.0472 43.2528 22.7543C43.2528 22.5678 43.4112 22.4138 43.4899 22.381C43.4768 22.3084 43.3981 22.2808 43.3644 22.2808C42.8894 22.2808 42.616 23.4208 42.616 24.096V25.1962C42.616 25.4295 42.7409 25.5692 43.2685 25.5846V25.8327H41.499V25.8333ZM39.1004 24.1279C39.1004 22.8092 39.4874 22.3281 39.8909 22.3281C40.2869 22.3281 40.5661 22.8092 40.5661 24.0036C40.5661 25.1828 40.2869 25.679 39.8761 25.679C39.5577 25.6787 39.1004 25.322 39.1004 24.1279ZM38.1216 22.3755C38.3264 22.3958 38.4325 22.4615 38.4325 22.775V26.6101C38.4325 26.8431 38.3093 26.9814 37.936 26.9977V27.2464H39.6739V26.9977C39.2239 26.9814 39.1001 26.8431 39.1001 26.6101V25.4231H39.1155C39.2704 25.7101 39.5263 25.9268 39.9293 25.9268C40.7753 25.9268 41.3258 25.0506 41.3258 23.9803C41.3258 23.1887 40.8842 22.0338 39.9993 22.0338C39.5034 22.0338 39.1855 22.3906 39.0687 22.763H39.0539V22.1245H38.1216V22.3755ZM30.4382 25.8368V25.5878C30.9175 25.5561 31.0125 25.4637 31.0125 25.0608V21.2779C31.0125 20.8744 30.9178 20.7823 30.4382 20.7503V20.5025H34.0976V22.3703H33.8486C33.6755 21.3677 33.3832 20.7503 32.4765 20.7503C31.9265 20.7503 31.7711 20.9211 31.7711 21.2779V22.8909H32.0564C32.6078 22.8909 32.7458 22.6035 32.8321 21.9592H33.0796V24.0994H32.8321C32.7243 23.4484 32.5218 23.1855 32.0416 23.1855H31.7708V25.0608C31.7708 25.3711 31.8876 25.5878 32.3524 25.5878C33.3527 25.5878 33.8204 25.1076 33.957 23.9138H34.2054V25.8368H30.4382ZM37.9645 25.8368H36.3518V25.5878C36.6458 25.5878 36.7088 25.5178 36.7088 25.4178C36.7088 25.3089 36.6397 25.2226 36.058 24.3476C35.5688 25.1227 35.4837 25.2694 35.4837 25.3708C35.4837 25.5018 35.6074 25.5715 35.8402 25.5875V25.8365H34.5113V25.5875C34.8091 25.5416 35.0119 25.4332 35.2437 25.0759L35.8872 24.0832L34.8954 22.5789C34.7943 22.4243 34.724 22.3938 34.4756 22.3781V22.1294H36.0104V22.3781C35.771 22.3781 35.6632 22.4005 35.6632 22.5408C35.6632 22.6489 35.7472 22.7192 36.2902 23.5559C36.7707 22.7973 36.8491 22.711 36.8491 22.5489C36.8491 22.4403 36.7634 22.3781 36.4758 22.3781V22.1294H37.7469V22.3781C37.5789 22.3781 37.3532 22.5022 37.1742 22.7575L36.461 23.8046L37.4142 25.2627C37.5409 25.4579 37.6469 25.548 37.9642 25.5872L37.9645 25.8368ZM44.8109 23.6648C44.8109 22.673 45.1061 22.2863 45.5474 22.2863C45.9582 22.2863 46.1909 22.673 46.1909 23.6648H44.8109ZM46.9515 23.9585C46.9515 22.8429 46.4079 22.0373 45.5477 22.0373C44.6726 22.0373 44.0527 22.8429 44.0527 23.9827C44.0527 24.9527 44.6866 25.9286 45.6494 25.9286C46.3841 25.9286 46.7865 25.4835 46.9425 24.7389L46.6944 24.6933C46.5552 25.2392 46.2984 25.6337 45.7252 25.6337C45.206 25.6337 44.8112 25.0442 44.8112 23.9583L46.9515 23.9585ZM47.3475 25.8368V24.5402H47.5964C47.6726 25.0291 47.9875 25.6802 48.5572 25.6802C48.9442 25.6802 49.2394 25.4481 49.2394 25.0065C49.2394 24.0068 47.3794 24.4489 47.3794 23.0841C47.3794 22.6033 47.7289 22.0373 48.4105 22.0373C48.8361 22.0373 49.0069 22.2697 49.1464 22.2697C49.2237 22.2697 49.2393 22.1849 49.2713 22.1297H49.5183V23.254H49.2713C49.185 22.8191 48.9241 22.2863 48.4413 22.2863C48.1002 22.2863 47.8751 22.5106 47.8751 22.8432C47.8751 23.7744 49.7969 23.3554 49.7969 24.781C49.7969 25.263 49.4183 25.9289 48.5967 25.9289C48.077 25.9289 47.9221 25.6497 47.7347 25.6497C47.6508 25.6497 47.6116 25.7665 47.5967 25.8371H47.3475V25.8368ZM50.0586 25.8368V24.5402H50.3076C50.3837 25.0291 50.6981 25.6802 51.2684 25.6802C51.6553 25.6802 51.9499 25.4481 51.9499 25.0065C51.9499 24.0068 50.0906 24.4489 50.0906 23.0841C50.0906 22.6033 50.4401 22.0373 51.1222 22.0373C51.5473 22.0373 51.7181 22.2697 51.8581 22.2697C51.9348 22.2697 51.9499 22.1849 51.9825 22.1297H52.2294V23.254H51.9825C51.8962 22.8191 51.6353 22.2863 51.1524 22.2863C50.8114 22.2863 50.5862 22.5106 50.5862 22.8432C50.5862 23.7744 52.5086 23.3554 52.5086 24.781C52.5086 25.263 52.1295 25.9289 51.3073 25.9289C50.7881 25.9289 50.6333 25.6497 50.4459 25.6497C50.3619 25.6497 50.3233 25.7665 50.3079 25.8371H50.0586V25.8368Z"
                        fill="#43338E"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M52.1934 18.1133C52.1936 17.9927 52.2176 17.8732 52.264 17.7619C52.3104 17.6505 52.3784 17.5494 52.4639 17.4643C52.5494 17.3792 52.6509 17.3118 52.7625 17.2659C52.8741 17.2201 52.9937 17.1966 53.1143 17.197C53.2347 17.1969 53.3538 17.2206 53.465 17.2666C53.5762 17.3127 53.6772 17.3802 53.7622 17.4653C53.8473 17.5504 53.9147 17.6514 53.9607 17.7626C54.0066 17.8738 54.0302 17.993 54.0301 18.1133C54.0307 18.234 54.0076 18.3536 53.9618 18.4653C53.9161 18.577 53.8488 18.6785 53.7637 18.764C53.6786 18.8496 53.5774 18.9174 53.4659 18.9637C53.3545 19.01 53.235 19.0338 53.1143 19.0337C52.9933 19.0342 52.8734 19.0107 52.7615 18.9646C52.6496 18.9185 52.5479 18.8507 52.4623 18.7652C52.3767 18.6797 52.3089 18.578 52.2627 18.4661C52.2165 18.3543 52.193 18.2344 52.1934 18.1133ZM53.8688 18.1133C53.8688 17.6982 53.5318 17.358 53.114 17.358C52.9132 17.3576 52.7204 17.4369 52.5779 17.5785C52.4355 17.7201 52.3551 17.9125 52.3543 18.1133C52.3542 18.2131 52.3738 18.3119 52.4119 18.4042C52.4501 18.4964 52.506 18.5801 52.5766 18.6507C52.6472 18.7212 52.731 18.7772 52.8232 18.8153C52.9154 18.8534 53.0142 18.8729 53.114 18.8728C53.2135 18.8726 53.312 18.8529 53.4038 18.8146C53.4956 18.7764 53.579 18.7204 53.6491 18.6498C53.7193 18.5792 53.7748 18.4955 53.8125 18.4035C53.8502 18.3114 53.8693 18.2128 53.8688 18.1133ZM52.9185 18.1741V18.6409H52.75V17.5611H53.0995C53.2971 17.5611 53.5025 17.6157 53.5025 17.8591C53.5025 17.9835 53.4269 18.0814 53.2822 18.111V18.1162C53.4322 18.1453 53.4484 18.2112 53.4656 18.3283C53.4804 18.4303 53.4923 18.5424 53.5298 18.6406H53.3148C53.3023 18.5802 53.2851 18.5114 53.2779 18.4474C53.2654 18.3548 53.2654 18.2688 53.2166 18.2179C53.175 18.1738 53.119 18.1784 53.06 18.1738L52.9185 18.1741ZM53.0966 18.0067C53.2555 18.0006 53.2918 17.935 53.2918 17.8522C53.2918 17.7723 53.2555 17.7301 53.1216 17.7301H52.9185V18.0067H53.0966Z"
                        fill="#D9782D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_993">
                        <rect
                          width="56"
                          height="32"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
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
              <Link to="/payment">
                {" "}
                <button onClick={handleSubmit}>Continue To Payment</button>
              </Link>
            </div>
          </div>
        </div>
     
      </div>
      <Footer />
    </div>
  );
}
