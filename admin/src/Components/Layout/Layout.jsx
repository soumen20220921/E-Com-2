import React, { useState } from "react";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAppContext } from "../../context/Context";
import User from "../users/User.jsx";
import Product from "../product/Product.jsx";
import Order from "../orders/Order.jsx";
import AddProduct from "../product/AddProduct.jsx";

const Layout = () => {
  const { tab } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (Desktop) */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {tab === 0 && <User />}
            {tab === 1 && <Product />}
            {tab === 2 && <Order />}
            {tab === 3 && <AddProduct/>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
