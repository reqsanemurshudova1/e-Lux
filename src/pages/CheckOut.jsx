import React from 'react'
import Navbar from '../Components/HomePage/Navbar/Navbar'
import Footer from '../Components/HomePage/Footer/Footer'
import './Cart.css'
export default function 
() {
  return (
    <div>
      <Navbar/>
      <form action="" className='container'>
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

       
      </form>
      <Footer/>
    </div>
  )
}
