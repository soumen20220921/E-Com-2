import React, { useEffect, useMemo, useState } from "react";
import { ShoppingBag, Users, Package, IndianRupee, TrendingUp, Star } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppContext } from "../../context/Context";
import { getDashboardData } from "../data/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { allProduct, orders, allUser } = useAppContext();
  const [data, setData] = useState(getDashboardData());

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);
  const paidOrders = orders?.filter((o) => o.payStatus === "paid") || [];

  const totalUsers = allUser?.length || 0;
  const totalOrders = paidOrders.length;
  const totalProducts = allProduct?.length || 0;
  const totalRevenue = useMemo(() => {
    return paidOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
  }, [paidOrders]);

  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;
  const paymentSuccessRate = orders?.length
    ? ((paidOrders.length / orders.length) * 100).toFixed(1)
    : 0;
  const stats = [
    { 
      name: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString()}`, 
      icon: IndianRupee, 
      color: "text-green-600", 
      bg: "bg-gradient-to-r from-green-100 to-green-200" 
    },
    { 
      name: "Total Orders", 
      value: totalOrders, 
      icon: ShoppingBag, 
      color: "text-blue-600", 
      bg: "bg-gradient-to-r from-blue-100 to-blue-200" 
    },
    { 
      name: "Total Users", 
      value: totalUsers, 
      icon: Users, 
      color: "text-purple-600", 
      bg: "bg-gradient-to-r from-purple-100 to-purple-200" 
    },
    { 
      name: "Total Products", 
      value: totalProducts, 
      icon: Package, 
      color: "text-orange-600", 
      bg: "bg-gradient-to-r from-orange-100 to-orange-200" 
    },
  ];

  const salesChartData = {
    labels: data.salesData.map((d) => d.month),
    datasets: [
      {
        label: "Revenue",
        data: data.salesData.map((d) => d.revenue),
        borderColor: "rgb(251, 146, 60)",
        backgroundColor: "rgba(251, 146, 60, 0.5)",
        tension: 0.3,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div className="p-4 lg:p-6 space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 animate-slide-in-down">📊 Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden ${stat.bg}`}
          >
            <div className="absolute right-0 bottom-0 opacity-10 text-7xl">
              <stat.icon />
            </div>
            <div className="p-3 rounded-full bg-white shadow-md animate-pulse">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 animate-slide-in-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-orange-500" /> Sales Overview
          </h2>
          <Line data={salesChartData} />
        </div>

       <div className="bg-white rounded-xl shadow-md p-6 animate-slide-in-right">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
  <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
    {paidOrders
      ?.slice()
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5)
      .map((order, idx) => (
        <div
          key={order._id}
          className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300
            ${
              idx < 2
                ? "bg-gradient-to-r from-orange-50 to-yellow-100 border border-orange-200 shadow-md transform hover:scale-[1.02]"
                : "hover:bg-gray-50"
            }`}
        >
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
            ${
              idx < 2
                ? "bg-gradient-to-r from-orange-200 to-yellow-300 animate-pulse"
                : "bg-blue-100"
            }`}
          >
            <ShoppingBag
              size={18}
              className={`${
                idx < 2 ? "text-orange-700" : "text-blue-600"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Order #{order._id.substring(0, 8)}...
            </p>
            <p className="text-sm text-gray-500">₹{order.amount}</p>
            <p className="text-xs text-gray-400">
              {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
  </div>
</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" /> Top Products
          </h2>
          <ul className="divide-y divide-gray-100">
            {allProduct?.slice(0, 5).map((product) => (
              <li key={product._id} className="flex justify-between py-3">
                <span className="text-gray-700 truncate">{product.name}</span>
                <span className="text-gray-500 text-sm">
                  {product.sold || 0} sold
                </span>
              </li>
            ))}
          </ul>
        </div> */}

        {/* User Growth */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Growth</h2>
          <p className="text-gray-600 mb-2">
            Total Users: <span className="font-bold">{totalUsers}</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-4 rounded-full animate-pulse"
              style={{
                width: `${Math.min(totalUsers, 100)}%`,
              }}
            ></div>
          </div>
        </div>
         {/* Average Order Value */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Avg. Order Value</h2>
          <p className="text-2xl font-bold text-indigo-600">₹{avgOrderValue}</p>
          <p className="text-gray-500 text-sm">Across {totalOrders} paid orders</p>
        </div>

        {/* Payment Success Rate */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Success Rate</h2>
          <p className="text-2xl font-bold text-green-600">{paymentSuccessRate}%</p>
          <p className="text-gray-500 text-sm">
            {paidOrders.length} of {orders?.length || 0} orders successful
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
