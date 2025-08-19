import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import {  ArrowRight } from 'lucide-react';
import { products } from '../data.js'; // <-- your 5 demo products
import { useAppContext } from '../context/AppContext.jsx';

const Home = () => {
  // Create unique categories with product count
  const categories = [...new Map(products.map(p => [p.category, {
    name: p.category,
    image: p.img.img1,
    description: p.description.slice(0, 50) + "...",
    count: products.filter(pr => pr.category === p.category).length
  }])).values()];

 const {allProduct} = useAppContext();
//  console.log("all product",allProduct);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white rounded-b-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of products across different categories.
              Find exactly what you're looking for with our curated collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/category/${cat.name}`}
                className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-blue-500"
              >
                <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-gray-200 text-sm mb-2">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{cat.count} items</span>
                    <div className="flex items-center space-x-1 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      <span>Shop Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     {/* Hot Sales Section */}
<section className="py-16 bg-white rounded-xl my-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 text-center sm:text-left">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🔥 Hot Sales</h2>
        <p className="text-gray-600">Don't miss out on these amazing deals!</p>
      </div>
      <Link
        to="/categories"
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 sm:mt-0"
      >
        View All
        <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>

    {allProduct && allProduct.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {allProduct.map(product => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.productName,
              image: product.images?.[0]
                ? `http://localhost:8000/img/${product.images[0]}`
                : "", // fallback if no image
              price: product.price
            }}
            onAddToCart={() => {}}
            onToggleWishlist={() => {}}
            isCompactMobile={true}
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center">No products available.</p>
    )}
  </div>
</section>

{/* New Arrivals Section */}
<section className="py-16 bg-white rounded-xl">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 text-center sm:text-left">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ New Arrivals</h2>
        <p className="text-gray-600">Check out our latest products</p>
      </div>
      <Link
        to="/categories"
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 sm:mt-0"
      >
        View All
        <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>

    {allProduct && allProduct.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {allProduct.map(product => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.productName,
              image: product.images?.[0]
                ? `http://localhost:8000/img/${product.images[0]}`
                : "",
              price: product.price
            }}
            onAddToCart={() => {}}
            onToggleWishlist={() => {}}
            isCompactMobile={true}
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center">No products available.</p>
    )}
  </div>
</section>
    </div>
  );
};

export default Home;
