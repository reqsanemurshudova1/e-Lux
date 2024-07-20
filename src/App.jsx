import React, { useEffect } from 'react';
import Home from './pages/Home';
import 'aos/dist/aos.css'; 
import AOS from 'aos';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}
