import React from 'react';
import { BsBank2, BsQrCodeScan } from "react-icons/bs";
import { IoMdWallet } from "react-icons/io";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { FaGooglePay, FaCcAmazonPay } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";


const PaymentOptions = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Payment Options
          </h1>
          <div className="flex justify-center items-center text-5xl text-indigo-600 mb-2">
            <SiPhonepe />
          </div>
          <h4 className="text-xl font-bold text-gray-800">
            Powered by PhonePe
          </h4>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            PomWb offers multiple payment methods for your convenience, powered by PhonePe — a secure and fast way to complete your transactions.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Credit/Debit Cards */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-indigo-500 mb-4">
              <IoCardOutline />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Credit/Debit Cards</h2>
            <p className="text-gray-500">
              Pay securely using all major credit and debit cards. Transactions are encrypted and processed through trusted payment gateways for maximum security.
            </p>
          </div>

          {/* UPI Payments */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-indigo-500 mb-4">
              <BsQrCodeScan />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">UPI Payments</h2>
            <p className="text-gray-500">
              Make quick and hassle-free payments using UPI. Just scan the QR code with your preferred UPI app and authorize the transaction seamlessly.
            </p>
          </div>

          {/* Net Banking */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-indigo-500 mb-4">
              <BsBank2 />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Net Banking</h2>
            <p className="text-gray-500">
              Use PhonePe’s secure net banking option to pay directly from your bank account. Choose your bank, log in, and confirm the payment safely.
            </p>
          </div>

          {/* Wallets */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-indigo-500 mb-4">
              <IoMdWallet />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Wallets</h2>
            <p className="text-gray-500">
              Make payments using top digital wallets like PhonePe, Paytm, and more. Simply log in to your wallet and authorize the transaction in a few easy steps.
            </p>
          </div>

          {/* Paytm */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-blue-500 mb-4">
              <SiPaytm />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Paytm</h2>
            <p className="text-gray-500">
              Pay through the Paytm app by logging in and authorizing your payment securely. Quick, safe, and mobile-friendly.
            </p>
          </div>

          {/* Google Pay */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-green-500 mb-4">
              <FaGooglePay />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Google Pay</h2>
            <p className="text-gray-500">
              Use Google Pay for instant payments. Select GPay as your method, confirm via your mobile device, and you're done in seconds.
            </p>
          </div>

          {/* Amazon Pay */}
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transition-transform transform hover:scale-105 duration-300">
            <div className="flex justify-center text-4xl text-orange-500 mb-4">
              <FaCcAmazonPay />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Amazon Pay</h2>
            <p className="text-gray-500">
              Pay using your Amazon Pay balance or linked accounts. Log in to your Amazon account and complete the transaction with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;