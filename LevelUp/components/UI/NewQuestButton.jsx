import React from "react";
import { View } from "react-native";
import renderIcon from "@/assets/styles/renderIcon";
import { useTheme } from "@/assets/styles/theme";

export const NewQuestButton = () => {
  const { c } = useTheme();
  return (
    <View
      style={{
        width: 56,
        height: 56,
        backgroundColor: c.accent,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 0.25,
        elevation: 6,
      }}
    >
      {renderIcon("plus", "#ffffff", 26)}
    </View>
  );
};
