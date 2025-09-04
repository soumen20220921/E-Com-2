import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Truck, Shield, RotateCcw, Heart, ShoppingCart, Minus, Plus, Share2, Copy, Loader2, Check } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastStyles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProduct, token, getCart } = useAppContext();

  const product = allProduct?.find((p) => p._id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const images = product?.images?.map((img) => `http://localhost:8000/img/${img}`) || [];

  // Reset isAdded state if a new product is selected or component re-renders
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!token) {
      toast.warn("Please login first to add items to your cart.");
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items left in stock. Cannot add more.`);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/cart/addToCart",
        cartDetails,
        {
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        getCart();
        toast.success("Item added to cart successfully!");
        setIsAdded(true); // Set state to change button appearance
      } else {
        toast.error(response.data.message || "Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = `${window.location.origin}/productDetails/${id}`;
    const shareText = `Check out this amazing product: ${product.productName} at ${shareUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.productName,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Content shared successfully!");
      } else {
        switch (platform) {
          case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
            break;
          case 'telegram':
            window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.productName)}`, '_blank');
            break;
          case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
            break;
          case 'copy':
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-8">
            {/* Left: Image Slider */}
            <div className="flex flex-col items-center">
              <div className="w-full h-auto max-h-[500px] overflow-hidden rounded-lg shadow-md">
                <img
                  src={images[selectedImage]}
                  alt={product.productName}
                  className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <div className="flex flex-row gap-2 mt-4 overflow-x-auto w-full justify-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-blue-600 shadow-md"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
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

              <div className="py-4 border-t border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Product Highlights:
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>High-resolution display for vivid visuals.</li>
                  <li>Long-lasting battery for all-day use.</li>
                  <li>Powerful processor for seamless multitasking.</li>
                  <li>Ergonomic design for comfortable handling.</li>
                  <li>Integrated security features to protect your data.</li>
                </ul>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 disabled:opacity-50"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {!isAdded ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={loading || quantity > product.stock}
                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="hidden sm:block h-5 w-5" />
                        <span className="text-sm whitespace-nowrap md:text-base">Add to Cart</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <button
                      className="w-full py-3 px-6 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-600"
                      disabled
                    >
                      <Check className="h-5 w-5" />
                      <span className="text-sm whitespace-nowrap md:text-base">Added to Cart</span>
                    </button>
                    <Link
                      to="/cart"
                      className="w-full py-3 px-6 bg-white text-blue-600 border-2 border-blue-600 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-50"
                    >
                      <span className="text-sm whitespace-nowrap md:text-base">View Cart</span>
                    </Link>
                  </div>
                )}
                <button className="p-4 bg-gray-200 rounded-lg  ">
                  <Heart className="h-5 w-5  " />
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-4 border rounded-lg "
                >
                  <Share2 className="h-5 w-5  " />
                </button>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="text-center group p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105 cursor-pointer">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Free Shipping</p>
                  <p className="hidden md:inline text-xs text-gray-500">On orders over $50</p>
                </div>
                <div className="text-center group p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105 cursor-pointer">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">1 Year Warranty</p>
                  <p className="hidden md:inline text-xs text-gray-500">Full protection</p>
                </div>
                <div className="text-center group p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105 cursor-pointer">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-orange-200 transition-colors">
                    <RotateCcw className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">30 Day Returns</p>
                  <p className="hidden md:inline text-xs text-gray-500">Easy returns</p>
                </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Share Product</h3>
            <div className="flex justify-around gap-4">
              <button onClick={() => handleShare('whatsapp')} className="p-3 bg-green-500 text-white rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                <FaWhatsapp size={24} />
              </button>
              <button onClick={() => handleShare('telegram')} className="p-3 bg-blue-400 text-white rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                <FaTelegram size={24} />
              </button>
              <button onClick={() => handleShare('facebook')} className="p-3 bg-blue-700 text-white rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                <FaFacebook size={24} />
              </button>
              <button onClick={() => handleShare('copy')} className="p-3 bg-gray-200 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                <Copy size={24} />
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-6 w-full py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProductDetails;