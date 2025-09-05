import React from 'react';
import { Link } from 'react-router-dom';
import { GiHanger } from "react-icons/gi";

const Pagenotfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            <span>pomwb.com</span>
          </Link>
          <span className="block sm:inline mt-1 sm:mt-0 sm:ml-2">Your Trusted E-commerce Partner</span>
        </h3>
        <div className="flex justify-center text-5xl sm:text-7xl text-indigo-500">
          <GiHanger />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          We couldn't find any matches!
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-600 font-medium">
          Please check the spelling or try searching for something else.
        </h2>
        <Link
          to="/"
          className="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Pagenotfound;