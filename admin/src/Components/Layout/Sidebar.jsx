import {
  Package,
  ShoppingCart,
  Users,
  X,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  Home as Dashboard,
  PlusCircle,  
} from "lucide-react";
import { useAppContext } from "../../context/Context";

export function Sidebar({ closeSidebar }) {
  const { setTab, tab: activeTab } = useAppContext();

  const handleClick = (tabIndex) => {
    setTab(tabIndex);
    if (closeSidebar) closeSidebar(); 
  };

  const navItems = [
    { icon: <Dashboard className="h-5 w-5" />, label: "Dashboard", index: 0 },
    { icon: <Users className="h-5 w-5" />, label: "Users", index: 1 },
    { icon: <Package className="h-5 w-5" />, label: "Products", index: 2 },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", index: 3 },
    { icon: <PlusCircle className="h-5 w-5" />, label: "Add Product", index: 4 },  
    // { icon: <Settings className="h-5 w-5" />, label: "Settings", index: 5 },  
  ];

  return (
    <div className="h-full flex flex-col bg-white shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-indigo-500" />
          Master Admin
        </h2>
        {closeSidebar && (
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="p-4 space-y-2 flex-1">
        {navItems.map((item) => (
          <div
            key={item.index}
            onClick={() => handleClick(item.index)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer 
            ${activeTab === item.index 
              ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-500" 
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-3 flex items-center space-x-3 hover:shadow-lg transition-shadow">
          <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
            BS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              Boisali Sarkar
            </p>
            <p className="text-xs text-gray-600 capitalize">admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}