import React from 'react';
import { useSpring, animated } from 'react-spring';

const ShippingAndDelivery = () => {
    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 1000 },
    });

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <animated.h1
                    style={fadeIn}
                    className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8"
                >
                    Shipping & Delivery
                </animated.h1>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <p className="text-gray-600 leading-relaxed">
                        We are committed to delivering your order as quickly as possible. Please review our shipping and delivery policies below.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Processing Time</h2>
                    <p className="text-gray-600 leading-relaxed">
                        All orders are shipped within **2-3 business days** and delivered within **7-10 business days**. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Shipping Rates & Delivery Estimates</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur, depending on your location and other factors.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Shipment Confirmation & Order Tracking</h2>
                    <p className="text-gray-600 leading-relaxed">
                        You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within **24 hours**.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Customs, Duties, and Taxes</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We are not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Damages</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We are not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim (a video of package unboxing is **mandatory**). Save all packaging materials and damaged goods before filing a claim.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Contact Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about these Terms, please contact us at: **pomwb@gmail.com** or **+91 9907804710**
                    </p>
                </animated.div>
            </div>
        </div>
    );
};

export default ShippingAndDelivery;