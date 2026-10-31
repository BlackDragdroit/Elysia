import React from "react";
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, titleFont } from "@/assets/styles/theme";
import IconButton from "./IconButton";
import AccountButton from "./AccountButton";

const logo = require("@/assets/images/Logo(Purple).png");

export default function Header() {
  const { isDark, c, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top, backgroundColor: c.bg,
        borderBottomWidth: 1, borderBottomColor: c.border,
        flexDirection: "row", alignItems: "center",
        paddingHorizontal: 16, height: 56 + insets.top,
      }}
    >
      <Image source={logo} style={{ width: 32, height: 32 }} resizeMode="contain" />
      <Text style={{ fontFamily: titleFont, fontSize: 22, color: c.text, marginLeft: 8 }}>Elysia</Text>
      <View style={{ flex: 1 }} />
      <IconButton
        icon={isDark ? "sun" : "moon"}
        onPress={toggleTheme}
        accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />
      <AccountButton />
    </View>
  );
}
