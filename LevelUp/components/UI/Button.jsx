import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { useTheme, type, radius } from "@/assets/styles/theme";

export default function Button({ title, onPress, variant = "primary", fullWidth, disabled, loading, style }) {
  const { c } = useTheme();
  const secondary = variant === "secondary";
  const off = disabled || loading;
  return (
    <Pressable
      onPress={off ? undefined : onPress}
      disabled={off}
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          height: 48, borderRadius: radius.control, alignItems: "center", justifyContent: "center",
          paddingHorizontal: 20, alignSelf: fullWidth ? "stretch" : "flex-start",
          opacity: off ? 0.5 : pressed ? 0.85 : 1,
        },
        secondary
          ? { backgroundColor: "transparent", borderWidth: 1, borderColor: c.border }
          : { backgroundColor: c.accent },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? c.text : c.onAccent} />
      ) : (
        <Text style={[{ fontFamily: "Roboto-Variable", fontSize: 16, fontWeight: "600", color: secondary ? c.text : c.onAccent }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
