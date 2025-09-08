export const getDashboardData = () => {
    return {
      salesData: [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 3000 },
        { month: "Mar", revenue: 5000 },
        { month: "Apr", revenue: 4500 },
        { month: "May", revenue: 6000 },
        { month: "Jun", revenue: 5500 },
      ],
      topProducts: [
        { name: "Wireless Headphones", sales: 120 },
        { name: "Smart Watch", sales: 95 },
        { name: "Gaming Keyboard", sales: 78 },
        { name: "USB-C Hub", sales: 65 },
        { name: "Bluetooth Speaker", sales: 50 },
      ],
    };
  };