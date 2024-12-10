import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Ourproducts.css';

export default function Ourproducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedGender, setSelectedGender] = useState('All');
  const [showAllProducts, setShowAllProducts] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();


      const transformedData = data.products.map(product => ({
        id: product.id,
        name: product.product_name,
        price: product.product_price,
        category: product.category ? product.category.category_name : 'Unknown',
        image: product.image ? `http://localhost:8000/storage/${product.image}` : '/Assets/default.jpg',
      }));

      setProducts(transformedData);
      setFilteredProducts(transformedData.slice(0, 3));

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductsForCategory = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/product/category/" + selectedCategory);
        const data = await response.json();

        if (data.products) {
          const transformedData = data.products.map(product => ({
            id: product.id,
            name: product.product_name,
            price: product.product_price,
            category: product.category ? product.category.category_name : 'Unknown',
            image: product.image ? `http://localhost:8000/storage/${product.image}` : '/Assets/default.jpg',
          }));

          setProducts(transformedData);
          setFilteredProducts(transformedData)
        } else {
          setProducts([]);
          setFilteredProducts([])
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log(selectedCategory)
    if (selectedCategory != 0) {
      fetchProductsForCategory();
    } else {
      fetchProducts()
    }

  }, [selectedCategory]);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowAllProducts(false);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setShowAllProducts(false);
  };

  const handleSeeAllProducts = () => {
    setFilteredProducts(products); 
    setShowAllProducts(true); 
  };
  

  return (
    <div className='ourproducts container'>
      <div className='productTitle'>Bizim məhsullar</div>
      <div className='category'>
        <div className='gen-category'>
          <select className='gender' onChange={(e) => handleGenderChange(e.target.value)}>
            <option value='0'>Bütün məhsullar</option>
            <option value='1'>Qadın</option>
            <option value='2'>Kişi</option>
            <option value='3'>Uşaq</option>
            <option value='4'>Unisex</option>
          </select>
          <img src='/Assets/arrow.svg' alt='arrow' />
        </div>
        <div className={`bütün məhsullar ${selectedCategory === '0' ? 'active' : ''}`} onClick={() => handleCategoryChange('0')}>Bütün məhsullar</div>
        <div className={`t-shirt ${selectedCategory === '1' ? 'active' : ''}`} onClick={() => handleCategoryChange('1')}>T-Shirt</div>
        <div className={`köynək ${selectedCategory === '2' ? 'active' : ''}`} onClick={() => handleCategoryChange('2')}>Köynək</div>
        <div className={`şalvar ${selectedCategory === '3' ? 'active' : ''}`} onClick={() => handleCategoryChange('3')}>Şalvar</div>
        <div className={`aksesuar ${selectedCategory === '4' ? 'active' : ''}`} onClick={() => handleCategoryChange('4')}>Aksesuar</div>
      </div>

      <div className='product-cards1'>
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}/details`} key={product.id}>
            <div className='prdct-cart' data-aos="zoom-in">
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
          </Link>
        ))}
      </div>

      <div className="prdct-btn">
        <button onClick={handleSeeAllProducts}>Bütün məhsullar </button>
      </div>
    </div>
  );
}
