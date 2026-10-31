import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme, radius } from "@/assets/styles/theme";

export default function SegmentedControl({ options, selected, onSelect }) {
  const { c, isDark } = useTheme();
  return (
    <View style={{ flexDirection: "row", backgroundColor: c.surfaceRaised, borderRadius: radius.control, height: 44, padding: 4 }}>
      {options.map((opt, i) => {
        const sel = i === selected;
        return (
          <Pressable key={opt.label} onPress={() => onSelect(i)} accessibilityRole="tab" accessibilityState={{ selected: sel }}
            style={{ flex: 1, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: sel ? (isDark ? c.border : c.surface) : "transparent" }}>
            <Text style={{ fontFamily: "Roboto-Variable", fontSize: 14, fontWeight: "500", color: sel ? c.text : c.textMuted }}>
              {opt.label}{opt.count != null ? ` ${opt.count}` : ""}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
