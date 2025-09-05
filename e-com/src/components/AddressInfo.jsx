import React, { useState, useEffect } from "react";
import { MapPin, X, CheckCircle, User, Phone, Map, Globe, Home } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const AddressInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    FullName: "",
    Add: "",
    VillorCity: "",
    Dist: "",
    State: "",
    Pin: "",
    Phone: "",
  });

  const { address, setAddress, error, setError, loading, setLoading } =
    useAppContext();

  // Effect to pre-populate the form if an address already exists
  useEffect(() => {
    if (address) {
      setFormData({
        FullName: address.FullName || "",
        Add: address.Add || "",
        VillorCity: address.VillorCity || "",
        Dist: address.Dist || "",
        State: address.State || "",
        Pin: address.Pin || "",
        Phone: address.Phone || "",
      });
    }
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation: Ensure it's exactly 10 digits
    if (!/^\d{10}$/.test(formData.Phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    } else {
      setError(null);
    }
    
    // Simple validation to ensure pincode is a number
    if (isNaN(Number(formData.Pin))) {
      setError("Pin Code must be a number.");
      return;
    } else {
        setError(null);
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const dataToSend = { ...formData, userId };

      let res;
      setLoading(true);

      if (address?._id) {
        // Update existing address
        res = await axios.put(
          `http://localhost:8000/api/address/updateAddress/${address._id}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Auth: token }),
            },
          }
        );
      } else {
        // Add new address
        res = await axios.post(
          "http://localhost:8000/api/address/addaddress",
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Auth: token }),
            },
          }
        );
      }
      setLoading(false);

      if (res.data.success !== false) {
        setError(null);
        setShowPopup(false);
        setShowSuccessMessage(true);
        setAddress(res.data.address);
        
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        setError(res.data.message || "Error saving address.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          My Addresses
        </h2>
        <button
          onClick={handleEditClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0 shadow-md text-sm sm:text-base"
        >
          {address ? "Edit Address" : "Add New Address"}
        </button>
      </div>

      {/* Address Card Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        ) : (
          address ? (
            <div className=" w-full ">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <User size={20} className="text-gray-500" />
                  <span className="text-lg font-semibold text-gray-800">
                    {address.FullName}
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Default Address
                </span>
              </div>
              <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                <div className="flex items-start">
                  <MapPin size={20} className="text-gray-500 mr-2 flex-shrink-0" />
                  <p>
                    {address.Add}, {address.VillorCity}, {address.Dist}
                    <br />
                    {address.State} - {address.Pin}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone size={20} className="text-gray-500 mr-2" />
                  <p>{address.Phone}</p>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="w-full mt-6 bg-gray-50 text-blue-600 font-semibold py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Edit Address
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4 animate-bounce" />
              <p className="text-gray-500 text-base sm:text-lg mb-4">No addresses saved yet.</p>
              <button
                onClick={handleEditClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base"
              >
                Add New Address
              </button>
            </div>
          )
        )}
      </div>

      {/* Full-screen Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-600 bg-opacity-80 text-white z-50 animate-fade-in px-4">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-20 w-20 sm:h-24 sm:w-24 mb-4 animate-pulse" />
            <p className="text-xl sm:text-2xl font-bold">Address Updated Successfully!</p>
          </div>
        </div>
      )}

      {/* Popup Form (Modal) */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md md:max-w-xl shadow-xl relative animate-scale-up">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">
              {address ? "Edit Address" : "Add New Address"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="relative">
                <label className="sr-only">Full Name</label>
                <input
                  type="text"
                  name="FullName"
                  placeholder="Full Name"
                  value={formData.FullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  required
                />
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <label className="sr-only">Street Address</label>
                <input
                  type="text"
                  name="Add"
                  placeholder="Street Address"
                  value={formData.Add}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  required
                />
                <Map size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative">
                  <label className="sr-only">Village or City</label>
                  <input
                    type="text"
                    name="VillorCity"
                    placeholder="Village or City"
                    value={formData.VillorCity}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    required
                  />
                  <Home size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                
                <div className="relative">
                  <label className="sr-only">District</label>
                  <input
                    type="text"
                    name="Dist"
                    placeholder="District"
                    value={formData.Dist}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    required
                  />
                  <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                  <label className="sr-only">State</label>
                  <input
                    type="text"
                    name="State"
                    placeholder="State"
                    value={formData.State}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    required
                  />
                  <Globe size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                  <label className="sr-only">Pin Code</label>
                  <input
                    type="text"
                    name="Pin"
                    placeholder="Pin Code"
                    value={formData.Pin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    required
                  />
                  <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <label className="sr-only">Phone Number (10 digits)</label>
                <input
                  type="text"
                  name="Phone"
                  placeholder="Phone Number (10 digits)"
                  value={formData.Phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  required
                />
                <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {error && (
                <div className="w-full text-center bg-red-100 text-red-700 p-2 rounded-md transition-all duration-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm sm:text-base"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressInfo;