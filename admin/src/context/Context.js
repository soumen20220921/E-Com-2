import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
    const [tab,setTab] = useState(0);

    // Fetch all product
    const [allProduct, setAllProduct] = useState(null);
  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/product/getallproduct");
      console.log("all product", res.data); // res.data has your actual products
      setAllProduct(res.data.products)
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <AppContext.Provider
      value={{
     tab,
     setTab,
     allProduct,
     getProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook for easier usage
export const useAppContext = () => {
  return useContext(AppContext);
};
