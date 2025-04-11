import React, { useContext } from "react";
import { View, Text } from "react-native";
import { colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
const TitleBadge = ({ title = "Title" }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark" ? true : false;
  return (
    <View
      style={{
        backgroundColor: "#6b57ea",
        height: 25,
        justifyContent: "center",
        width: "auto",
        borderRadius: 30,
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TitleBadge;
