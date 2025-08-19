import { useState } from "react";
import { useAppContext } from "../../context/Context";
import axios from "axios"

const AddProduct = () => {
  const { setTab ,getProduct} = useAppContext();

  // Form state
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    originalPrice: "",
    category: "",
    subCategory: "",
    stock: "",
    description: "",
    specification: "",
    images: [null, null], // Two images
  });

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
        newImages[index] = file;
        return { ...prev, images: newImages };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("productName", formData.productName);
    sendData.append("price", formData.price);
    sendData.append("originalPrice", formData.originalPrice);
    sendData.append("category", formData.category);
    sendData.append("subCategory", formData.subCategory);
    sendData.append("stock", formData.stock);
    sendData.append("description", formData.description);
    sendData.append("specification", formData.specification);

if (formData.images[0]) sendData.append("image", formData.images[0]);
if (formData.images[1]) sendData.append("image1", formData.images[1]);


    // Debug: log all form data entries
    // for (let [key, value] of sendData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/product/addProduct",
        sendData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
     console.log(res.data);
      getProduct();
      alert(res.data.message || "Product created successfully!");
     
      // setTab(2); // Go to products page
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        err.response?.data?.message || "Error occurred while creating product"
      );
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setTab(1)}
          type="button"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 text-sm sm:text-base">Create a new product listing</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Max 2) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[0, 1].map((index) => (
                <label
                  key={index}
                  className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors text-gray-500 hover:text-blue-600 min-h-[8rem] w-full cursor-pointer"
                >
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <svg
                    className="h-6 w-6 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm8 4v8m-4-4h8" />
                  </svg>
                  <span className="text-sm">
                    {formData.images[index] ? formData.images[index].name : "Upload Image"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price ($) (Optional)
              </label>
              <input
                type="number"
                name="originalPrice"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Category <span className="text-red-500">*</span>
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select sub category</option>
                {subCategories.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Specification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specification <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              name="specification"
              value={formData.specification}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product specifications"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setTab(1)}
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
