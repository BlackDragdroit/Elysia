import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import Animated, { useReducedMotion, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme, type } from "@/assets/styles/theme";

export default function Screen({ title, action, children, scroll = true }) {
  const { c } = useTheme();
  const reduced = useReducedMotion();
  const opacity = useSharedValue(1);
  useFocusEffect(useCallback(() => {
    if (!reduced) { opacity.value = 0.6; opacity.value = withTiming(1, { duration: 200 }); }
  }, [reduced]));
  const inner = (
    <Animated.View style={{ flex: 1, opacity }}>
      {title ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <Text style={[type.pageTitle, { color: c.text }]}>{title}</Text>
          {action}
        </View>
      ) : null}
      {children}
    </Animated.View>
  );
  if (!scroll) return <View style={{ flex: 1, backgroundColor: c.bg, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 }}>{inner}</View>;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 }}>
      {inner}
    </ScrollView>
  );
}
