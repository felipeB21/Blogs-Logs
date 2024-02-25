"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  profileRequest,
  getAllUsersRequest,
} from "@/api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const signUp = async (user) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };
  const signIn = async (user) => {
    try {
      const response = await loginRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const getProfile = async (id) => {
    try {
      const response = await profileRequest(id);
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  const getAllUsers = async (users) => {
    try {
      const response = await getAllUsersRequest(users);
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };
  useEffect(() => {
    async function checkAuth() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      try {
        const response = await verifyTokenRequest(cookies.token);
        if (!response.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        getProfile,
        getAllUsers,
        user,
        userProfile,
        allUsers,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
