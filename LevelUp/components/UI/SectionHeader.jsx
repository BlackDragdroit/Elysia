import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme, type } from "@/assets/styles/theme";

export default function SectionHeader({ title, action, onAction }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 28, marginBottom: 12 }}>
      <Text style={[type.sectionTitle, { color: c.text }]}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={{ top: 14, bottom: 14, left: 8, right: 8 }}
          accessibilityRole="button" style={{ justifyContent: "center" }}>
          <Text style={[type.label, { color: c.accentText }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
