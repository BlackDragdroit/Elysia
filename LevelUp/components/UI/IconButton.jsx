import React from "react";
import { Pressable, View } from "react-native";
import renderIcon from "@/assets/styles/renderIcon";
import { useTheme } from "@/assets/styles/theme";

export default function IconButton({ icon, onPress, accessibilityLabel, color, size = 20, style }) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        { minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.surfaceRaised, alignItems: "center", justifyContent: "center" }}>
        {renderIcon(icon, color || c.textMuted, size)}
      </View>
    </Pressable>
  );
}
