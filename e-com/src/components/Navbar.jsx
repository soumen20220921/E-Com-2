import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineSearch,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { login, setLogin } = useAppContext();
  const navigate = useNavigate();

  const userName= localStorage.getItem("name");



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setLogin(true);
    }
  }, [setLogin]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsSearchVisible(false);
  };

  const NavButton = ({ label, icon: Icon, onClick, color }) => (
    <div className="relative group">
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className="group flex items-center justify-center h-10 w-10 rounded-full transition-colors duration-300 hover:bg-gray-100"
      >
        <Icon
          size={24}
          className={`group-hover:text-${color} transition-colors duration-300`}
        />
      </button>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );

  return (
    <nav className="shadow-lg sticky top-0 z-50 font-sans h-16 bg-white transition-all duration-300">
      <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto px-6 h-full flex items-center justify-between">
         <div
          onClick={() => {
            window.scrollTo(0, 0);
            handleNavigation("/");
          }}
          className="text-black text-2xl font-extrabold cursor-pointer hover:text-gray-600 transition-colors"
        >
          POMWB
        </div>

         <ul className="hidden lg:flex items-center gap-6 text-lg">
          {/* <NavButton
            label="Wishlist"
            icon={AiOutlineHeart}
            onClick={() => {
              window.scrollTo(0, 0);
              handleNavigation("/wishlist");
            }}
            color="red-500"
          /> */}
          <NavButton
            label="Cart"
            icon={AiOutlineShopping}
            onClick={() => {
              window.scrollTo(0, 0);
              handleNavigation("/cart");
            }}
            color="green-500"
          />

          <li>
            <div className="relative group">
              <button
                type="button"
                aria-label="Account"
                onClick={() => {
                  window.scrollTo(0, 0);
                  handleNavigation("/account");
                }}
                className={`flex items-center justify-center h-10 px-4 rounded-full font-semibold transition-all duration-300 ${login ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white  text-black border border-black hover:bg-gray-100'}`}
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                  {login ? (
                    <AiOutlineUser size={24} className="text-white hover:text-white" />
                  ) : (
                    <span className="text-sm">Log In</span>
                  )}
                  <span className={`transition-all duration-300 ease-in-out ${login ? 'max-w-0 whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100' : 'hidden'}`}>
                    {userName}
                  </span>
                </span>
                {!login && (
                  <span className="absolute inset-0 bg-grey-500 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                )}
              </button>
            </div>
          </li>
        </ul>

        <div className="lg:hidden flex items-center gap-4">
          {/* <button
            type="button"
            aria-label="Search"
            onClick={handleSearchToggle}
            className="text-black text-2xl p-2 focus:outline-none"
          >
            <AiOutlineSearch size={28} />
          </button> */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="text-black text-2xl p-2 focus:outline-none"
            onClick={handleMenuToggle}
          >
            {isMobileMenuOpen ? <IoMdClose size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`bg-white shadow-md transition-all duration-500 overflow-hidden ${isSearchVisible ? 'max-h-20' : 'max-h-0'}`}
      >
        <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto p-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
      </div>

       <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {login && (
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
            <span className="text-lg font-bold text-gray-800">Hi, {userName}!</span>
          </div>
        )}
        <ul className="flex flex-col p-4 gap-2">
          {login && (
            <li className="w-full">
              <button
                type="button"
                aria-label="Account"
                onClick={() => {
                  window.scrollTo(0, 0);
                  handleNavigation("/account");
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded hover:bg-gray-100 transition-colors duration-300"
              >
                <AiOutlineUser size={20} className="text-gray-600" />
                <span className="text-base font-medium">My Account</span>
              </button>
            </li>
          )}
          {/* <li className="w-full">
            <button
              type="button"
              aria-label="Wishlist"
              onClick={() => {
                window.scrollTo(0, 0);
                handleNavigation("/wishlist");
              }}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded hover:bg-gray-100 transition-colors duration-300"
            >
              <AiOutlineHeart
                size={20}
                className="text-gray-600"
              />
              <span className="text-base font-medium">Wishlist</span>
            </button>
          </li> */}
          <li className="w-full">
            <button
              type="button"
              aria-label="Cart"
              onClick={() => {
                window.scrollTo(0, 0);
                handleNavigation("/cart");
              }}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded hover:bg-gray-100 transition-colors duration-300"
            >
              <AiOutlineShopping
                size={20}
                className="text-gray-600"
              />
              <span className="text-base font-medium">Cart</span>
            </button>
          </li>
          {!login && (
            <li className="w-full">
              <button
                type="button"
                aria-label="Log In"
                onClick={() => {
                  window.scrollTo(0, 0);
                  handleNavigation("/account");
                }}
                className={`w-full text-center bg-blue-400 text-white px-4 py-3 border  rounded hover: transition-colors duration-300`}
              >
                <span className="text-base font-medium">Log In</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;