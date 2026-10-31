import React from "react";
import { View } from "react-native";
import { useTheme, radius } from "@/assets/styles/theme";

export default function Card({ style, children, ...props }) {
  const { c } = useTheme();
  return (
    <View
      style={[{ backgroundColor: c.surface, borderRadius: radius.card, padding: 16 }, c.cardStyle, style]}
      {...props}
    >
      {children}
    </View>
  );
}
