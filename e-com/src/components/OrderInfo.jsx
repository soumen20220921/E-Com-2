import React from 'react'
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
const OrderInfo = () => {
  return (
    <div className="mt-8">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
      Order History
    </h2>

    <div className="text-center py-8 bg-white rounded-lg shadow-sm">
      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500">No orders placed yet.</p>
      <Link
        to="/categories"
        className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Start Shopping
      </Link>
    </div>
  </div>
  )
}

export default OrderInfo