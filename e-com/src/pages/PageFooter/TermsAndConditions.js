import React from "react";
import { useSpring, animated } from "react-spring";

const TermsAndConditions = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <animated.h1
          style={fadeIn}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8"
        >
          Terms & Conditions
        </animated.h1>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <p className="text-gray-600 leading-relaxed">
            Welcome to PomWb's Terms and Conditions page. Please read these terms
            carefully before using our service.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using our service, you agree to be bound by these
            terms. If you do not agree with any part of the terms, you may not use
            our service.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify or replace these terms at any time. It
            is your responsibility to check this page periodically for changes.
            Your continued use of the service after any changes constitutes
            acceptance of those changes.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Use of Service</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to use the service only for lawful purposes and in
            accordance with these terms. You are responsible for maintaining the
            confidentiality of your account and password and for restricting
            access to your account.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Termination</h2>
          <p className="text-gray-600 leading-relaxed">
            We may terminate or suspend your account and bar access to the service
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the terms.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company, PomWb, is based, without regard to its conflict of law provisions.
          </p>
        </animated.div>

        <animated.div style={fadeIn} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about these Terms, please contact us at:
            <br />
            <strong className="font-semibold text-blue-600">pomwb@gmail.com</strong> or{" "}
            <strong className="font-semibold">+91 9907804710</strong>
          </p>
        </animated.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;