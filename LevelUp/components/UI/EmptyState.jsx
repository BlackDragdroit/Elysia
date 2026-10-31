import React from "react";
import { View, Text } from "react-native";
import renderIcon from "@/assets/styles/renderIcon";
import Button from "./Button";
import { useTheme, type } from "@/assets/styles/theme";

export default function EmptyState({ icon = "inbox", title, hint, actionTitle, onAction }) {
  const { c } = useTheme();
  return (
    <View style={{ alignItems: "center", paddingVertical: 24 }}>
      <View style={{ marginBottom: 12 }}>{renderIcon(icon, c.textMuted, 28)}</View>
      <Text style={[type.body, { color: c.text, fontWeight: "500", textAlign: "center" }]}>{title}</Text>
      {hint ? <Text style={[type.caption, { color: c.textMuted, textAlign: "center", marginTop: 4 }]}>{hint}</Text> : null}
      {actionTitle ? <Button title={actionTitle} onPress={onAction} variant="secondary" style={{ marginTop: 16 }} /> : null}
    </View>
  );
}
