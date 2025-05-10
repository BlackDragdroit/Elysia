import React, { createContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import { URL } from "../Services/data";

// Create the context
export const UserInfoContext = createContext();

// UserInfoProvider component
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user info when the app starts
    const fetchUserInfo = async () => {
      const fetchURL = URL + "api/users/getUser/" + auth().currentUser.uid;
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <ActivityIndicator size={"small"} />;
  }

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};
