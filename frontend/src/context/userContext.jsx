import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/Axiosinstance";
import { API_PATH } from "../utils/Apipath";

// Context
export const UserContext = createContext(null);

// Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.AUTH.PROFILE);
        setUser(res.data.user);
      } catch (error) {
		console.log(error)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // helper functions
  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
