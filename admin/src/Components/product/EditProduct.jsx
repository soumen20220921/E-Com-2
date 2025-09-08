import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Notification = ({ message, type, onClose }) => {
  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-400 text-green-700"
      : "bg-red-50 border-red-400 text-red-700";
  const iconColor = type === "success" ? "text-green-500" : "text-red-500";

  return (
    <div
      className={`fixed top-6 right-6 p-4 rounded-xl shadow-xl border-l-4 ${bgColor} transition-all duration-500 animate-fade-in z-50`}
    >
      <div className="flex items-center">
        <div className={`mr-3 ${iconColor}`}>
          {type === "success" ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <p className="font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const EditProduct = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    productName: product.productName,
    price: product.price,
    originalPrice: product.originalPrice || "",
    category: product.category,
    subCategory: product.subCategory,
    stock: product.stock,
    description: product.description,
    specification: product.specification,
    images: [null, null],
    imageUrls: product.images.map((img) => `http://localhost:8000/img/${img}`),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const categories = [
    "saree",
    "blouse",
    "men",
    "kids",
    "jwellary",
    "acceceries",
    "home decor",
  ];
  const subCategories = [
    "all saree",
    "pure silk",
    "latest saree",
    "all blouse",
    "designer blouse",
    "cotton blouse",
    "all men",
    "kurta",
    "panjabi",
    "tshirt",
    "all jewelerray",
    "handmade",
    "latest",
    "bags",
    "all home decor",
    "name plates",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const newImages = [...prev.images];
        const newImageUrls = [...prev.imageUrls];
        newImages[index] = file;
        newImageUrls[index] = URL.createObjectURL(file);
        return { ...prev, images: newImages, imageUrls: newImageUrls };
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      const newImageUrls = [...prev.imageUrls];
      newImages[index] = null;
      newImageUrls[index] = null;
      return { ...prev, images: newImages, imageUrls: newImageUrls };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    const updatedData = new FormData();
    updatedData.append("productName", formData.productName);
    updatedData.append("price", formData.price);
    updatedData.append("originalPrice", formData.originalPrice);
    updatedData.append("category", formData.category);
    updatedData.append("subCategory", formData.subCategory);
    updatedData.append("stock", formData.stock);
    updatedData.append("description", formData.description);
    updatedData.append("specification", formData.specification);
    updatedData.append("existingImages", JSON.stringify(product.images));

    formData.images.forEach((file, index) => {
      if (file) {
        updatedData.append(`image${index}`, file);
      } else {
        if (product.images[index]) {
          updatedData.append(`removeImage${index}`, "true");
        }
      }
    });

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/product/updateProduct/${product._id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setNotification({
        message: res.data.message || "Product updated successfully!",
        type: "success",
      });
      onSave(res.data.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setNotification({
        message:
          err.response?.data?.message ||
          "Error occurred while updating product",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 transition-all shadow-sm"
          title="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8 space-y-10 transition-transform hover:scale-[1.01]"
      >
        {/* Product Images */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1].map((index) => (
              <div key={index}>
                <label className="h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-500 hover:text-blue-600 cursor-pointer relative overflow-hidden group">
                  {formData.imageUrls[index] ? (
                    <>
                      <img
                        src={formData.imageUrls[index]}
                        alt={`Product ${index + 1}`}
                        className="object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  )}
                  {!formData.imageUrls[index] && (
                    <span className="absolute text-sm font-medium">
                      Upload Image {index + 1}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Product Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label
                htmlFor="originalPrice"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Original Price (₹)
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subCategory"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sub Category <span className="text-red-500">*</span>
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select sub category</option>
                {subCategories.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Description & Specifications */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Description & Specifications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
                required
              />
            </div>

            <div>
              <label
                htmlFor="specification"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Specification <span className="text-red-500">*</span>
              </label>
              <textarea
                id="specification"
                rows={4}
                name="specification"
                value={formData.specification}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product specifications"
                required
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default EditProduct;
