import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import renderIcon from "../../assets/styles/renderIcon";
import { colors } from "@/assets/styles/common";
import { MotiView } from "moti";

export const Achievement = ({ icon, title, descr }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark" ? true : false;

  const textColor = isDarkmode ? "white" : "black";
  const boxTextColor = isDarkmode ? "#a3a3a3" : "#737373";
  //   const { theme } = useContext(ThemeContext);

  //   const isDarkmode = theme === "dark" ? true : false;

  return (
    <View
      style={{
        paddingBottom: 10,
        margin: 6,
        alignItems: "center",
        textAlign: "center",
        width: "46%",
        height: 130,
        backgroundColor: isDarkmode ? "#262626" : "white",
        borderRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "50%",
          marginTop: 0,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkmode ? "#333333" : "#f5f5f5",
            borderRadius: 360,
          }}
        > */}
        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{ translateY: 5 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 1500,
            delay: 100,
          }}
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkmode ? "#333333" : "#f5f5f5",
            borderRadius: 360,
          }}
        >
          {renderIcon(icon, colors.pink, 21)}
        </MotiView>
      </View>
      <Text
        style={{
          fontFamily: "Roboto-Variable",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
          color: textColor,
          marginBottom: 5,
        }}
      >
        {title} {/* Max Char Count 18 */}
      </Text>
      <Text
        style={{
          fontFamily: "Roboto-Variable",
          fontSize: 12,
          textAlign: "center",
          color: boxTextColor,
          flexWrap: "wrap", // Allow text to wrap to the next line
          overflow: "hidden", // Prevent text from overflowing its container
          width: "90%", // Ensure the text has a defined width
          wordBreak: "break-word",
        }}
      >
        {descr /* Max Character count 46 */}
      </Text>
    </View>
  );
};
