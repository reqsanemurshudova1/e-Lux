import React from "react";
import Navbar from "../Components/HomePage/Navbar/Navbar";

import Support from "../Components/HomePage/Supported/Support";
import Comments from "../Components/HomePage/Comments/Comments";
import Advertising from "../Components/HomePage/Advertising/Advertising";
import Services from "../Components/HomePage/Services/Services";
import Subscribe from "../Components/HomePage/Subscribe/Subscribe";
import Footer from "../Components/HomePage/Footer/Footer";
import Hero from "../Components/HomePage/HeroSection/Hero";
import Ourproducts from "../Components/ourProducts/Ourproducts";
import Discount from "../Components/HomePage/Product/Discount";


export default function Home() {
  return (
    <div>
      <Navbar />
    
      <Hero />
      <Ourproducts />
      <Discount />
      <Support />
      <Comments />
      <Advertising />
      <Services />
      <Subscribe />
      <Footer />
    </div>
  );
}
