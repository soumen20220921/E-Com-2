import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  Flame,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAppContext } from "../../context/Context";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";
import DeleteModal from "./DeleteModal";
import axios from "axios";

// New, full-screen Notification component
const Notification = ({ message, type, onClose }) => {
  // Determine the color scheme and icon based on the notification type
  const isSuccess = type === "success";
  const icon = isSuccess ? (
    <CheckCircle className="h-16 w-16 text-green-400" />
  ) : (
    <XCircle className="h-16 w-16 text-red-400" />
  );
  const title = isSuccess ? "Mission Complete!" : "Something Went Wrong!";
  const buttonBg = isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

  // Auto-close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in">
      <div className="relative overflow-hidden w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform transition-transform duration-300 ease-out animate-scale-in-vibrant">
        {/* Background Gradients for Visual Appeal */}
        <div className="absolute inset-0 opacity-20">
          <div className={`w-3/4 h-3/4 absolute -top-1/4 -right-1/4 rounded-full ${isSuccess ? 'bg-green-200' : 'bg-red-200'} blur-2xl animate-spin-slow`}></div>
          <div className={`w-2/3 h-2/3 absolute -bottom-1/4 -left-1/4 rounded-full ${isSuccess ? 'bg-blue-200' : 'bg-yellow-200'} blur-2xl animate-pulse`}></div>
        </div>

        {/* Content */}
        <div className="relative text-center space-y-6">
          <div className="mx-auto flex justify-center">{icon}</div>
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">{message}</p>
          <button
            onClick={onClose}
            className={`w-full py-3 text-lg font-bold rounded-xl text-white ${buttonBg} transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl`}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};


// Main Product component
const Product = () => {
  const { setTab, allProduct, getProduct } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  // State for the notification
  const [notification, setNotification] = useState(null);

  const handleAddProduct = useCallback(() => {
    setTab(4);
  }, [setTab]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView("view");
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView("edit");
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id, selectedProduct.productName);
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  const handleSaveEdit = () => {
    setCurrentView("list");
    setSelectedProduct(null);
    // You might want to add a success notification here too
    showNotification("Product updated successfully! 🎉", "success");
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedProduct(null);
  };

  // Delete product function with notification
  const deleteProduct = async (productId, productName) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/${productId}`);
      getProduct(); // Refresh the product list
      showNotification(`Product '${productName}' deleted successfully! 🎉`, "success");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      showNotification("Failed to delete product. Please try again.", "error");
    }
  };

  // Memoized and filtered product list
  const filteredProducts = useMemo(() => {
    let tempProducts = allProduct;

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus === "active") {
      tempProducts = tempProducts.filter((product) => product.stock > 0);
    } else if (filterStatus === "inactive") {
      tempProducts = tempProducts.filter((product) => product.stock <= 0);
    } else if (filterStatus === "hotSell") {
      tempProducts = tempProducts.filter((product) => product.hotSell);
    }

    return tempProducts;
  }, [allProduct, searchTerm, filterStatus]);

  const renderView = () => {
    if (currentView === "view" && selectedProduct) {
      return <ViewProduct product={selectedProduct} onBack={handleCancel} />;
    }
    if (currentView === "edit" && selectedProduct) {
      return (
        <EditProduct
          product={selectedProduct}
          onSave={handleSaveEdit}
          onCancel={handleCancel}
        />
      );
    }

    return (
      <div className="p-4 lg:p-6 space-y-6 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search Box */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Desktop Filter Tabs */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg p-1 border">
              {[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "hotSell", label: "Hot Sell 🔥" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilterStatus(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === opt.value
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="hotSell">Hot Sell 🔥</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow hover:shadow-2xl border border-gray-100 overflow-hidden transition-all transform hover:-translate-y-1 duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden group flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:8000/img/${product.images[0]}`}
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-gray-300" />
                  )}
                  {product.hotSell && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-md animate-pulse">
                      <Flame className="h-3 w-3" /> Hot
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-gray-900 truncate text-lg">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between mt-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full animate-pulse ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      Stock:{" "}
                      <span className="font-medium">{product.stock}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-all"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="mt-2 text-xl font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-gray-500 max-w-sm mx-auto">
              Try adjusting your search terms or filter criteria.
            </p>
            <button
              onClick={handleAddProduct}
              className="mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-md hover:scale-105 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </button>
          </div>
        )}

        {showDeleteModal && (
          <DeleteModal
            product={selectedProduct}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {renderView()}
    </>
  );
};

export default Product;