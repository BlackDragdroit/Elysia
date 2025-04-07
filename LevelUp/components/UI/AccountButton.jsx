import React from "react";
import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderIcon from "@/assets/styles/renderIcon";
const AccountButton = () => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const [level, setLevel] = React.useState(0);

  React.useEffect(() => {
    const getLevel = async () => {
      try {
        const storedLevel = await AsyncStorage.getItem("level");
        if (storedLevel !== null) {
          setLevel(storedLevel);
        }
      } catch (error) {
        console.error("Failed to load level from AsyncStorage:", error);
      }
    };

    getLevel();
  });

  return (
    <View
      style={{
        width: 48,
        height: 48,
        backgroundColor: isDarkmode ? "#e5e5e5" : "#262626",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        alignContent: "center",
        marginRight: 10,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -2,
          right: -2,
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: isDarkmode ? "#6b57c8" : "#6b57c8",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: isDarkmode ? "white" : "black",
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {level}
        </Text>
      </View>
      {renderIcon("profile", isDarkmode ? "black" : "white")}
    </View>
  );
};

export default AccountButton;
