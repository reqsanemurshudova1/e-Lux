import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../Components/HomePage/Navbar/Navbar";
import Footer from "../Components/HomePage/Footer/Footer";
import Subscribe from "../Components/HomePage/Subscribe/Subscribe";
import FilterModal from "../Components/HomePage/FilterModal/FilterModal";
import Pagination from "../pages/Pagination/";
import "./Product.css";
import axios from "axios";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedGender, setSelectedGender] = useState('All');
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [filters, setFilters] = useState({})
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Filter modal state
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const filterProducts = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/filter-products', filters);
            if(response.data.products && response.data.products !== undefined) {
                const transformedData = response.data.products.map(product => ({
                    id: product.id,
                    name: product.product_name,
                    price: product.product_price,
                    category: product.category ? product.category.category_name : 'Unknown',
                    image: product.image ? `http://localhost:8000/storage/${product.image}` : '/Assets/default.jpg',
                }));
                setProducts(transformedData);
                setFilteredProducts(transformedData);
            }
            else{
                setProducts([]);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error(error.response?.data?.message || 'Error filtering products');
        }
    };


    const openFilterModal = () => setIsFilterModalOpen(true);
    const closeFilterModal = () => setIsFilterModalOpen(false);

    const handleFilterChange = (name, value) => {

        if (name === "category") {
            setSelectedCategory(value);
        } else if (name === "gender") {
            setSelectedGender(value);
        }
        else{
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        }
    };

    const handleResetFilters = () => {
        setSelectedCategory(0);
        setSelectedGender("All");
        setShowAllProducts(false);
    };
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
            setFilteredProducts(transformedData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {

        if(filters){
            filterProducts();
        }
    }, [filters]);


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
        setShowAllProducts(true);
    };


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="filter container">
                <h1 className="search-heading container">All Products ({products.length})</h1>
                <div className="shortandfilter">
                    <div className="short">
                        <select className="sortBy" onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option value="0">All Categories</option>
                            <option value="1">T-Shirt</option>
                            <option value="2">Shirt</option>
                            <option value="3">Pants</option>
                            <option value="4">Accessories</option>
                        </select>
                        <img src="./Assets/Sort.svg" alt="Sort"/>
                    </div>
                    <div className="filter1" onClick={openFilterModal}>
                        Filter <img src="./Assets/Filter.svg" alt="Filter"/>
                    </div>
                </div>
            </div>

            <div className="productAndFilter container">
                <div className="product-result">
                    {filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
                        <Link to={`/product/${product.id}/details`} key={product.id} className="prdct-cart"
                              data-aos="zoom-in">
                            <div className="prdct-img">
                                <img src={product.image} alt={product.name}/>
                            </div>
                            <div className="prdct-desc">
                                <div className="prdct-left">
                                    <div className="prdct-name">{product.name}</div>
                                    <div className="prdct-category">{product.category}</div>
                                </div>
                                <div className="prdct-right">
                                    <div className="prdct-price">${product.price.toFixed(2)}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <FilterModal
                    isOpen={isFilterModalOpen}
                    onClose={closeFilterModal}
                    onFilterChange={handleFilterChange}
                    filterValues={{selectedCategory, selectedGender}}
                    onResetFilters={handleResetFilters}
                />
            </div>

            <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
            />

            <Subscribe/>
            <Footer/>
        </div>
    );
}
