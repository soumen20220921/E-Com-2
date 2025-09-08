// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Truck,
  Shield,
  RotateCcw,
  ShoppingCart,
  Minus,
  Plus,
  Share2,
  Copy,
  Loader2,
  Check,
  ArrowLeft,
} from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastStyles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProduct, token, getCart } = useAppContext();

  const product = allProduct?.find((p) => p._id === id);
  const similarProducts =
    allProduct?.filter(
      (p) => p.category === product?.category && p._id !== product._id
    ) || [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("highlights");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const images =
    product?.images?.map((img) => `http://localhost:8000/img/${img}`) || [];

  useEffect(() => {
    setIsAdded(false);
    setSelectedImage(0);
    setQuantity(1);
  }, [id, product]);

  const cartDetails = {
    productId: id,
    title: product?.productName || "",
    price: (product?.price || 0) * quantity,
    qty: quantity,
    imgSrc: product?.images?.[0] || "",
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!token) {
      toast.warn("Please login first to add items to your cart.");
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items left in stock.`);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/cart/addToCart",
        cartDetails,
        { headers: { Auth: token, "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        getCart();
        toast.success("Item added to cart!");
        setIsAdded(true);
      } else {
        toast.error(response.data.message || "Failed to add item.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = `${window.location.origin}/productDetails/${id}`;
    const shareText = `Check out this product: ${product.productName} at ${shareUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: product.productName, text: shareText, url: shareUrl });
        toast.success("Content shared successfully!");
      } else {
        switch (platform) {
          case "whatsapp":
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
            break;
          case "telegram":
            window.open(
              `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.productName)}`,
              "_blank"
            );
            break;
          case "facebook":
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
            break;
          case "copy":
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to share.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-5 w-5" /> Back
        </button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center">
              <div className="w-full max-h-[450px] overflow-hidden rounded-2xl shadow-lg">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.productName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex gap-3 mt-3 overflow-x-auto w-full justify-center">
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 flex-shrink-0 rounded-lg border-2 ${
                      selectedImage === idx
                        ? "border-blue-600 shadow-md"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold">{product.productName}</h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">₹{product.price}</span>
                {product.originalPrice && <span className="line-through text-gray-500">₹{product.originalPrice}</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Stock:</span>
                <span className="text-green-600">{product.stock} available</span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center border rounded-lg w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2" disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2" disabled={quantity >= product.stock}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-4 border-t">
                <div className="flex space-x-4 border-b overflow-x-auto">
                  {["highlights", "description", "specifications"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 sm:py-3 capitalize font-semibold ${
                        activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="p-4 sm:p-6 text-gray-700">
                  {activeTab === "highlights" && (
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                      <li>High-resolution display for vivid visuals.</li>
                      <li>Long-lasting battery for all-day use.</li>
                      <li>Powerful processor for multitasking.</li>
                      <li>Ergonomic design for comfort.</li>
                      <li>Integrated security features.</li>
                    </ul>
                  )}
                  {activeTab === "description" && <p>{product.description || "No description available."}</p>}
                  {activeTab === "specifications" && <p>{product.specification || "No specifications provided."}</p>}
                </div>
              </div>

              {/* Add to Cart & Share */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {!isAdded ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={loading || quantity > product.stock}
                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-5 w-5" />}
                    {loading ? "Adding..." : "Add to Cart"}
                  </motion.button>
                ) : (
                  <div className="flex-1 flex flex-col sm:flex-row gap-2">
                    <button className="w-full py-3 px-6 bg-green-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-green-600">
                      <Check className="h-5 w-5" /> Added
                    </button>
                    <Link
                      to="/cart"
                      className="w-full py-3 px-6 bg-white text-blue-600 border-2 border-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50"
                    >
                      View Cart
                    </Link>
                  </div>
                )}
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowShareModal(true)} className="p-3 border rounded-xl">
                  <Share2 className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-gray-200">
                {[
                  { icon: <Truck className="h-6 w-6 text-blue-600" />, title: "Free Shipping", desc: "On orders over ₹2000" },
                  { icon: <Shield className="h-6 w-6 text-green-600" />, title: "1 Year Warranty", desc: "Full protection" },
                  { icon: <RotateCcw className="h-6 w-6 text-orange-600" />, title: "30 Day Returns", desc: "Easy returns" },
                ].map((item, idx) => (
                  <motion.div whileHover={{ scale: 1.05 }} key={idx} className="text-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      {item.icon}
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="hidden md:inline text-xs text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similarProducts.slice(0, 4).map((item) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md p-3 cursor-pointer hover:shadow-xl transition"
                  onClick={() => navigate(`/productDetails/${item._id}`)}
                >
                  <img
                    src={`http://localhost:8000/img/${item.images[0]}`}
                    alt={item.productName}
                    className="w-full h-32 sm:h-40 object-contain mb-2 rounded-lg"
                  />
                  <h3 className="font-semibold text-gray-800 truncate">{item.productName}</h3>
                  <p className="text-blue-600 font-bold">₹{item.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
          >
            <h3 className="text-lg font-bold mb-4">Share Product</h3>
            <div className="flex justify-around gap-3">
              <button onClick={() => handleShare("whatsapp")} className="p-3 bg-green-500 text-white rounded-xl hover:scale-110">
                <FaWhatsapp size={24} />
              </button>
              <button onClick={() => handleShare("telegram")} className="p-3 bg-blue-400 text-white rounded-xl hover:scale-110">
                <FaTelegram size={24} />
              </button>
              <button onClick={() => handleShare("facebook")} className="p-3 bg-blue-700 text-white rounded-xl hover:scale-110">
                <FaFacebook size={24} />
              </button>
              <button onClick={() => handleShare("copy")} className="p-3 bg-gray-200 rounded-xl hover:scale-110">
                <Copy size={24} />
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-6 w-full py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      <ToastContainer position="bottom-right" theme="dark" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default ProductDetails;
