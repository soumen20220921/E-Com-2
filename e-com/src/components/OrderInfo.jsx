import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Package, Truck, CheckCircle, Clock, Loader2, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { XCircle } from "lucide-react";

const OrderInfo = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAppContext();

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!orderId || !token) {
        setError("Order ID or authentication token is missing.");
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`http://localhost:8000/api/order/${orderId}`, {
        headers: { Auth: token },
      });
      
      if (response.data.order) {
        setOrder(response.data.order);
      } else {
        setError("Order not found or access denied.");
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Failed to load order details. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId, token]);

  const getOrderStatus = () => {
    if (order?.trackingId) return "Shipped";
    if (order?.orderAccept) return "Accepted";
    if (order?.orderReject) return "Rejected";
    return "New";
  };
  
  const status = getOrderStatus();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-xl font-medium text-gray-700">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-lg shadow-sm border border-red-200 text-red-700 min-h-[60vh] mx-4 sm:mx-auto max-w-2xl text-center">
        <XCircle className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={fetchOrderDetails}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <RefreshCcw className="h-4 w-4 mr-2" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600">Order ID: #{order?.orderId}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Info & Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h2>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <p className="text-sm mt-2 text-gray-700">Placed</p>
                </div>
                <div className={`flex-1 h-1 mx-4 ${status === 'Accepted' || status === 'Shipped' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className="flex flex-col items-center">
                  {status === "Accepted" ? (
                    <Clock className="h-8 w-8 text-yellow-500" />
                  ) : (
                    <Package className="h-8 w-8 text-gray-400" />
                  )}
                  <p className="text-sm mt-2 text-gray-700">Accepted</p>
                </div>
                <div className={`flex-1 h-1 mx-4 ${status === 'Shipped' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className="flex flex-col items-center">
                  {status === "Shipped" ? (
                    <Truck className="h-8 w-8 text-blue-500" />
                  ) : (
                    <Truck className="h-8 w-8 text-gray-400" />
                  )}
                  <p className="text-sm mt-2 text-gray-700">Shipped</p>
                </div>
              </div>
              
              <div className="mt-8 text-center bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-lg">Current Status:
                <span className={`ml-2 font-bold ${
                    status === "Shipped" ? "text-blue-600" :
                    status === "Accepted" ? "text-yellow-600" :
                    "text-gray-600"
                }`}>
                  {status}
                </span>
                </p>
              </div>
            </div>
            
            {/* Products */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>
              <div className="space-y-4">
                {order?.cartItems?.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.imgSrc ? `http://localhost:8000/img/${item.imgSrc}` : "https://via.placeholder.com/64"}
                      alt={item.title}
                      className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                      <p className="text-sm font-medium text-gray-900">₹{item.price / item.qty} each</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="font-semibold text-gray-900">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment & Shipping Summary */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order?.totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{order?.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer & Shipping */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Info</h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p>{order?.userShipping?.FullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p>{order?.userShipping?.Phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{order?.userShipping?.Email || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Status</label>
                  <p className="font-medium text-green-600">{order?.payStatus}</p>
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
              </div>
              <div className="text-gray-700">
                <p>{order?.userShipping?.FullName}</p>
                <p>{order?.userShipping?.Add}</p>
                <p>{order?.userShipping?.VillorCity}, {order?.userShipping?.Dist}</p>
                <p>{order?.userShipping?.State} - {order?.userShipping?.Pin}</p>
              </div>
            </div>
            
            {/* Tracking */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracking</h2>
              {order?.trackingId ? (
                <div className="space-y-2">
                  <p className="text-gray-700">Your order has been shipped!</p>
                  <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-blue-600 break-all">{order.trackingId}</span>
                    <Link to={`https://www.google.com/search?q=${order.trackingId}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:text-blue-800 transition-colors">
                      Track
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 italic">Tracking information will be available once your order ships.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;