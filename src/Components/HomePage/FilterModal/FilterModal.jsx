import React, { useState, useEffect } from "react";
import "./FilterModal.css";
import 'antd/dist/reset.css';
import { Slider } from 'antd';

const colorNames = {
  Red: "#FF0000",
  Black: "#000000",
  Blue: "#0000FF",
  Green: "#008000",
  White: "#FFFFFF",
  Purple: "#800080",
  Orange: "#FFA500",
  Pink: "#FFC0CB",
  Yellow: "#FFFF00",
  Olive: "#808000",
  Cyan: "#00FFFF",
  Brown: "#A52A2A"
};

const FilterModal = ({
  isOpen,
  onClose,
  onFilterChange,
  filterValues,
  onResetFilters,
  items, 
}) => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([20, 50]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (items) {

      const filteredItems = items.filter(item => {
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(item.color);
        const matchesCategory = !filterValues.category || filterValues.category.includes(item.category);
        const matchesStyle = !filterValues.style || filterValues.style.includes(item.style);

        return matchesPrice && matchesColor && matchesCategory && matchesStyle;
      });

      setNoResults(filteredItems.length === 0);
    }
  }, [selectedColors, priceRange, filterValues, items]);

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
    onFilterChange("color", selectedColors);
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
        {[
          {
            key: "category",
            title: "Kind of Product",
            options: ["T-Shirt", "Coats", "Trousers", "Hoodies", "Jackets", "Shoes", "Socks", "Skirts"]
          },
          {
            key: "style",
            title: "Style",
            options: ["Basic", "Casual", "Sport", "Classic", "Circular"]
          }
        ].map(({ key, title, options }) => (
          <div className="accordion-item" key={key}>
            <button
              className="accordion-header"
              aria-expanded={openAccordions.includes(key)}
              onClick={() => handleAccordionClick(key)}
            >
              <span>{title}</span> {openAccordions.includes(key) ? "-" : "+"}
            </button>
            {openAccordions.includes(key) && (
              <div className="accordion-content">
                {options.map((option,index) => (
                  <label key={option} className={`filter-option ${filterValues[key]?.includes(option) ? "selected" : ""}`}>
                    <input
                      type="checkbox"
                      name={key}
                      value={index}
                      checked={filterValues[key]?.includes(option) || false}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="accordion-item">
          <button
            className="accordion-header"
            aria-expanded={openAccordions.includes("price")}
            onClick={() => handleAccordionClick("price")}
          >
            <span>Price</span> {openAccordions.includes("price") ? "-" : "+"}
          </button>
          {openAccordions.includes("price") && (
            <div className="accordion-content">
              <div className="slider-container">
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
            aria-expanded={openAccordions.includes("color")}
            onClick={() => handleAccordionClick("color")}
          >
            <span>Color</span> {openAccordions.includes("color") ? "-" : "+"}
          </button>
          {openAccordions.includes("color") && (
            <div className="accordion-content color-grid">
              {Object.entries(colorNames).map(([name, hex]) => (
                <div key={hex} className="color-wrapper">
                  <div
                    className={`color ${selectedColors.includes(hex) ? "selected" : ""}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => handleColorSelect(name)}
                  ></div>
                  <div className="color-name">{name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {noResults && (
        <div className="no-results-message">
          No results match the selected filters.
        </div>
      )}
    </div>
  );
};

export default FilterModal;
