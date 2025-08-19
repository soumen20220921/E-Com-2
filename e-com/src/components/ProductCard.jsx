import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isCompactMobile }) => {
  if (!product) return null;

  const { id, name, image, price, oldPrice, isNew, rating, reviews } = product;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
        isCompactMobile ? 'max-w-xs' : ''
      }`}
    >
      {/* Product Image */}
      <div className="relative">
        <Link to={`/productDetails/${id}`}>
          <img
            src={image || 'https://placehold.co/300x200'}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badge */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(product)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white text-gray-400 hover:text-red-500"
          >
            ❤️
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/productDetails/${id}`}>
          <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900 mb-2 hover:text-blue-600 transition-colors md:text-lg">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400 text-sm">
            {rating ? '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating)) : '☆☆☆☆☆'}
          </div>
          {reviews && <span className="text-sm text-gray-600 ml-1">({reviews})</span>}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">₹{price}</span>
            {oldPrice && <span className="text-sm text-gray-500 line-through">₹{oldPrice}</span>}
          </div>
        </div>

        {/* Add to Cart */}
        {onAddToCart && (
          <Link to={`/productDetails/${id}`}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Eye/>
            <span className="hidden md:inline">View</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
