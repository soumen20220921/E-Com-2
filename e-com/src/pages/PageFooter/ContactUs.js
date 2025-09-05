import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Contact Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Help Center
            </h1>
            <p className="text-gray-500">
              If you have any questions or concerns, feel free to reach out to us.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info and Details Section */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-8 md:p-12 flex flex-col justify-center text-gray-700">
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              WE ARE HERE - YOU CAN KEEP IN TOUCH WITH US ANYTIME
            </h3>
            <div className="mt-4 space-y-2">
              <h4 className="text-lg font-semibold text-gray-800">Contact Us:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Phone: +91 9883277103</li>
                <li>Email: pomwb2004@gmail.com</li>
                <li>Address : Patrasayer, Bankura Patrasayer, West Bengal 722206</li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              EXPLORE OUR PRODUCTS
            </h3>
            <p className="text-gray-600">
              We offer a wide range of products including clothing, electronics, home goods, and more. Our collection is curated to bring you the best in quality and style.
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              OUR LATEST COLLECTIONS
            </h3>
            <p className="text-gray-600">
              Our products are available in a variety of materials and styles, perfect for every sphere of your life. Whether you're looking for a comfortable outfit for a casual day out, a gadget to simplify your life, or elegant home decor, our collections are designed to meet your needs. We focus on providing high-quality items that are both durable and stylish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;