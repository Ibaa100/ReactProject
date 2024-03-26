import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { Zoom, toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader/Loader";
export const ShopingCartContext = createContext();
const ShopingCartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [countItems, setCountItems] = useState(0);
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("userToken");
  const getProductsInCart = async () => {
    if (localStorage.getItem("userToken")) {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart`,
          {
            headers: { Authorization: `Tariq__${token}` },
          }
        );
        setCartItems(data.products);
        setCountItems(data.count);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    getProductsInCart();
  }, [countItems, cartItems]);

  return (
    <ShopingCartContext.Provider
      value={{ cartItems, countItems, setCartItems, setCountItems, loader }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};
export default ShopingCartContextProvider;
export const useShopingCart = () => {
  return useContext(ShopingCartContext);
};
