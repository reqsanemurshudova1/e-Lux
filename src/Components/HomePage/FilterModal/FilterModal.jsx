import React, { useState, useEffect } from "react";
import "./FilterModal.css";
import "antd/dist/reset.css";
import { Slider } from "antd";

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
  Brown: "#A52A2A",
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
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [priceRange, setPriceRange] = useState([20, 50]);
  const [noResults, setNoResults] = useState(false);
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  console.log(categories);

  useEffect(() => {
    if (items) {
      const filteredItems = items.filter((item) => {
        const matchesPrice =
          item.price >= priceRange[0] && item.price <= priceRange[1];
        const matchesColor =
          selectedColors.length === 0 || selectedColors.includes(item.color);
        const matchesCategory =
          !filterValues.category ||
          filterValues.category.includes(item.category);
        const matchesStyle =
          !filterValues.style || filterValues.style.includes(item.style);

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
    const { name, value, checked, id } = e.target;
    const updatedValues = { ...filterValues };

    if (name === "category") {
      if (checked) {
        if (!updatedValues[name]) {
          updatedValues[name] = [];
        }
        updatedValues[name].push(id);
      } else {
        updatedValues[name] = updatedValues[name].filter((v) => v !== id);
      }

    }

    // console.log(updatedValues);

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
    const updatedColors = selectedColors.includes(hexColor)
      ? selectedColors.filter((c) => c !== hexColor)
      : [...selectedColors, hexColor];
    setSelectedColors(updatedColors);
    onFilterChange("color", updatedColors);
  };

  const handleStyleSelect = (selectedStyle) => {
    const updatedStyles = selectedStyles.includes(selectedStyle)
      ? selectedStyles.filter((style) => style !== selectedStyle)
      : [...selectedStyles, selectedStyle];

    setSelectedStyles(updatedStyles);
    onFilterChange("style", updatedStyles);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange("price", value);
  };

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedStyles([]);
    setPriceRange([20, 50]);

    const resetFilters = {
      category: [],
      style: [],
      color: [],
      price: [20, 50],
    };

    onFilterChange("reset", resetFilters);
    onResetFilters();
  };

  return (
    <div className={`filter-panel ${isOpen ? "open" : ""}`}>
      <div className="filter-panel-header">
        <button className="filter-panel-close" onClick={onClose}>
          X
        </button>
        <h2>Filtrlə</h2>
        <button className="filter-reset" onClick={handleReset}>
          sıfırla
        </button>
      </div>
      <div className="filter-accordion">
        {[
          {
            key: "category",
            title: "Məhsul Növləri",
            options: [...categories.map((a) => a.category_name)],
            id: [...categories.map((a) => a.id)],
          },
          {
            key: "style",
            title: "Stil",
            options: ["Sadə", "Gündəlik", "İdman", "Klassik", "Dairəvi"],
          },
        ].map(({ key, title, options, id }) => (
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
                {options.map((option, index) => (
                  <label
                    key={option}
                    className={`filter-option ${
                      filterValues[key]?.includes(option) ? "selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={key}
                      value={option}
                      checked={filterValues[key]?.includes(option) || false}
                      onChange={handleChange}
                      id={id ? id[index] : ""}
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
            <span>Qiymət</span> {openAccordions.includes("price") ? "-" : "+"}
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
            <span>Rəng</span> {openAccordions.includes("color") ? "-" : "+"}
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
      </div>
      {noResults && (
        <div className="no-results-message">
          Seçilmiş filtrlərə uyğun nəticə tapılmadı.
        </div>
      )}
    </div>
  );
};

export default FilterModal;
