import React from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = () => {
  return (
    <div
      className={`
        fixed top-4 right-4 z-50
        max-w-xs sm:max-w-sm w-11/12
        p-4 border rounded-lg shadow-lg
        transition-all duration-300 ease-in-out
        translate-x-0 opacity-100
        bg-green-50 border-green-200
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-green-500" />
          {/* Replace with XCircle or AlertCircle and colors for error/warning */}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Product added to cart!
            {/* Replace with your message */}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none p-1 transition-colors"
            aria-label="Close toast"
            // No onClick handler here
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
