import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { AiOutlineFileDone } from "react-icons/ai";
import { motion } from "framer-motion";

const PaymentConfirmationPage = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToHome = () => {
    navigate("/");
  };

  const viewOrders = () => {
    navigate("/account");
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 } }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.4 } }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1], // Animates between 100% and 105% size
      opacity: [1, 0.8, 1], // Fades slightly and returns
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-50 font-sans">
      <motion.div
        className="relative w-full max-w-lg p-8 sm:p-10 bg-white rounded-3xl shadow-2xl text-center border border-slate-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
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
              <FaCheckCircle className="text-6xl sm:text-7xl text-amber-600" />
            </motion.div>
          </motion.div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-slate-600">
            Thank you for your purchase. Your order is confirmed.
          </p>
        </div>

        <div className="my-8 pt-6 border-t border-dashed border-slate-300">
          <p className="text-base text-slate-700 font-semibold mb-3">
            How was your experience?
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                className={`text-2xl sm:text-3xl cursor-pointer transition-colors duration-200 
                            ${star <= rating ? "text-amber-500" : "text-gray-400"} hover:text-amber-500`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg 
                       bg-amber-600 text-white shadow-lg transition-all hover:bg-amber-700
                       focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
          >
            <FaHouseChimney className="text-xl" /> Go to Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={viewOrders}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg 
                       bg-gray-200 text-gray-700 shadow-md transition-all hover:bg-gray-300
                       focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
          >
            <AiOutlineFileDone className="text-xl" /> View Orders
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentConfirmationPage;