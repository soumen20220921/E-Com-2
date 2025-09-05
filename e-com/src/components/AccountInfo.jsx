import React from 'react'
import { useAppContext } from '../context/AppContext';


export const AccountInfo = () => {

  const userEnail= localStorage.getItem("email");
  const userName= localStorage.getItem("name");
  // console.log("address",address);

  return (
    <div>
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
      Profile Information
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={userName || "User Name"}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={userEnail || "User Email"}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>
    </div>
  </div>
  )
}

export default AccountInfo;
