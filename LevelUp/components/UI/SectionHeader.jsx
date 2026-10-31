import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme, type } from "@/assets/styles/theme";

export default function SectionHeader({ title, action, onAction }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 28, marginBottom: 12 }}>
      <Text style={[type.sectionTitle, { color: c.text }]}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={12} style={{ minHeight: 48, justifyContent: "center" }}
          accessibilityRole="button">
          <Text style={[type.label, { color: c.accentText }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
