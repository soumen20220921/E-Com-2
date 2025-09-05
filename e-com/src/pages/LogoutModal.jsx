// src/components/LogoutModal.jsx
import React from 'react';
import { LogOut } from 'lucide-react';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-70 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-sm transform scale-95 animate-scaleIn">
        <div className="flex justify-center mb-4">
          <LogOut className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Are you sure?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          This action will log you out of your account. You will need to sign in again to continue.
        </p>
        <div className="flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            className="w-full sm:w-1/2 px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-1/2 px-4 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;