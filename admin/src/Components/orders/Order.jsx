import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart,
  Eye,
  Search,
  Package,
  CalendarDays,
  Filter,
} from "lucide-react";
import OrderDetails from "./OrderDetails";
import { useAppContext } from "../../context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-yellow-100 text-yellow-800",
    New: "bg-blue-100 text-blue-800",
    Accepted: "bg-purple-100 text-purple-800",
    Dispatched: "bg-indigo-100 text-indigo-800",
    Rejected: "bg-red-100 text-red-800",
    Completed: "bg-gray-100 text-gray-800",
  };
  const text = status === "Not Paid" ? "Unpaid" : status;
  return (
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
        statusStyles[text] || "bg-gray-100 text-gray-800"
      }`}
    >
      {text}
    </span>
  );
};

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
  
  // Filter for paid orders once and reuse the array
  const paidOrders = safeOrders.filter((o) => o.payStatus === "paid");

  const tabCounts = useMemo(() => {
    const unpaidOrders = safeOrders.filter((o) => o.payStatus !== "paid");

    return {
      New: paidOrders.filter((o) => !o.orderAccept && !o.orderReject).length,
      Accepted: paidOrders.filter((o) => o.orderAccept && !o.orderDispatch).length,
      Dispatched: paidOrders.filter((o) => o.orderDispatch && !o.trackingId).length,
      Rejected: paidOrders.filter((o) => o.orderReject).length,
      "All Orders": paidOrders.filter(
        (o) => o.orderAccept && !o.orderReject && o.orderDispatch && o.trackingId !== ""
      ).length,
      Unpaid: unpaidOrders.length,
    };
  }, [paidOrders, safeOrders]);

  useEffect(() => {
    const newSignals = { ...tabSignals };
    Object.keys(tabCounts).forEach((tab) => {
      if (tabCounts[tab] > (tabSignals[tab]?.lastCount || 0)) {
        newSignals[tab] = { ...newSignals[tab], signal: true, lastCount: tabCounts[tab] };
      } else {
        newSignals[tab] = { ...newSignals[tab], lastCount: tabCounts[tab] };
      }
    });
    setTabSignals(newSignals);
  }, [orders, tabCounts]);

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

  const groupedOrders = useMemo(() => {
    const filtered = safeOrders.filter((order) => {
      let tabMatch = false;
      const isPaid = order.payStatus === "paid";

      if (activeTab === "Unpaid") {
        tabMatch = !isPaid;
      } else {
        if (!isPaid) return false;

        if (activeTab === "New") tabMatch = !order.orderAccept && !order.orderReject;
        else if (activeTab === "Accepted") tabMatch = order.orderAccept && !order.orderDispatch;
        else if (activeTab === "Rejected") tabMatch = order.orderReject;
        else if (activeTab === "Dispatched") tabMatch = order.orderDispatch && !order.trackingId;
        else if (activeTab === "All Orders")
          tabMatch = order.orderAccept && !order.orderReject && order.orderDispatch && order.trackingId !== "";
        else tabMatch = true; 
      }

      if (!tabMatch) return false;

      // Search and other filters
      const matchesSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userShipping?.FullName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPayment =
        filterPayment === "All" ||
        (filterPayment === "Paid" && isPaid) ||
        (filterPayment === "Not Paid" && !isPaid);

      const orderDate = new Date(order.orderDate);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;
      if (fromDate) fromDate.setHours(0, 0, 0, 0); 
      if (toDate) toDate.setHours(23, 59, 59, 999); 

      const matchesDate =
        (!fromDate || orderDate >= fromDate) && (!toDate || orderDate <= toDate);

      return matchesSearch && matchesPayment && matchesDate;
    });

    return filtered.reduce(
      (acc, order) => {
        if (order.payStatus === "paid") {
          acc.paid.push(order);
        } else {
          acc.unpaid.push(order);
        }
        return acc;
      },
      { paid: [], unpaid: [] }
    );
  }, [safeOrders, activeTab, searchTerm, filterPayment, dateRange]);

  const getOrderStatus = (order) => {
    if (order.orderReject) return "Rejected";
    if (order.orderDispatch && order.trackingId) return "Completed";
    if (order.orderDispatch) return "Dispatched";
    if (order.orderAccept) return "Accepted";
    return "New";
  };

  const totalFilteredCount = groupedOrders.paid.length + groupedOrders.unpaid.length;
  
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
  
  const dispatchedPaidOrders = paidOrders.filter((o) => o.orderDispatch).length || 0;

  if (selectedOrder) {
    return <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
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
          <h3 className="text-sm text-gray-600">Total Paid Orders</h3>
          <p className="text-2xl font-bold text-blue-700">{paidOrders.length}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-lg rounded-2xl p-5 text-center transform hover:rotate-1 hover:scale-105 transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <Package className="text-purple-600 animate-pulse" size={26} />
          </div>
          <h3 className="text-sm text-gray-600">New Paid Orders</h3>
          <p className="text-2xl font-bold text-purple-700">{tabCounts.New || 0}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg rounded-2xl p-5 text-center transform hover:scale-105 hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <CalendarDays className="text-green-600 animate-bounce " size={26} />
          </div>
          <h3 className="text-sm text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-700">₹{totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-pink-100 shadow-lg rounded-2xl p-5 text-center transform hover:scale-105 hover:-rotate-1 transition duration-300">
          <div className="flex items-center justify-center mb-3">
            <Eye className="text-pink-600 animate-pulse" size={26} />
          </div>
          <h3 className="text-sm text-gray-600">Dispatched Paid Orders</h3>
          <p className="text-2xl font-bold text-pink-700">{dispatchedPaidOrders}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {Object.keys(tabCounts).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative flex-shrink-0 whitespace-nowrap py-4 px-6 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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

        {/* Filters and Search Bar */}
        <div className="p-4 border-b border-gray-200 bg-white flex flex-col md:flex-row gap-4">
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-gray-50"
            />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Filter size={20} /> Filters
          </button>
          <div className="hidden md:flex flex-row items-center gap-4">
            {/* <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-gray-50"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select> */}
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="py-2.5 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-gray-50"
            />
            <p className="text-gray-500">-</p>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="py-2.5 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-gray-50"
            />
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Filter Modal for Mobile */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 backdrop-blur-sm">
          </div>
        )}

        {/* Orders List with Grouping */}
        <div className="p-4 space-y-6">
          {totalFilteredCount > 0 ? (
            <>
              {groupedOrders.unpaid.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-yellow-400 rounded-full"></div>
                    <h2 className="text-lg font-bold text-gray-700">Unpaid Orders</h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {groupedOrders.unpaid.length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {groupedOrders.unpaid.map((order) => (
                      <OrderCard
                        key={order._id}
                        order={order}
                        setSelectedOrder={setSelectedOrder}
                        getOrderStatus={getOrderStatus}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* PAID Orders Section */}
              {groupedOrders.paid.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                    <h2 className="text-lg font-bold text-gray-700">Paid Orders</h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {groupedOrders.paid.length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {groupedOrders.paid.map((order) => (
                      <OrderCard
                        key={order._id}
                        order={order}
                        setSelectedOrder={setSelectedOrder}
                        getOrderStatus={getOrderStatus}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No Orders Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} newestOnTop={true} />
    </div>
  );
}

const OrderCard = ({ order, setSelectedOrder, getOrderStatus }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Order & User Info */}
        <div className="md:col-span-5">
          <p className="font-bold text-gray-800 truncate">Order #{order._id}</p>
          <p className="text-sm text-gray-600 mt-1">
            {order.userShipping?.FullName || order.userId}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(order.orderDate).toLocaleString()}
          </p>
        </div>

        {/* Statuses */}
        <div className="md:col-span-4 flex flex-wrap gap-2">
          <StatusBadge status={getOrderStatus(order)} />
          <StatusBadge status={order.payStatus === "paid" ? "Paid" : "Unpaid"} />
        </div>

        {/* Amount & Actions */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">₹{order.amount.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{order.orderItems?.length || 0} items</p>
          </div>
          <button
            onClick={() => {
              setSelectedOrder(order);
              toast.info(`Opening order #${order._id}`, { theme: "colored" });
            }}
            className="bg-blue-50 text-blue-600 p-3 rounded-full hover:bg-blue-100 transition-colors"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};