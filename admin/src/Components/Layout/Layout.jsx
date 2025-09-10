import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAppContext } from "../../context/Context";
import User from "../users/User.jsx";
import Product from "../product/Product.jsx";
import Order from "../orders/Order.jsx";
import AddProduct from "../product/AddProduct.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
// import Settings from "../settings/Settings.jsx";

const Layout = () => {
  const { tab } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      scrollRef.current.scrollTop = 0;
    }
  }, [tab]);

  const renderContent = () => {
    switch (tab) {
      case 0: return <Dashboard />;
      case 1: return <User />;
      case 2: return <Product />;
      case 3: return <Order />;
      case 4: return <AddProduct />;
      // case 5: return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-2xl transition-transform duration-500 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main
          ref={scrollRef}
          className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-lg"
        >
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
