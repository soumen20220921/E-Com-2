// src/pages/HotSalesPage.jsx
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext.jsx';

const HotSalesPage = () => {
  const { allProduct } = useAppContext();
  
  // In a real app, you would fetch hot sales from an API
  const hotSalesProducts = allProduct || []; 

  return (
    <div className="min-h-screen bg-gray-50 font-inter py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">🔥 All Hot Sales</h1>
        <p className="text-gray-600 text-center mb-12">Browse all of our amazing deals and discounts.</p>
        
        {hotSalesProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {hotSalesProducts.map(product => (
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
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No hot deals are currently available.</p>
        )}
      </div>
    </div>
  );
};

export default HotSalesPage;