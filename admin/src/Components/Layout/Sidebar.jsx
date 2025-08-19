import { Package, ShoppingCart, Users, X, User } from "lucide-react";
import { useAppContext } from "../../context/Context";

export function Sidebar({ closeSidebar }) {
  const { setTab } = useAppContext();

  // helper to handle clicks
  const handleClick = (tabIndex) => {
    setTab(tabIndex);
    if (closeSidebar) closeSidebar(); // only for mobile
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Master Admin</h2>
        {closeSidebar && (
          <div
            onClick={closeSidebar}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="p-4 space-y-2 flex-1">
        <div
          onClick={() => handleClick(0)}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
        >
          <Users className="h-5 w-5" />
          <span>Users</span>
        </div>
       
        <div
          onClick={() => handleClick(1)}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
        >
          <Package className="h-5 w-5" />
          <span>Products</span>
        </div>
         <div
          onClick={() => handleClick(2)}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Orders</span>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              Soumen Singh
            </p>
            <p className="text-xs text-gray-600 capitalize">admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
