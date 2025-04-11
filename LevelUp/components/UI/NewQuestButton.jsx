import React from "react";
import { colors } from "@/assets/styles/common";
import { View } from "react-native";
import renderIcon from "@/assets/styles/renderIcon";

export const NewQuestButton = ({ size = 35 }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: colors.purple,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      {renderIcon("plus", "white", size / 2)}
    </View>
  );
};
