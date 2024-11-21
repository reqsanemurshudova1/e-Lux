import React from "react";

export default function DetailsDesc({ product }) {
 
  const details = product?.details || {};

  return (
    <div className="details-desc">
      <p>
        <strong>Origin:</strong> {details.origin || "Unknown"}
      </p>
      <p>
        <strong>Material:</strong> {details.material || "Not specified"}
      </p>
      <p>
        <strong>Care Instructions:</strong> {details.careInstructions || "Not provided"}
      </p>
    </div>
  );
}
