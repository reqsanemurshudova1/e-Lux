import React from "react";

export default function DetailsDesc({ product }) {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-desc">
      
      <p><strong>Origin:</strong> {product.details.origin}</p>
      <p><strong>Material:</strong> {product.details.material}</p>
      <p><strong>Care Instructions:</strong> {product.details.careInstructions}</p>
    </div>
  );
}
