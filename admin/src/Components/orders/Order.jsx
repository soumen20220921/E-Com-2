import React, { useState} from "react";
import { ShoppingCart, Eye, Search, Package } from "lucide-react";
import OrderDetails from "./OrderDetails";
import { useAppContext } from "../../context/Context";

export default function OrderListDesign() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ store object instead of boolean

  const {orders} =useAppContext();

  // Search filter
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) =>
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Tab filter
  const tabFilteredOrders = filteredOrders.filter((order) => {
    if (activeTab === "All Orders") return order.orderAccept && !order.orderReject && order.orderDispatch === true  && order.trackingId !== "";
    if (activeTab === "New") return !order.orderAccept && !order.orderReject;
    if (activeTab === "Accepted") return order.orderAccept === true && order.orderDispatch === false;
    if (activeTab === "Rejected") return order.orderReject === true;
    if (activeTab === "Dispatched") return order.orderDispatch === true && order.trackingId === "";
    return true;
  });

  // Badge colors
  const getStatusBadge = (order) => {
    if (order.orderAccept) return "bg-green-100 text-green-700";
    if (order.orderReject) return "bg-red-100 text-red-700";
    if (order.trackingId) return "bg-purple-100 text-purple-700";
    return "bg-yellow-100 text-yellow-700";
  };

  // ✅ If an order is selected, show OrderDetails
  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track customer orders</p>
      </div>

      {/* Tabs + Search */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex overflow-x-auto custom-scrollbar">
            {["All Orders", "New", "Accepted", "Dispatched", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 whitespace-nowrap py-4 px-6 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Search */}
        <div className="p-4 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="p-4 space-y-4">
          {tabFilteredOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Order Info */}
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart size={22} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-800 truncate">
                        Order #{order._id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order)}`}>
                        {order.orderAccept
                          ? "Accepted"
                          : order.orderReject
                          ? "Rejected"
                          : order.trackingId
                          ? "Dispatched"
                          : "New"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">User ID: {order.userId}</p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Payment: {order.payStatus}</p>
                  </div>
                </div>

                {/* Order Total + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 lg:mt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-gray-800">₹{order.amount}</p>
                    <p className="text-sm text-gray-600">
                      {order.orderItems?.length || 0} item(s)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <button 
                      onClick={() => setSelectedOrder(order)} // ✅ Pass whole order
                      className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm">
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {tabFilteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-14 w-14 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No orders found</h3>
              <p className="text-sm text-gray-500">Try adjusting filters or search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Tracking ID</h3>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Tracking ID saved:", trackingId);
                  setShowTrackingModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
