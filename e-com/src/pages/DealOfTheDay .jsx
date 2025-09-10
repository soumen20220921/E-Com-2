import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timer } from "lucide-react";

const DealOfTheDay = ({ dealOfTheDay }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!dealOfTheDay) return;

    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24); 

    const interval = setInterval(() => {
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dealOfTheDay]);

  if (!dealOfTheDay) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <Timer className="text-yellow-500 animate-pulse" /> Deal of the Day
      </h2>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center bg-white rounded-2xl shadow-2xl p-4 sm:p-6 relative overflow-hidden animate-slide-in">
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <img
            src={
              dealOfTheDay.images?.[0]
                ? `http://localhost:8000/img/${dealOfTheDay.images[0]}`
                : "https://placehold.co/500x300"
            }
            alt={dealOfTheDay.productName}
            className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          {/* Discount badge */}
          {dealOfTheDay.discount && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg animate-pulse ">
              🔥 {dealOfTheDay.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="text-center md:text-left space-y-3 sm:space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {dealOfTheDay.productName}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Exclusive today-only offer. Limited stock available!
          </p>

          {/* Price */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            {dealOfTheDay.originalPrice && (
              <span className="line-through text-gray-400 text-sm sm:text-lg">
                ₹{dealOfTheDay.originalPrice}
              </span>
            )}
            <span className="text-red-600 font-extrabold text-xl sm:text-2xl">
              ₹{dealOfTheDay.price}
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center md:justify-start items-center gap-2 text-sm sm:text-base bg-gray-100 px-3 py-2 rounded-lg font-mono text-gray-800 shadow-inner">
            <span>{String(timeLeft.hours).padStart(2, "0")}h</span> :
            <span>{String(timeLeft.minutes).padStart(2, "0")}m</span> :
            <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
          </div>

          {/* Grab Deal Button */}
          <Link
            to={`/productDetails/${dealOfTheDay._id}`}
            className="inline-block mt-3 px-5 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-bounce"
          >
            Grab Deal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;
