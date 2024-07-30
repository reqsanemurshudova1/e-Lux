import React, { useState, useEffect } from 'react';
import './Ourproducts.css';

export default function Ourproducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        let data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products.slice(0, 3)); 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (selectedGender === 'All' || product.gender === selectedGender)
    );
    setFilteredProducts(showAllProducts ? filtered : filtered.slice(0, 3));
  }, [selectedCategory, selectedGender, products, showAllProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowAllProducts(false);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setShowAllProducts(false);
  };

  const handleSeeAllProducts = () => {
    setShowAllProducts(true); 
  };

  return (
    <div className='ourproducts container'>
      <div className='productTitle'>Our Products</div>
      <div className='category'>
        <div className='gen-category'>
          <select className='gender' onChange={(e) => handleGenderChange(e.target.value)}>
            <option value='Women'>Women</option>
            <option value='Men'>Men</option>
            <option value='Kids'>Kids</option>
            <option value='Unisex'>Unisex</option>
          </select>
          <img src='/Assets/arrow.svg' alt='' />
        </div>
        <div className={`all ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryChange('All')}>All</div>
        <div className={`t-shirt ${selectedCategory === 'T-Shirt' ? 'active' : ''}`} onClick={() => handleCategoryChange('T-Shirt')}>T-Shirt</div>
        <div className={`shirt ${selectedCategory === 'Shirt' ? 'active' : ''}`} onClick={() => handleCategoryChange('Shirt')}>Shirt</div>
        <div className={`pants ${selectedCategory === 'Pants' ? 'active' : ''}`} onClick={() => handleCategoryChange('Pants')}>Pants</div>
        <div className={`accessories ${selectedCategory === 'Accessories' ? 'active' : ''}`} onClick={() => handleCategoryChange('Accessories')}>Accessories</div>
      </div>

      <div className='product-cards1' >
        {filteredProducts.map((product) => (
          <div className='prdct-cart' key={product.id}data-aos="zoom-in">
            <div className='prdct-img'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='prdct-desc'>
              <div className='prdct-left'>
                <div className='prdct-name'>{product.name}</div>
                <div className='prdct-category'>{product.category}</div>
              </div>
              <div className='prdct-right'>
                <div className='prdct-price'>${product.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="prdct-btn">
        <button onClick={handleSeeAllProducts}>See All Products</button>
      </div>
    </div>
  );
}