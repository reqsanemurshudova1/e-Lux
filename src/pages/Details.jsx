import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import DescRevDisc from "../Components/HomePage/details/DescRevDisc";
import "./Details.css";
import { Toaster, toast } from "react-hot-toast";

export default function Details() {
  const { id } = useParams(); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [suggestedProducts, setSuggestedProducts] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [selectedColor, setSelectedColor] = useState(""); 
  const [mainImage, setMainImage] = useState("");

  const [selectedSize, setSelectedSize] = useState(null);  

  const handleSizeSelect = (size) => {
      setSelectedSize(size);  
      console.log("Seçilmiş Ölçü:", size);  
  };

  const addToCart = async (product) => {
    if (!selectedSize || !selectedColor) {
      toast.dismiss();
      toast.error("Zəhmət olmasa ölçü və rəngi seçin");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/cart/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          selected_size: selectedSize,
          selected_color: selectedColor,
          quantity: 1,
        }),
      });
  
      if (!response.ok) throw new Error("Məhsul səbətə əlavə edilə bilmədi");
  
      const data = await response.json();
      toast.success(data.message || "Məhsul uğurla səbətə əlavə edildi");
    } catch (error) {
      console.error("Məhsulun səbətə əlavə edilməsində xəta baş verdi:", error);
      toast.error("Məhsul səbətə əlavə edilə bilmədi.");
    }
  };
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/product-details/${id}`);
        if (!response.ok) throw new Error("Məhsul detalları əldə edilə bilmədi");

        const data = await response.json();
        setSelectedProduct(data);

        if (data) {
          setMainImage(
            data.image ? `http://localhost:8000/storage/${data.image}` : "/Assets/default.jpg"
          );

          if (data.category) {
            const responseAll = await fetch("http://localhost:8000/api/products");
            const allProducts = await responseAll.json();
            const suggestions = allProducts.products.filter(
              (p) => p.category === data.category && p.id !== data.id
            );
            setSuggestedProducts(suggestions);
          }
        }
      } catch (error) {
        console.error("Məhsul detalları yüklənərkən xəta baş verdi:", error);
        toast.error("Məhsul detalları əldə edilə bilmədi.");
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  if (!selectedProduct) return <p>Yüklənir...</p>;
// const fetchSuggestedProducts = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:8000/api/products/suggestions/${id}`);
//     if (!response.ok) throw new Error("Oxşar məhsullar əldə edilə bilmədi");

//     const data = await response.json();
//     setSuggestedProducts(data.suggestedProducts || []);
//   } catch (error) {
//     console.error("Oxşar məhsullar yüklənərkən xəta baş verdi:", error);
//     toast.error("Oxşar məhsullar əldə edilə bilmədi.");
//   }
// };

// useEffect(() => {
//   fetchProductDetails();
//   fetchSuggestedProducts(id);
// }, [id]);

  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <Navbar />
      <div className="product-details container">
        <div className="product-details-img">
        <div className="desc-img">
          {(selectedProduct.other_photos || []).map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:8000/storage/${photo}`}
              alt={`Məhsul şəkli ${index}`}
              className={`thumbnail ${photo === mainImage ? "active" : ""}`}
              onClick={() => setMainImage(`http://localhost:8000/storage/${photo}`)} 
            />
          ))}
        </div>

          <div className="main-img">
            <img src={mainImage} alt={selectedProduct.name} />
          </div>
        </div>
        <div className="product-details-desc">
          <h1 className="product-title">{selectedProduct.product_name}</h1>
          <div className="product-rate">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star"
                style={{
                  color: selectedProduct.rating >= star ? "gold" : "gray",
                  fontSize: "25px",
                }}
              >
                ★
              </span>
            ))}
            {selectedProduct.rating}
          </div>

          <div className="product-price">
            {selectedProduct.product_price !== undefined
              ? `${selectedProduct.product_price.toFixed(2)} $`
              : "Qiymət mövcud deyil"}
          </div>
          
          <div className="product-size">
            <div>Ölçünü seçin:</div>
            <div className="size-options">
              {(selectedProduct.product_size || []).map((size) => (
                <span
                  key={size}
                  className={`size-option ${size === selectedSize ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="product-color">
            <div>Rəngi seçin:</div>
            <div className="color-options">
              {(selectedProduct.product_color || []).map((color) => (
                <span
                  key={color}
                  className={`color-option ${
                    color === selectedColor ? "selected" : ""
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="btn">
            <div className="product-btn">
              <button onClick={() => addToCart(selectedProduct)}>
                Səbətə əlavə et
              </button>
            </div>
          </div>
          <div className="payment-details">
            <span>
              <img src="/Assets/securePay.svg" alt="" />
              Təhlükəsiz Ödəniş
            </span>
            <span>
              <img src="/Assets/freeShipping.svg" alt="" />
              Pulsuz Çatdırılma
            </span>
            <span>
              <img src="/Assets/FreeChanges.svg" alt="" />
              Pulsuz Dəyişiklik və Geri Qaytarma
            </span>
            <span>
              <img src="/Assets/sizeFit.svg" alt="" />
              Ölçü və Uyğunluq
            </span>
          </div> 
        </div>
      </div>
      <DescRevDisc product={selectedProduct} />
      <div className="interested container">
        <h2>Sizi Maraqlandıra Bilər</h2>
        <div className="product-cards1">
          {suggestedProducts.map((product) => (
            <Link
              to={`/details/${product.id}`}
              className="prdct-cart"
              key={product.id}
              data-aos="zoom-in"
            >
              <div className="prdct-img">
                <img src={product.image} alt={product.product_name} />
              </div>
              <div className="prdct-desc">
                <div className="prdct-left">
                  <div className="prdct-name">{product.product_name}</div>
                  <div className="prdct-category">{product.category}</div>
                </div>
                <div className="prdct-right">
                  <div className="prdct-price">{product.product_price.toFixed(2)} $</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
