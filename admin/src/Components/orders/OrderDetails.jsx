import { ArrowLeft, CheckCircle, XCircle, MapPin, Printer } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context/Context";

const OrderDetails = ({ order, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [trackingInput, setTrackingInput] = useState("");
  const { fetchOrders } = useAppContext();
  // console.log("order",order);
  if (!order) return null;

 const acceptOrReject = async (id, action) => {
    try {
      let payload = {};

      if (action === "accept") {
        payload = {
          ...order,
          orderAccept: true,
          orderReject: false,
          orderDispatch: false,
        };
      } else if (action === "reject") {
        payload = {
          ...order,
          orderReject: true,
          orderAccept: false,
          orderDispatch: false,
        };
      } else if (action === "dispatch") {
        payload = { ...order, orderDispatch: true };
      } else if (action === "tracking") {
        payload = { ...order, trackingId: trackingInput };
      }

      await axios.put(
        `http://localhost:8000/api/payment/dispatch/${id}`,
        payload
      );

      fetchOrders();
      setIsModalOpen(false); // close modal after success
    } catch (error) {
      alert(`Error performing ${action} action: ${error.message}`);
    }
  };
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order #{order?._id}</p>
          </div>
        </div>

        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center">
          <Printer className="h-4 w-4 mr-2" />
          Print Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Status
              </h2>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                {order?.orderAccept
                  ? "Accepted"
                  : order?.orderReject
                  ? "Rejected"
                  : order?.trackingId
                  ? "Dispatched"
                  : "New"}
              </span>
            </div>

            {/* Action Buttons */}
            {order?.orderDispatch ? (
              // 👉 If already dispatched → show Add Tracking ID
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full justify-center"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Add Tracking ID
              </button>
            ) : order?.orderAccept ? (
              // 👉 If accepted but not dispatched
              <button
                onClick={() => acceptOrReject(order._id, "dispatch")}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full justify-center"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Dispatch
              </button>
            ) : (
              // 👉 If neither accepted nor dispatched → show Accept/Reject
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => acceptOrReject(order._id, "accept")}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full justify-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Order
                </button>
                <button
                  onClick={() => acceptOrReject(order._id, "reject")}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full justify-center"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Order
                </button>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Products
            </h2>
            <div className="space-y-4">
              {order?.orderItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={
                      item.imgSrc
                        ? `http://localhost:8000/img/${item.imgSrc}`
                        : "https://via.placeholder.com/64"
                    }
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.qty}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{item.price / item.qty} each
                    </p>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className="font-semibold text-gray-900">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{order?.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Name
                </label>
                <p className="text-gray-900">{order?.userShipping?.FullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone
                </label>
                <p className="text-gray-900">{order?.userShipping?.Phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Payment Status
                </label>
                <p className="text-gray-900">{order?.payStatus}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Tracking ID
                </label>
                <p className="text-blue-600">
                  {order?.trackingId || "Not Assigned"}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Shipping Address
              </h2>
            </div>
            <div className="text-gray-700">
              <p>{order?.userShipping?.Add}</p>
              <p>
                {order?.userShipping?.VillorCity}, {order?.userShipping?.Dist}
              </p>
              <p>
                {order?.userShipping?.State} - {order?.userShipping?.Pin}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 🔹 Tracking ID Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add Tracking ID
            </h2>
            <input
              type="text"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="Enter Tracking ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => acceptOrReject(order._id, "tracking")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
