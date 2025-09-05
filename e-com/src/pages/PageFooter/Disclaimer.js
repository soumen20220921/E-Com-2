import React from 'react';
import { useSpring, animated } from 'react-spring';

const Disclaimer = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <animated.h1
          style={fadeIn}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8"
        >
          Disclaimer
        </animated.h1>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">General Information</h2>
          <p className="text-gray-600 leading-relaxed">
            The information contained in this website is for general information purposes only. The information is provided by Think & Learn Pvt Ltd and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Descriptions</h2>
          <p className="text-gray-600 leading-relaxed">
            PomWb attempts to be as accurate as possible in describing our products. However, we do not warrant that product descriptions, specifications, pricing, or any other content on our website are accurate, complete, reliable, current, or error-free. In the event of any errors, inaccuracies, or omissions, we reserve the right to correct such errors and change or update information at any time without prior notice.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">External Links</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website may contain links to third-party websites or services that are not owned or controlled by PomWb. These links are provided for your convenience and do not imply an endorsement or recommendation by PomWb of the linked website or service. PomWb has no control over the content, policies, or practices of third-party websites or services, and we are not responsible for any damage or loss caused by your use of such websites or services. Your use of third-party websites or services is subject to the terms and conditions of those websites or services, and you should review their policies and practices before using them.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            PomWb will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages. PomWb does not warrant that the functions contained in the site will be uninterrupted or error-free, that defects will be corrected, or that the site or the server that makes it available are free of viruses or other harmful components.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Legal Compliance</h2>
          <p className="text-gray-600 leading-relaxed">
            PomWb is committed to complying with all Indian laws and regulations, including those related to e-commerce, consumer protection, and data privacy. We strive to ensure that our website and business practices are in compliance with all applicable laws and regulations.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this disclaimer or our practices, please contact us at: pomwb@gmail.com or +91 9907804710
          </p>
        </animated.div>
      </div>
    </div>
  );
};

export default Disclaimer;