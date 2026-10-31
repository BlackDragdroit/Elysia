import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { useReducedMotion, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme, radius } from "@/assets/styles/theme";

export default function ProgressBar({ progress, trackColor, fillColor, style }) {
  const { c } = useTheme();
  const reduced = useReducedMotion();
  const p = Math.max(0, Math.min(1, progress || 0));
  const width = useSharedValue(p);
  useEffect(() => { width.value = reduced ? p : withTiming(p, { duration: 400 }); }, [p]);
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(p * 100) }}
      style={[{ height: 8, borderRadius: radius.pill, backgroundColor: trackColor || c.track, overflow: "hidden" }, style]}
    >
      <Animated.View
        style={[{ height: "100%", borderRadius: radius.pill, backgroundColor: fillColor || c.accent, width: `${p * 100}%` }]}
      />
    </View>
  );
}
