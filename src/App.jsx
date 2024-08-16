import React, { useEffect } from "react";
import Home from "./pages/Home";
import "aos/dist/aos.css";
import AOS from "aos";
import Search from "./pages/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Details from "./pages/Details";
import MyCart from "./pages/MyCart";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";
import Blog from "./pages/Blog";
import DetailBlog from "./pages/DetailBlog";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/product" element={<Product />} />
      <Route path="/details" element={<Details />} />
      <Route path="/details/:id" element={<Details/>} />

      <Route path="/" element={<Home />} />
      <Route path="/mycart" element={<MyCart />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<DetailBlog />} />
      <Route path="/checkout" element={<CheckOut/>} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/product/:id/details" element={<Details />} />
      <Route path="/product/:id/review" element={<Details />} />
      <Route path="/product/:id/discussion" element={<Details />} />

    </Routes>
  );
}
