import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin,  Shield, Truck, Code, Github, Star, CheckCircle } from 'lucide-react';

export default function Footer() {
   const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const footerLinks = {
    support: [
      { name: 'Help Center', path: '/help-center' },
      { name: 'Contact Us', path: '/contact-us' },
      { name: 'Shipping Info', path: '/shipping-info' },
      { name: 'Returns', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'Track Order', path: '/track-order' }
    ],
    company: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' },
      { name: 'Affiliate Program', path: '/affiliate' },
      { name: 'Wholesale', path: '/wholesale' }
    ]
  };

   const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubscribed(true);
        setIsSubmitting(false);
        setEmail('');
        console.log(`Subscribed with email: ${email}`);
      }, 3000);
    }
  };
  return (
    <footer className="bg-gray-900 text-white font-inter">
      {/* Main Footer Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-12">
          {/* Company Info Section */}
          <div className="lg:col-span-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center justify-center md:justify-start space-x-2 mb-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold">ShopHub</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              Your one-stop destination for premium quality products at unbeatable prices.
              We're committed to providing exceptional shopping experiences with fast shipping
              and outstanding customer service.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">support@shophub.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">123 Commerce St, New York</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-md">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-md">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-md">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" aria-label="Youtube" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-md">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Support Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Section - NEW */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Developers</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                This website was developed with passion by:
              </p>
              <Link
                to={`/developers`}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                className="flex items-center justify-center md:justify-start space-x-2"
              >
                <Code className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Alex & Jane</span>
              </Link>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:alex.jane@example.com" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  alex.jane@example.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Github className="h-4 w-4 text-blue-400" />
                <a href="https://github.com/alex-jane-devs" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            {subscribed ? (
              <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 animate-pulse">
                <CheckCircle className="h-6 w-6" />
                <p className="text-sm sm:text-base font-semibold">You've been successfully subscribed!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">Subscribe to get special offers, free giveaways, and updates.</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 w-full"
                    required
                    disabled={isSubmitting}
                  />
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:scale-105 w-full sm:w-auto font-medium" disabled={isSubmitting}>
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h3 className="text-xl font-semibold mb-6 text-center">Why Shop with Us?</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 text-center">
             <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Truck className="h-8 w-8 text-blue-400 mb-3" />
              <div className="text-xs md:text-lg font-medium">Fast Shipping</div>
              <div className="hidden md:inline text-sm text-gray-400 mt-1">On all orders over $100</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Shield className="h-8 w-8 text-green-400 mb-3" />
              <div className="text-xs md:text-lg font-medium">Secure Payments</div>
              <div className="hidden md:inline text-sm text-gray-400 mt-1">Advanced SSL encryption</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Star className="h-8 w-8 text-yellow-400 mb-3" />
              <div className="text-xs md:text-lg font-medium">Quality Guaranteed</div>
              <div className="hidden md:inline text-sm text-gray-400 mt-1">100% satisfaction policy</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-gray-400 text-xs sm:text-sm mb-2 md:mb-0">
              © 2024 ShopHub. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors hover:underline">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors hover:underline">Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors hover:underline">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}