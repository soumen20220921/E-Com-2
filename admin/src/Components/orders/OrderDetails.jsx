import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MapPin,
  Printer,
  Loader2,
  User,
  Phone,
  Home,
  Globe,
  Flag,
  Hash,
  Info,
} from "lucide-react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/Context";
import html2pdf from "html2pdf.js";

const Notification = ({ type, message, onClose }) => {
  const icons = {
    success: <CheckCircle className="h-6 w-6 text-green-500" />,
    error: <XCircle className="h-6 w-6 text-red-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-up md:max-w-md w-[calc(100%-2rem)]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="p-4 flex items-center space-x-4">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{message}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="h-5 w-5" />
          </button>
        </div>
        <div className="h-1 bg-gray-200">
          <div className={`h-1 animate-progress ${colors[type]}`}></div>
        </div>
      </div>
    </div>
  );
};

const OrderDetails = ({ order, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const { fetchOrders } = useAppContext();
  const invoiceRef = useRef(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!order) return null;

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const acceptOrReject = async (id, action) => {
    setLoading(true);
    try {
      let payload = {};
      if (action === "accept")
        payload = {
          ...order,
          orderAccept: true,
          orderReject: false,
          orderDispatch: false,
        };
      else if (action === "reject")
        payload = {
          ...order,
          orderReject: true,
          orderAccept: false,
          orderDispatch: false,
        };
      else if (action === "dispatch")
        payload = { ...order, orderDispatch: true };
      else if (action === "tracking")
        payload = { ...order, trackingId: trackingInput };

      await axios.put(
        `http://localhost:8000/api/payment/dispatch/${id}`,
        payload
      );
      fetchOrders();
      setLoading(false);
      setIsModalOpen(false);

      switch (action) {
        case "accept":
          showNotification("success", "Order Accepted ✅");
          break;
        case "reject":
          showNotification("error", "Order Rejected ❌");
          break;
        case "dispatch":
          showNotification("info", "Order Dispatched 🚚");
          break;
        case "tracking":
          showNotification("success", `Tracking ID Added: ${trackingInput}`);
          break;
        default:
          break;
      }

      setTimeout(() => onClose(), 1200);
    } catch (error) {
      setLoading(false);
      showNotification("error", `Error: ${error.message}`);
    }
  };

  const handlePrintInvoice = () => {
    setIsPrinting(true);
    const element = invoiceRef.current;
    const customerName = order?.userShipping?.FullName || "Customer";
    const orderId = order?._id || "Invoice";

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${customerName}_invoice_${orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .finally(() => {
        setIsPrinting(false);
      });
  };

  const subTotal =
    order?.orderItems?.reduce((sum, item) => sum + item.price, 0) || 0;
  const totalInvoiceValue = subTotal;

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
            <p className="text-sm text-gray-500 mt-1">
              Placed on: {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
        </div>

        <button
          onClick={handlePrintInvoice}
          disabled={isPrinting}
          className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center mt-2 sm:mt-0 ${
            isPrinting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isPrinting ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            <Printer className="h-4 w-4 mr-2" />
          )}
          Print Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status & Actions */}
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
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={loading}
                className={`flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                <MapPin className="h-4 w-4 mr-2" />
                Add Tracking ID
              </button>
            ) : order?.orderAccept ? (
              <button
                onClick={() => acceptOrReject(order._id, "dispatch")}
                disabled={loading}
                className={`flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                <MapPin className="h-4 w-4 mr-2" />
                Dispatch
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => acceptOrReject(order._id, "accept")}
                  disabled={loading}
                  className={`flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Order
                </button>
                <button
                  onClick={() => acceptOrReject(order._id, "reject")}
                  disabled={loading}
                  className={`flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Order
                </button>
              </div>
            )}
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Products ({order?.orderItems?.length})
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
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
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

            <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                Payment Method: {order?.paymentMethod || "N/A"}
              </p>
              <div className="flex justify-between w-full sm:w-auto">
                <span className="font-semibold text-gray-900 text-lg">
                  Total
                </span>
                <span className="font-bold text-gray-900 text-lg ml-2">
                  ₹{order?.amount}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {order?.userShipping?.FullName}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {order?.userShipping?.Phone}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                {order?.payStatus}
              </p>
              <p>
                <span className="font-medium">Tracking ID:</span>{" "}
                {order?.trackingId || "Not Assigned"}
              </p>
              <p>
                <span className="font-medium">Items:</span>{" "}
                {order?.orderItems?.length}
              </p>
              <p>
                <span className="font-medium">Estimated Delivery:</span>{" "}
                {order?.estimatedDelivery || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Shipping Address
              </h2>
            </div>
            <div className="text-gray-700 text-sm">
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

      {/* The Invoice Design (Hidden from view) */}
      <div className="hidden">
        <div ref={invoiceRef} className="p-8 font-sans text-gray-800 text-sm">
          {/* Company Info and TAX INVOICE Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-blue-800">POMWB</h1>
              <p className="text-xs mt-1">
                Patrasayer, Bankura, West Bengal, 722206
              </p>
              <p className="text-xs">
                Contact No: 9732505704, WhatsApp No: 8250961098
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-blue-800">TAX INVOICE</h2>
              <p className="text-sm mt-2">
                <span className="font-semibold">Invoice No:</span>{" "}
                {order?._id.slice(18)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Order ID:</span> {order?._id}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.orderDate).toLocaleDateString("en-GB")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Transaction ID:</span>{" "}
                {order?.transactionId || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Payment Status:</span>{" "}
                {order?.payStatus}
              </p>
            </div>
          </div>

          <div className="border border-gray-300 p-4 mb-8 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              Customer Information
            </h3>
            <div className="text-sm space-y-4">
              {/* Billing Information */}
              <div>
                <p className="font-bold text-blue-700 mb-3">
                  Billing Information
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  {/* Left column */}
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">Name:</span>&nbsp;
                      {order?.userShipping?.FullName}
                    </p>

                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">Phone:</span>&nbsp;
                      {order?.userShipping?.Phone}
                    </p>

                    <p className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">Street:</span>&nbsp;
                      {order?.userShipping?.Add}
                    </p>
                  </div>

                  {/* Right column */}
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">City/Village:</span>&nbsp;
                      {order?.userShipping?.VillorCity}
                    </p>

                    <p className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">District:</span>&nbsp;
                      {order?.userShipping?.Dist}
                    </p>

                    <p className="flex items-center">
                      <Flag className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">State:</span>&nbsp;
                      {order?.userShipping?.State}
                    </p>

                    <p className="flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-semibold">PIN:</span>&nbsp;
                      {order?.userShipping?.Pin}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100 border-b border-t border-gray-300 text-xs font-semibold text-gray-700">
                <th className="p-2 w-10">S.No</th>
                <th className="p-2">Description</th>
                <th className="p-2 text-center w-16">Qty</th>
                <th className="p-2 text-right w-20">Price</th>
                <th className="p-2 text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item, i) => (
                <tr key={i} className="border-b border-gray-200 text-xs">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2 text-center">{item.qty}</td>
                  <td className="p-2 text-right">₹{item.price / item.qty}</td>
                  <td className="p-2 text-right">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="flex justify-end mb-12">
            <div className="w-full max-w-xs text-right text-sm">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">Taxable Value:</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t-2 border-gray-400 pt-2 mt-2">
                <span>Total Invoice Value:</span>
                <span>₹{totalInvoiceValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Authorized Signatory */}
          <div className="flex justify-end mb-2">
            <div className="text-right">
              <p className="font-semibold">FOR POMWB</p>
              <p className="text-sm">Proprietor - Boisali Sarkar</p>
              <div className="mt-8 h-px w-48 bg-gray-400 ml-auto"></div>
              <p className="font-semibold text-sm mt-2">Authorized Signatory</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-xs text-gray-600">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Note: This is a system-generated invoice and does not require a
              physical signature.
            </p>
          </div>
        </div>
      </div>

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

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default OrderDetails;