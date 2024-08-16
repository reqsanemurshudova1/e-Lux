import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CheckoutProvider } from './context/CheckoutContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <CheckoutProvider>
 <BrowserRouter>
 
 <App />
 </BrowserRouter>
 </CheckoutProvider>

)
