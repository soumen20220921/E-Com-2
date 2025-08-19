import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useAppContext } from "../context/AppContext";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {login ,setLogin} =useAppContext();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(()=>{
    const token = localStorage.getItem('token');
   if (token !== null) {
    setLogin(true);
  }
  },[login,setLogin]);
 

  const navigate = useNavigate();

  return (
    <nav className="shadow-lg sticky top-0 z-50 font-inter h-20 bg-white">
      <div className="w-full bg-white lg:w-[90%] xl:w-[70%] mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div 
          onClick={()=>navigate("/")}
          className="text-black text-2xl font-bold cursor-pointer hover:opacity-80 transition">
            LOGO
          </div>

          {/* Desktop actions */}
          <ul className="hidden lg:flex items-center gap-6 text-lg">
            <li>
              <button
                type="button"
                aria-label="Wishlist"
                className="hover:text-gray-600 transition"
              >
                <IoMdHeartEmpty size={24} />
              </button>
            </li>

            <li>
              <button
                type="button"
                aria-label="Cart"
                className="hover:text-gray-600 transition"
                onClick={()=>navigate("/cart")}
              >
                <BsCart2 size={24} />
              </button>
            </li>

            <li>
              <button
                type="button"
                aria-label="Login"
                className={
                  login
                    ?"hover:text-gray-600 transition"
                    : "px-4 py-1 border border-black rounded hover:bg-blue-400 hover:text-white transition" 
                    
                }
                onClick={()=>navigate("/account")}
              >
                {login ? < VscAccount size={24} /> :"LogIn"}
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          {isMobileMenuOpen ? (
            <div className="lg:hidden">
              <button
                type="button"
                aria-label="Close menu"
                className="text-black text-2xl p-2"
                onClick={handleMenuToggle}
              >
                <RxCross2 />
              </button>
            </div>
          ) : (
            <div className="lg:hidden">
              <button
                type="button"
                aria-label="Open menu"
                className="text-black text-2xl p-2"
                onClick={handleMenuToggle}
              >
                <RxHamburgerMenu />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-white shadow-lg absolute top-20 left-0 w-full z-40"
          role="menu"
          aria-label="Mobile menu"
        >
          <ul className="flex flex-col items-start p-4 gap-2">
            <li className="w-full">
              <button
                type="button"
                aria-label="Wishlist"
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition border-b-2 border-black-200"
                onClick={() => {
                  /* optional: navigate or close menu */
                  handleMenuToggle();
                }}
              >
                <IoMdHeartEmpty size={20} />
                <span className="text-base">Wishlist</span>
              </button>
            </li>

            <li className="w-full">
              <button
                type="button"
                aria-label="Cart"
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition border-b-2 border-gray-200"
                onClick={() => {
                  /* optional: navigate or close menu */
                  handleMenuToggle();
                  navigate("/cart")
                }}
              >
                <BsCart2 size={20} />
                <span className="text-base">Cart</span>
              </button>
            </li>

            <li className="w-full">
              <button
                type="button"
                aria-label="Login"
                className="w-full text-center px-3 py-2 border border-black rounded hover:bg-blue-400 hover:text-white transition"
                onClick={() => {
                  /* optional: open login or close menu */
                  handleMenuToggle();
                  navigate("/account")
                }}
              >
                <span className="text-base">
                  {login ? "Account":"LogIn"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
