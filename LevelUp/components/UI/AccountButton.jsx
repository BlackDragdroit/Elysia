import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import renderIcon from "@/assets/styles/renderIcon";
import { useTheme } from "@/assets/styles/theme";
import { useData } from "@/components/Contexts/DataProvider";

export default function AccountButton() {
  const { c } = useTheme();
  const { profile } = useData();
  const level = profile?.level ?? 1;
  return (
    <Pressable
      onPress={() => router.push("/Profile")}
      accessibilityRole="button"
      accessibilityLabel={`Profile, level ${level}`}
      hitSlop={8}
      style={{ minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center" }}
    >
      <View>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.surfaceRaised, alignItems: "center", justifyContent: "center" }}>
          {renderIcon(profile?.equipped?.icon || "person-standing", c.text, 22)}
        </View>
        <View style={{ position: "absolute", top: -2, right: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: c.accent, borderWidth: 2, borderColor: c.bg, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontFamily: "Roboto-Variable", fontSize: 10, fontWeight: "700", color: "#ffffff" }}>{level}</Text>
        </View>
      </View>
    </Pressable>
  );
}
