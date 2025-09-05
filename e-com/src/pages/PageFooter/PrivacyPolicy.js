 import React from 'react';
import { useSpring, animated } from 'react-spring';

const PrivacyPolicy = () => {
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
                    Privacy Policy
                </animated.h1>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <p className="text-gray-600 leading-relaxed">
                        Welcome to our Privacy Policy page. Your privacy is critically important to us.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We collect various types of information in connection with the services we provide, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Personal identification information</li>
                        <li>Usage Data</li>
                        <li>Cookies and tracking data</li>
                    </ul>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        The information we collect is used for various purposes such as:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>To provide and maintain our service.</li>
                        <li>To notify you about changes to our service.</li>
                        <li>To provide customer support.</li>
                        <li>To gather analysis or valuable information so that we can improve our service.</li>
                    </ul>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Security of Your Data</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We take the security of your data seriously and implement a variety of measures to protect it.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>
                </animated.div>

                <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about this policy, please contact us at: <strong className="font-semibold text-blue-600">pomwb@gmail.com</strong> or <strong className="font-semibold">+91 9907804710</strong>
                    </p>
                </animated.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;