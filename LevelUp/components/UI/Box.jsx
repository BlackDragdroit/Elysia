import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";

const Box = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark" ? true : false;
  const boxTextColor = isDarkmode ? "#a3a3a3" : "#737373";
  const bColor = isDarkmode ? "black" : "white";
  const borderColor = isDarkmode ? "#27272a" : "#e7e5e4";
  const font = "Roboto-Variable";

  return (
    <View
      style={{
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: bColor,
          borderRadius: 10,
          width: "90%",
          minHeight: 100, // Minimum height for the box
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
          borderColor: borderColor,
          borderWidth: 1,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5, // Add shadow radius for better effect
          elevation: 5, // Add elevation for Android shadow
          padding: 10, // Add padding for better spacing
        }}
      >
        <Text
          style={{
            color: boxTextColor,
            fontSize: 18,
            textAlign: "center",
            fontFamily: font,
          }}
        >
          {children}
        </Text>
      </View>
    </View>
  );
};

export default Box;
