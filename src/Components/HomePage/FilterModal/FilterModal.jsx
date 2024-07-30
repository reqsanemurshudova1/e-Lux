import React, { useState } from "react";
import "./FilterModal.css";
import 'antd/dist/reset.css';
import { Slider } from 'antd';

const colorNames = {
  Red: "Red",
  Black: "Black",
  Blue: "Blue",
  Green: "Green",
  White: "White",
  Purple: "Purple",
  Orange: "Orange",
  Pink: "Pink",
  Yellow: "Yellow",
  Olive: "Olive",
  Cyan: "Cyan",
  Brown: "Brown"
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
  const [priceRange, setPriceRange] = useState([20, 50]);

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

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange("price", value);
  };

  const handleReset = () => {
    setSelectedColors([]);
    setPriceRange([20, 50]);
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
           <span> Kind of Product </span>{openAccordions.includes("category") ? "-" : "+"}
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
            onClick={() => handleAccordionClick("price")}
          >
           <span>Price</span> {openAccordions.includes("price") ? "-" : "+"}
          </button>
          {openAccordions.includes("price") && (
            <div className="accordion-content">
              <div style={{ width: 330, margin: '0 auto', padding: '20px' }}>
                <Slider
                  range
                  draggableTrack
                  defaultValue={[20, 50]}
                  value={priceRange}
                  onChange={handlePriceChange}
                />
                <div className="price-range">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => handleAccordionClick("color")}
          >
           <span>Color</span> {openAccordions.includes("color") ? "-" : "+"}
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
            <span>Style </span>{openAccordions.includes("style") ? "-" : "+"}
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
