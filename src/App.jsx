import React, { useEffect } from "react";
import Home from "./pages/Home";
import "aos/dist/aos.css";
import AOS from "aos";
import Search from "./pages/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Details from "./pages/Details";

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
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
