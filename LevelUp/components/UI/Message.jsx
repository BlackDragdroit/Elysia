import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import renderIcon from "@/assets/styles/renderIcon";
import { colors } from "@/assets/styles/common";
import { ThemeContext } from "../Contexts/ThemeProvider";

function Message({
  isError = false,
  message = "",
  duration = 2000,
  width = 150,
}) {
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark";
  let backColor = isDarkmode ? "black" : "white";
  if (isError) backColor = colors.errorRed;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [message, duration]);

  if (!visible || !message) return null;

  return (
    <View
      style={{
        backgroundColor: backColor,
        borderRadius: 5,
        width: width,
        minHeight: 80,
        paddingVertical: 12,
        paddingHorizontal: 8,
        position: "absolute",
        top: 10,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 5,
          left: 5,
        }}
      >
        {renderIcon(
          "info",
          isDarkmode ? colors.textDark : colors.textLight,
          20
        )}
      </View>

      <Text
        style={{
          color: isDarkmode ? colors.textDark : colors.textLight,
          textAlign: "center",
          width: width - 20,
          fontSize: 12,
        }}
      >
        {message}
      </Text>
    </View>
  );
}

export default Message;
