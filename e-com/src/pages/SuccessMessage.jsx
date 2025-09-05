// src/components/AuthSuccess.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ name }) => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4 text-center overflow-hidden relative
      bg-gradient-to-br from-blue-700 to-purple-600 animate-fadeIn">
      
      {/* Background animation elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-lighten filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-lighten filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center space-y-8 animate-fadeInUp">
        {/* Animated Icon */}
        <div className="p-3  sm:p-6 bg-white bg-opacity-20 rounded-full animate-bounceOnce">
          <CheckCircle className="h-15 w-15 sm:h-28 w-28 text-white stroke-1" />
        </div>

        {/* Message */}
        <h1 className="text-3xl whitespace-nowrap sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Welcome, {name}!
        </h1>
        <p className="text-lg sm:text-xl text-white text-opacity-80 max-w-lg">
          You've successfully signed in. Explore our products and enjoy your shopping experience!
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;