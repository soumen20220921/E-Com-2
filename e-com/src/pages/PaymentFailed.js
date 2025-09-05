import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);
    // Trigger the card animation after a brief delay
    const timer = setTimeout(() => {
      setAnimateCard(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTryAgain = () => {
    navigate("/cart");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  // Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, duration: 0.6 } }
  };

  // Framer Motion variants for icon animation
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.4 } }
  };

  // Framer Motion variants for the red pulsing circle
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-50 font-sans">
      <motion.div
        className="w-full max-w-lg p-8 sm:p-10 bg-white rounded-3xl shadow-2xl text-center border border-gray-200"
        variants={cardVariants}
        initial="hidden"
        animate={animateCard ? "visible" : "hidden"}
      >
        <div className="flex justify-center -mt-20 mb-8 sm:mb-10">
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-white shadow-2xl"
            variants={iconVariants}
          >
            <motion.div
              variants={pulseVariants}
              animate="pulse"
            >
              <FaTimesCircle className="text-6xl sm:text-7xl text-red-500" />
            </motion.div>
          </motion.div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
            Payment Failed!
          </h2>
          <p className="text-lg text-gray-600">
            Unfortunately, your payment could not be processed. Please review your details or try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTryAgain}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg 
                       bg-red-500 text-white shadow-lg transition-all hover:bg-red-600 
                       focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
          >
            Try Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg 
                       bg-gray-200 text-gray-700 shadow-md transition-all hover:bg-gray-300
                       focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Go to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;