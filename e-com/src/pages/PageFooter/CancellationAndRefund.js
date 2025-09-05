import React from "react";
import { useSpring, animated } from "react-spring";

const CancellationAndRefund = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 800 },
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <animated.h1
          style={fadeIn}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8"
        >
          Return, Exchange & Cancellation Policy
        </animated.h1>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <p className="text-gray-600 leading-relaxed">
            At <strong className="font-bold">PomWb</strong>, we are committed to delivering high-quality products and
            providing excellent customer satisfaction. Please read our policy
            carefully to understand your rights and responsibilities regarding
            order cancellation, returns, and exchanges.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Order Cancellation</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              Orders can be cancelled <strong className="font-semibold">before they are shipped</strong>.
            </li>
            <li>
              Once the order has been dispatched, cancellation requests will no
              longer be accepted.
            </li>
            <li>
              To cancel your order, please email us with your order ID at{" "}
              <strong className="font-semibold text-blue-600">pomwb@gmail.com</strong>.
            </li>
          </ul>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Refund Process</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              Once approved, refunds will be processed within{" "}
              <strong className="font-semibold">5–7 business days</strong> to the original payment method.
            </li>
            <li>
              If delays occur, please contact your bank or payment provider for
              assistance.
            </li>
          </ul>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Exchange Policy</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Exchanges are available only for defective or damaged items.</li>
            <li>
              Request must be submitted within <strong className="font-semibold">3 days</strong> of
              receiving the product.
            </li>
            <li>
              Exchanges will be <strong className="font-semibold">done within 5 days</strong> of delivery.
            </li>
          </ul>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Return Policy</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              Returns are accepted for products that are{" "}
              <strong className="font-semibold">damaged, defective, or incorrect</strong> upon delivery.
            </li>
            <li>
              Return requests must be submitted within <strong className="font-semibold">7 days</strong> of
              receiving your order.
            </li>
            <li>
              An <strong className="font-semibold">unboxing video is mandatory</strong> for all return or
              refund requests.
            </li>
            <li>
              Items must be unused, in their original packaging, and include all
              original tags and proof of purchase.
            </li>
            <li>
              Once approved, returns will be processed within{" "}
              <strong className="font-semibold">5 business days</strong> of receiving the returned item.
            </li>
            <li>
              Please contact our support team to initiate a return and receive
              instructions.
            </li>
            <li>
              Approved refunds will be processed and credited within 5
              to 7 working days.
            </li>
          </ul>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Contact Us</h2>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">If you have any questions or concerns, feel free to contact us:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <strong className="font-semibold">Email:</strong> pomwb@gmail.com
            </li>
            <li>
              <strong className="font-semibold">Phone:</strong> +91 99078 04710
            </li>
          </ul>
        </animated.div>
      </div>
    </div>
  );
};

export default CancellationAndRefund;