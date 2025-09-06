import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
  });
  // Fetch User Address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:8000/api/address/getAddressById", // your GET route
          {
            headers: {
              Auth: token, // sending token like middleware expects
            },
          }
        );

        if (res.data.message === "Address Found") {
          setAddress(res.data.address);
          setError(null);
          // console.log("address",res.data.address);
        } else {
          setError(res.data.message || "Failed to fetch address");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  // Fetch All product
  const [allProduct, setAllProduct] = useState(null);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/product/getallproduct"
      );
      // console.log("all product", res.data); // res.data has your actual products
      setAllProduct(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  // Fetch cart details
  const [cart, setCart] = useState(null);
    const getCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/cart/userCart",
        {
          headers: {
            Auth: token, // matches backend middleware
          },
        }
      );
      console.log("cart", res); // res.data has your actual cart
      setCart(res.data.cart.items);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

// Fetch Order
const [order, setOrder] = useState(null);
const [orderLoading, setOrderLoading] = useState(false);
const [orderError, setOrderError] = useState(null);

const getOrder = async () => {
  setOrderLoading(true);   // start loading before API call
  setOrderError(null);     // reset error state

  try {
    const res = await axios.get(
      "http://localhost:8000/api/payment/getOrderById",
      {
        headers: {
          Auth: token, // matches backend middleware
        },
      }
    );

    console.log("order", res.data);
    setOrder(res.data.orders || null); // set order from response
  } catch (err) {
    console.error("Error fetching orders:", err);
    setOrderError(err.response?.data?.message || "Failed to fetch orders");
  } finally {
    setOrderLoading(false); // stop loading whether success or error
  }
};



  useEffect(() => {
    getProduct();
    getCart();
    getOrder();
  }, []);
  return (
    <AppContext.Provider
      value={{
        token,
        login,
        setLogin,
        user,
        setUser,
        address,
        setAddress,
        error,
        setError,
        loading,
        setLoading,
        allProduct,
        cart,
        getCart,
        order,
        getOrder,
        orderLoading,
        orderError
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
