import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ViewProduct = ({ product, onBack }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0]);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          title="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 truncate animate-slide-in-right">
          {product.productName}
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8 transition-transform transform hover:scale-[1.01]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner relative group">
              {mainImage ? (
                <img
                  src={`http://localhost:8000/img/${mainImage}`}
                  alt={product.productName}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <p className="text-gray-400">No Image</p>
              )}
            </div>

            {product.images?.length > 1 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8000/img/${img}`}
                    alt={`${product.productName} thumbnail ${index + 1}`}
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      mainImage === img
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                Product Details
              </h2>
              <p className="text-gray-600 leading-relaxed animate-fade-in">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-gray-500">Price</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{product.price}
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-100 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-medium text-gray-500">Stock</p>
                <p className="text-lg font-bold text-gray-900">
                  {product.stock}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 shadow-sm hover:shadow-md transition sm:col-span-1 col-span-2">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className="inline-flex px-3 py-1 mt-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-base font-medium text-gray-800">
                  {product.category || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">Sub-Category</p>
                <p className="text-base font-medium text-gray-800">
                  {product.subCategory || "N/A"}
                </p>
              </div>
            </div>

            {product.specification && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Specifications
                </h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
                  {product.specification}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
