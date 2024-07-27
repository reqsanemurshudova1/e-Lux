import React, { useState } from "react";
import "./FilterModal.css";

const colorNames = {
  Red: "Red",
  Black: "Black",
  Blue: "Blue",
  Green: "#00FF00",
  Purple: "#800080",
  Orange: "#FFA500",
  Pink: "#FFC0CB",
  "Dark Green": "#008000",
  Olive: "#808000",
  Cyan: "#00FFFF",
  Maroon: "#800000",
};

const FilterModal = ({
  isOpen,
  onClose,
  onFilterChange,
  filterValues,
  onResetFilters,
}) => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  if (!isOpen) return null;

  const handleAccordionClick = (section) => {
    setOpenAccordions((prevAccordions) =>
      prevAccordions.includes(section)
        ? prevAccordions.filter((acc) => acc !== section)
        : [...prevAccordions, section]
    );
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedValues = { ...filterValues };

    if (checked) {
      if (!updatedValues[name]) {
        updatedValues[name] = [];
      }
      updatedValues[name].push(value);
    } else {
      updatedValues[name] = updatedValues[name].filter((v) => v !== value);
    }

    onFilterChange(name, updatedValues[name]);
  };

  const handleColorSelect = (color) => {
    const hexColor = colorNames[color] || color;
    setSelectedColors((prevColors) =>
      prevColors.includes(hexColor)
        ? prevColors.filter((c) => c !== hexColor)
        : [...prevColors, hexColor]
    );
    onFilterChange("color", hexColor);
  };

  const handleReset = () => {
    setSelectedColors([]);
    onResetFilters();
  };

  return (
    <div className={`filter-panel ${isOpen ? "open" : ""}`}>
      <div className="filter-panel-header">
        <button className="filter-panel-close" onClick={onClose}>
          X
        </button>
        <h2>Filter</h2>
        <button className="filter-reset" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
      <div className="filter-accordion">
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => handleAccordionClick("category")}
          >
            Kind of Product
          </button>
          {openAccordions.includes("category") && (
            <div className="accordion-content">
              {[
                "T-Shirt",
                "Coats",
                "Trousers",
                "Hoodies",
                "Jackets",
                "Shoes",
                "Socks",
                "Skirts",
              ].map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={filterValues.category?.includes(category) || false}
                    onChange={handleChange}
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => handleAccordionClick("color")}
          >
            Color
          </button>
          {openAccordions.includes("color") && (
            <div className="accordion-content color-grid">
              {Object.entries(colorNames).map(([name, hex]) => (
                <div key={hex} className="color-wrapper">
                  <div
                    className={`color ${
                      selectedColors.includes(hex) ? "selected" : ""
                    }`}
                    style={{ backgroundColor: hex }}
                    onClick={() => handleColorSelect(name)}
                  ></div>
                  <div className="color-name">{name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => handleAccordionClick("style")}
          >
            Style
          </button>
          {openAccordions.includes("style") && (
            <div className="accordion-content">
              {["Basic", "Casual", "Sport", "Classic", "Circular"].map(
                (style) => (
                  <label key={style}>
                    <input
                      type="checkbox"
                      name="style"
                      value={style}
                      checked={filterValues.style?.includes(style) || false}
                      onChange={handleChange}
                    />
                    {style}
                  </label>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
