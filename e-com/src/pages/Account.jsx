import React, { useState } from 'react';
import { User, MapPin, Package, LogOut } from 'lucide-react';
import AccountInfo from '../components/AccountInfo';
import AddressInfo from '../components/AddressInfo';
import OrderInfo from '../components/OrderInfo';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// import { useAppContext } from '../context/AppContext';

const Account = () => {
  const userEnail= localStorage.getItem("email");
    const {address} =useAppContext();
  
  const naviage =useNavigate();
  // 1 = Profile, 2 = Addresses, 3 = Orders
  const [comp, setComp] = useState(1);
   const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    naviage("/auth")
    window.location.reload();
   }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
          My Account
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4 sm:top-8 md:top-20">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center shadow-inner">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{address?.FullName || "User Name"}</h3>
                <p className="text-sm text-gray-600 truncate">{userEnail || "user@example.com"}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setComp(1)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold shadow-sm ${
                    comp === 1
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setComp(2)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold shadow-sm ${
                    comp === 2
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Addresses</span>
                </button>

                <button
                  onClick={() => setComp(3)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold shadow-sm ${
                    comp === 3
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>Orders</span>
                </button>

                <button
                onClick={logOut}
                 className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {comp === 1 && <AccountInfo />}
              {comp === 2 && <AddressInfo />}
              {comp === 3 && <OrderInfo />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
