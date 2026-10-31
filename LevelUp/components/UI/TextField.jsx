import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTheme, type, radius } from "@/assets/styles/theme";

export default function TextField({ label, error, style, ...props }) {
  const { c } = useTheme();
  return (
    <View style={style}>
      {label ? <Text style={[type.label, { color: c.textMuted, marginBottom: 6 }]}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={c.textMuted}
        style={{
          height: 48, borderRadius: radius.control, borderWidth: 1,
          borderColor: error ? c.danger : c.border, backgroundColor: c.surface,
          paddingHorizontal: 14, color: c.text, fontFamily: "Roboto-Variable", fontSize: 16, textAlign: "left",
        }}
        {...props}
      />
      {error ? <Text style={[type.caption, { color: c.danger, marginTop: 4 }]}>{error}</Text> : null}
    </View>
  );
}
