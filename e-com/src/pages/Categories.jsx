import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { products } from '../data.js';
import { useAppContext } from '../context/AppContext';
import { Filter, Grid, List, X } from 'lucide-react';

const Categories = () => {
  const { cart, setCart, wishlist, setWishlist } = useAppContext();
   const {allProduct} = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState('grid');
  const [toast, setToast] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);  

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (productId) => {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
    setToast({ message: 'Product added to cart!', type: 'success' });
  };

  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      setToast({ message: 'Removed from wishlist', type: 'warning' });
    } else {
      setWishlist([...wishlist, productId]);
      setToast({ message: 'Added to wishlist!', type: 'success' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
            <p className="text-gray-600">Explore our wide range of products</p>
          </div>
           <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 active:scale-95 mt-4 sm:mt-0"
            aria-label="Open filters"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           <div className={`
            fixed inset-0 z-50 bg-white shadow-xl p-6
            transform transition-transform duration-300 ease-in-out
            ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:translate-x-0 lg:w-64 lg:flex-shrink-0 lg:block lg:shadow-md lg:rounded-lg
            lg:sticky lg:top-20 lg:h-fit overflow-y-auto
          `}>
             <button
              onClick={() => setShowMobileFilters(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close filters"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 mr-2 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>

            {/* Category Filter */}
            {/* <div className="mb-6 border-b pb-4">
              <h4 className="font-medium text-gray-900 mb-3">Category</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">All Categories</span>
                </label>
                {allProduct.map(product => (
                  <label key={product._id} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value={product._id}
                      checked={selectedCategory === product._id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div> */}

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

           {showMobileFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fadeIn"
              onClick={() => setShowMobileFilters(false)}
            ></div>
          )}

           <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeIn">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {sortedProducts.length} products found
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-200 transform hover:scale-110 active:scale-95 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-200 transform hover:scale-110 active:scale-95 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'  
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isListView={viewMode === 'list'}  
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md animate-fadeIn">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

       <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Categories;
