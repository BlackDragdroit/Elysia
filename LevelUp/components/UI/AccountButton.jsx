import React from "react";
import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderIcon from "@/assets/styles/renderIcon";
import { colors } from "@/assets/styles/common";
const AccountButton = ({ size = 48 }) => {
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
        width: size,
        height: size,
        backgroundColor: isDarkmode ? "#e5e5e5" : "#262626",
        borderRadius: 360,
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
          width: size / 2.5,
          height: size / 2.5,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: colors.purple,
          borderRadius: 360,
        }}
      >
        <Text
          style={{
            color: isDarkmode ? "white" : "black",
            fontSize: size / 4.5,
            fontWeight: "bold",
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {level}
        </Text>
      </View>
      {renderIcon("person-standing", isDarkmode ? "black" : "white", size / 2)}
    </View>
  );
};

export default AccountButton;
