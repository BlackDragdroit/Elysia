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
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: bColor,
          borderRadius: 10,
          width: "95%",
          minHeight: 100,
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderColor: borderColor,
          borderWidth: 1,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
        }}
      >
        {typeof children == "string" ? (
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
        ) : (
          children
        )}
      </View>
    </View>
  );
};

export default Box;
