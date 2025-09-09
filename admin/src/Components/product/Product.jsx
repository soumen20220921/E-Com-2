import { Plus, Search, Filter, Edit, Trash2, Eye, Package } from "lucide-react";
import { useAppContext } from "../../context/Context";
import { useCallback, useState, useMemo } from "react";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";
import DeleteModal from "./DeleteModal";
import axios from "axios";

const Product = () => {
  const { setTab, allProduct,getProduct } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id);
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  const handleSaveEdit = () => {
    setCurrentView("list");
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setCurrentView("list");
    setSelectedProduct(null);
  };
// delete product function
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/${productId}`);
      getProduct();
    } catch (error) {
      console.error("Error deleting product: " + error.message);
    }
  };
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return allProduct;
    return allProduct.filter((product) =>
      `${product.productName} ${product.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [allProduct, searchTerm]);

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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
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
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:8000/img/${product.images[0]}`}
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-gray-300" />
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
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-100 to-green-200 text-green-700 animate-pulse">
                      Active
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
            productId={selectedProduct?._id}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    );
  };

  return renderView();
};

export default Product;
