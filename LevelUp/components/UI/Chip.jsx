import React from "react";
import { Text, View } from "react-native";
import { radius } from "@/assets/styles/theme";

export default function Chip({ label, color, bg }) {
  return (
    <View style={{ backgroundColor: bg || "transparent", borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 4, alignSelf: "flex-start" }}>
      <Text style={{ fontFamily: "Roboto-Variable", fontSize: 12, fontWeight: "600", color }}>{label}</Text>
    </View>
  );
}
