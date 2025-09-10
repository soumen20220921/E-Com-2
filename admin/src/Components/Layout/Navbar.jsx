import { Menu, Settings as SettingsIcon, LogOut, User as UserIcon, Bell } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/Context";

const Navbar = ({ onMenuClick }) => {
  const { setTab } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = (tabIndex) => {
    setTab(tabIndex);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-40 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none lg:hidden cursor-pointer transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </div>
       
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="flex items-center space-x-2 animate-pop-in">
          <button className="p-2 rounded-full hover:bg-gray-200 relative transition-colors duration-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </button>
          
          
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <UserIcon className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700"> Boisali Sarkar</span>
          </button>

          {/* Dropdown Menu */}
          {/* {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in-down">
              <button
                onClick={() => handleDropdownClick(5)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 transition-colors"
              >
                <SettingsIcon className="mr-3 h-4 w-4" /> Settings
              </button>
              <button
                onClick={() => console.log("Logged out")}
                className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" /> Logout
              </button>
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;