import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Share2,
  Copy,
  Facebook,
} from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa6";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const { allProduct, token,getCart } = useAppContext();

  const product = allProduct?.find((p) => p._id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const images =
    product?.images?.map((img) => `http://localhost:8000/img/${img}`) || [];

  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  // Cart state
  const [cartDetails, setCartDetails] = useState({
    productId: "",
    title: "",
    price: 0,
    qty: 0,
    imgSrc: "",
  });

  useEffect(() => {
    if (!product) return;

    setCartDetails({
      productId: id,
      title: product.productName,
      price: product.price * quantity,
      qty: quantity,
      imgSrc: product.images?.[0] || "",
    });
  }, [product, quantity, id]);

  // Debug watcher
  // useEffect(() => {
  //   console.log("Cart Data Updated:", cartDetails);
  // }, [cartDetails]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/cart/addToCart",
        cartDetails,
        {
          headers: {
            Auth: token, // matches backend middleware
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        getCart();
        // console.log("Cart Updated:", response.data.Result);
        alert("Item added to cart!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      // console.error("Add to Cart Error:", error);
      alert("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8">
            {/* Left: Product Images */}
            <div className="space-y-4">
              <div className="relative group">
                {images.length > 0 && (
                  <img
                    src={images[selectedImage]}
                    alt={product.productName}
                    className="w-full h-72 sm:h-96 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg border-2 ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.productName}</h1>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="line-through text-gray-500">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-700">Stock:</span>
                <span className="text-green-600">
                  {product.stock} available
                </span>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center border rounded-lg w-fit">
                  {/* Decrease */}
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  {/* Display */}
                  <span className="px-4">{quantity}</span>

                  {/* Increase */}
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-2 disabled:opacity-50"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={loading || quantity > product.stock}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  {loading ? (
                    "Adding..."
                  ) : (
                    <>
                      <ShoppingCart className="hidden sm:block h-5 w-5" /> Add
                      to Cart
                    </>
                  )}
                </button>
                <button className="p-4 bg-gray-200 rounded-lg">
                  <Heart className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-4 border rounded-lg"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t mt-8">
            <div className="flex space-x-4 px-4 border-b">
              {["description", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 capitalize ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "specifications" && <p>{product.specification}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Share Product</h3>
            <div className="flex gap-4">
              <button className="p-3 bg-green-500 text-white rounded-lg">
                <FaWhatsapp />
              </button>
              <button className="p-3 bg-blue-400 text-white rounded-lg">
                <FaTelegram />
              </button>
              <button className="p-3 bg-blue-700 text-white rounded-lg">
                <Facebook />
              </button>
              <button className="p-3 bg-gray-200 rounded-lg">
                <Copy />
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 px-4 py-2 bg-gray-100 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
