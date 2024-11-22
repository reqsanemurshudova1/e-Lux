export default function DetailsDesc({ product }) {
  if (!product?.products_description) return <p>Description not available</p>;

  const { origin, material, care_instructions } = product.products_description;

  return (
    <div className="details-desc">
      <p>
        <strong>Origin:</strong> {origin || "Unknown"}
      </p>
      <p>
        <strong>Material:</strong> {material || "Not specified"}
      </p>
      <p>
        <strong>Care Instructions:</strong> {care_instructions || "Not provided"}
      </p>
    </div>
  );
}
