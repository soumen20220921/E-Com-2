import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Eye,
  Search,
  Package,
  CalendarDays,
  X,
  Filter,
} from "lucide-react";
import OrderDetails from "./OrderDetails";
import { useAppContext } from "../../context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderListDesign() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tabSignals, setTabSignals] = useState({});
  const [filterPayment, setFilterPayment] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { orders } = useAppContext();
  const safeOrders = Array.isArray(orders) ? orders : [];

  const newOrdersCount = safeOrders.filter(
    (o) => !o.orderAccept && !o.orderReject
  ).length;

  const tabCounts = {
    New: safeOrders.filter((o) => !o.orderAccept && !o.orderReject).length,
    Accepted: safeOrders.filter((o) => o.orderAccept && !o.orderDispatch)
      .length,
    Dispatched: safeOrders.filter((o) => o.orderDispatch && !o.trackingId)
      .length,
    Rejected: safeOrders.filter((o) => o.orderReject).length,
    "All Orders": safeOrders.filter(
      (o) =>
        o.orderAccept &&
        !o.orderReject &&
        o.orderDispatch &&
        o.trackingId !== ""
    ).length,
  };

  useEffect(() => {
    const newSignals = { ...tabSignals };
    Object.keys(tabCounts).forEach((tab) => {
      if (tabCounts[tab] > (tabSignals[tab]?.lastCount || 0)) {
        newSignals[tab] = {
          ...newSignals[tab],
          signal: true,
          lastCount: tabCounts[tab],
        };
      } else {
        newSignals[tab] = {
          ...newSignals[tab],
          lastCount: tabCounts[tab],
        };
      }
    });
    setTabSignals(newSignals);
  }, [orders]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabSignals((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], signal: false },
    }));
  };

  const handleClearFilters = () => {
    setFilterPayment("All");
    setDateRange({ from: "", to: "" });
  };

  // Tab Filter
  const tabFilteredOrders = safeOrders.filter((order) => {
    if (activeTab === "New") return !order.orderAccept && !order.orderReject;
    if (activeTab === "Accepted")
      return order.orderAccept && !order.orderDispatch;
    if (activeTab === "Rejected") return order.orderReject;
    if (activeTab === "Dispatched")
      return order.orderDispatch && !order.trackingId;
    if (activeTab === "All Orders")
      return (
        order.orderAccept &&
        !order.orderReject &&
        order.orderDispatch &&
        order.trackingId !== ""
      );
    return true;
  });
  const finalFilteredOrders = tabFilteredOrders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userShipping?.FullName?.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

    const matchesPayment =
      filterPayment === "All" ||
      (filterPayment === "Paid" && order.payStatus === "paid") ||
      (filterPayment === "Not Paid" && order.payStatus !== "paid");

    const orderDate = new Date(order.orderDate);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    const matchesDate =
      (!fromDate || orderDate >= fromDate) &&
      (!toDate || orderDate <= new Date(toDate).setDate(toDate.getDate() + 1));

    return matchesSearch && matchesPayment && matchesDate;
  });

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-2xl p-5 text-center transform hover:scale-105 hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <ShoppingCart className="text-blue-600 animate-bounce" size={26} />
          </div>
          <h3 className="text-sm text-gray-600">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-700">
            {safeOrders.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-lg rounded-2xl p-5 text-center transform hover:rotate-1 hover:scale-105 transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <Package className="text-purple-600 animate-pulse" size={26} />
          </div>
          <h3 className="text-sm text-gray-600">New Orders</h3>
          <p className="text-2xl font-bold text-purple-700">{newOrdersCount}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg rounded-2xl p-5 text-center transform hover:scale-105 hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <CalendarDays
              className="text-green-600 animate-bounce "
              size={26}
            />
          </div>
          <h3 className="text-sm text-gray-600">Revenue</h3>
          <p className="text-2xl font-bold text-green-700">
            ₹{safeOrders.reduce((sum, o) => sum + (o.amount || 0), 0)}
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-pink-100 shadow-lg rounded-2xl p-5 text-center transform hover:scale-105 hover:-rotate-1 transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <Eye className="text-pink-600 animate-pulse" size={26} />
          </div>
          <h3 className="text-sm text-gray-600">Dispatched</h3>
          <p className="text-2xl font-bold text-pink-700">
            {safeOrders.filter((o) => o.orderDispatch).length || 0}
          </p>
        </div>
      </div>

      <style>
        {`
    .animate-spin-slow {
      animation: spin 6s linear infinite;
    }
  `}
      </style>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex overflow-x-auto custom-scrollbar">
            {Object.keys(tabCounts).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative flex-shrink-0 whitespace-nowrap py-4 px-6 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {tabCounts[tab] > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {tabCounts[tab]}
                  </span>
                )}
                {tabSignals[tab]?.signal && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 bg-white flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID or User Name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Filter size={20} />
            Filters
          </button>

          <div className="hidden md:flex flex-row items-center gap-4">
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
            <div className="relative">
              <CalendarDays
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            <p className="text-gray-500">-</p>
            <div className="relative">
              <CalendarDays
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-t-2xl p-6 w-full max-h-[80%] overflow-y-auto transform transition-transform ease-out duration-300 translate-y-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                {/* Payment Filter */}
                <div>
                  <label
                    htmlFor="mobile-payment-filter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Payment Status
                  </label>
                  <select
                    id="mobile-payment-filter"
                    value={filterPayment}
                    onChange={(e) => setFilterPayment(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm"
                  >
                    <option value="All">All Payments</option>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="space-y-4">
                    <div className="relative">
                      <CalendarDays
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <CalendarDays
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => {
                    handleClearFilters();
                  }}
                  className="w-full py-3 px-4 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="p-4 space-y-4">
          {finalFilteredOrders.length > 0 ? (
            finalFilteredOrders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4 w-full">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart size={22} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">
                        Order #{order._id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        User: {order.userShipping?.FullName || order.userId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.orderDate).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Payment: {order.payStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 lg:mt-0">
                    <div className="text-left sm:text-right">
                      <p className="text-lg font-bold text-gray-800">
                        ₹{order.amount}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.orderItems?.length || 0} item(s)
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          toast.info(`Opening order #${order._id}`, {
                            theme: "colored",
                          });
                        }}
                        className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-1 text-sm"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-14 w-14 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No orders found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        newestOnTop={true}
      />
    </div>
  );
}
