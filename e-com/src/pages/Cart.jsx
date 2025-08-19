import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, SquarePen } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, getCart, token, address, user } = useAppContext();

  // Calculate totals
  const total = cart?.reduce((sum, item) => sum + item.price, 0) || 0;
  const totalItems = cart?.reduce((acc, item) => acc + item.qty, 0);

  // ✅ Check Product Availability
  const checkProductAvailability = async () => {
    try {
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          const response = await axios.get(
            `http://localhost:8000/api/product/${cart[i].productId}`
          );

          if (
            response.data.success &&
            cart[i].qty > response.data.product.stock // ✅ fixed condition
          ) {
            await axios.delete(
              `http://localhost:8000/api/cart/remove/${cart[i].productId}`,
              {
                headers: {
                  Auth: token,
                },
              }
            );
            getCart();
            toast.error(
              `${cart[i].title} removed - only ${response.data.product.stock} left in stock`
            );
          }
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error checking product availability", error);
      toast.error("Error checking product availability");
      return false;
    }
  };

  // ✅ Remove item from Cart
  const removeFromCart = async (productId) => {
    try {
      if (!token) throw new Error("User not authenticated");

      await axios.delete(
        `http://localhost:8000/api/cart/remove/${productId}`,
        {
          headers: { Auth: token },
        }
      );
      getCart();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  // clear cart

  // ✅ Handle Payment
  const handlePayment = async () => {
    if (address?.FullName && address?.Phone && cart.length > 0) {
      try {
        const productAvailable = await checkProductAvailability(); // ✅ added await

        if (productAvailable) {
          const transactionId = "T" + Date.now();
          const MUID = "MUID" + Date.now();

          const data = {
            amount: total,
            MUID,
            transactionId,
            cartItems: cart,
            usershipping: address,
            userId: user?.id || "124",
          };

          const orderResponse = await axios.post(
            `http://localhost:8000/api/phonepe/payment`,
            data
          );

          if (orderResponse?.data?.redirectUrl) {
            toast.info("Redirecting to PhonePe...");
            window.location.href = orderResponse.data.redirectUrl;
          } else {
            toast.warn("Redirecting user to PhonePe payment page...");
          }
        } else {
          toast.error("Some products are unavailable. Please refresh your cart.");
        }
      } catch (error) {
        console.error("Error in handlePayment:", error);
        toast.error("Payment failed. Try again later.");
      }
    } else {
      toast.warn("Please add a valid address before proceeding.");
    }
  };

  // ✅ Empty Cart State
  if (cart?.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <div className="bg-white rounded-full shadow-md p-6 mb-6">
          <ShoppingBag className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Looks like you haven’t added anything to your cart yet. Start
          exploring our products and find something you love!
        </p>
        <Link
          to="/categories"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-md transform hover:scale-105 active:scale-95"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ✅ Cart UI
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cart?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 
             p-4 sm:p-5 flex  sm:flex-row items-start sm:items-center 
             gap-4 sm:gap-6 hover:shadow-md transition-all duration-300"
              >
                {/* Product Image */}
                <Link
                  to={`/productDetails/${item.productId}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={`http://localhost:8000/img/${item.imgSrc}`}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200 
                 transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 w-full">
                  <Link
                    to={`/productDetails/${item.productId}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">
                    Price per item: ₹{item.price / item.qty}
                  </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-end sm:items-center gap-2 sm:gap-3 sm:ml-auto">
                  <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/productDetails/${item.productId}`}
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-full 
                   hover:bg-blue-50 transition transform hover:scale-110 active:scale-95"
                    >
                      <SquarePen className="h-5 w-5" />
                    </Link>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-600 hover:text-red-700 p-2 rounded-full 
                   hover:bg-red-50 transition transform hover:scale-110 active:scale-95"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 sm:top-8 lg:top-20 animate-fadeIn border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 text-gray-700">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-medium transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Cart;
