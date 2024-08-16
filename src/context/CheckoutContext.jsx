import React, { createContext, useState } from 'react';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  return (
    <CheckoutContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        shippingCost,
        setShippingCost,
        productTotal,
        setProductTotal,
        totalCost,
        setTotalCost,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
