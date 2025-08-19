import { Menu } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-40 h-14 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu (Mobile Only) */}
        <div
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none lg:hidden cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
