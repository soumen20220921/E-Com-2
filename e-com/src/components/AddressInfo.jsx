import React, {  useState } from "react";
import { MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
const AddressInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    FullName: "",
    Add: "",
    VillorCity: "",
    Dist: "",
    State: "",
    Pin: "",
    Phone: "",
  });

  const { address,
    setAddress,
    error,
    setError,
    loading,
    setLoading} = useAppContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const dataToSend = { ...formData, userId };
  
      let res;
  
      if (address?._id) {
        setLoading(true);
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
        setLoading(false);
      } else {
        setLoading(true);
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
        setLoading(false);
      }
  
      // console.log("Response:", res.data);
  
      if (res.data.success !== false) {
        setError(null)
        alert(res.data.message);
        setShowPopup(false);
        setFormData({
          FullName: "",
          Add: "",
          VillorCity: "",
          Dist: "",
          State: "",
          Pin: "",
          Phone: "",
        });
        setAddress(res.data.address); // update UI immediately
      } else {
        alert(res.data.message || "Error saving address.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-8">
      
      {error?<div className="w-full text-center bg-red-300 p-2 mb-2">{error}</div>:<div></div>}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          My Addresses
        </h2>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {address?"Edit Address":"Add New Address"}
        </button>
      </div>

      {/* Empty Address State */}
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        {
  address ? (
    loading ? (
      <div className="text-center text-gray-500">Loading...</div>
    ) : (
      <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">{address.FullName}</h3>
        <p className="text-gray-700">{address.Phone}</p>
        <p className="text-gray-700">{address.VillorCity}</p>
        <p className="text-gray-700">{address.Address}</p>
        <p className="text-gray-700">
          {address.Dist}, {address.State} - {address.Pin}
        </p>
      </div>
    )
  ) : (
    <p className="text-gray-500">No addresses saved yet.</p>
  )
}

        <button
          onClick={() => setShowPopup(true)}
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {address?"Edit Address":"Add New Address"}
        </button>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="FullName"
                placeholder="Full Name"
                value={formData.FullName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="Add"
                placeholder="Full Address"
                value={formData.Add}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="VillorCity"
                placeholder="Village or City"
                value={formData.VillorCity}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="Dist"
                placeholder="District"
                value={formData.Dist}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="State"
                placeholder="State"
                value={formData.State}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="Pin"
                placeholder="Pin Code"
                value={formData.Pin}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="Phone"
                placeholder="Phone Number"
                value={formData.Phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
