import React, { useState } from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { useTheme, type, radius } from "@/assets/styles/theme";

export default function TextField({ label, error, style, onFocus, onBlur, ...props }) {
  const { c } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View style={style}>
      {label ? <Text style={[type.label, { color: c.textMuted, marginBottom: 6 }]}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={c.textMuted}
        onFocus={(e) => { setFocused(true); onFocus && onFocus(e); }}
        onBlur={(e) => { setFocused(false); onBlur && onBlur(e); }}
        style={{
          height: 48, borderRadius: radius.control,
          borderWidth: focused ? 2 : 1,
          borderColor: error ? c.danger : focused ? c.accent : c.border,
          backgroundColor: c.surface,
          paddingHorizontal: focused ? 13 : 14,
          color: c.text, fontFamily: "Roboto-Variable", fontSize: 16, textAlign: "left",
          ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
        }}
        {...props}
      />
      {error ? <Text style={[type.caption, { color: c.danger, marginTop: 4 }]}>{error}</Text> : null}
    </View>
  );
}
