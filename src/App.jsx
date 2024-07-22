import React, { useEffect } from 'react';
import Home from './pages/Home';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import Search from './pages/Search';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
        <Route path="/" element={<Home />} />
      </Routes>
 
  );
}
