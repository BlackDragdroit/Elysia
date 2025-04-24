import React from "react";
import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderIcon from "@/assets/styles/renderIcon";
import { colors } from "@/assets/styles/common";
import { MotiView } from "moti";
const AccountButton = ({ size = 48, animated = false, onPress = () => {} }) => {
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
      {animated ? (
        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: 6 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 1200,
            delay: 50,
          }}
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: size / 2.3,
            height: size / 2.3,
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
        </MotiView>
      ) : (
        <MotiView
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
        </MotiView>
      )}
      {renderIcon("person-standing", isDarkmode ? "black" : "white", size / 2)}
    </View>
  );
};

export default AccountButton;
