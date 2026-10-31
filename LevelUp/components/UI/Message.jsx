import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { useReducedMotion, runOnJS, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import renderIcon from "@/assets/styles/renderIcon";
import { useTheme, type, radius } from "@/assets/styles/theme";

function Message({ isError = false, message = "", duration = 2000 }) {
  const { c } = useTheme();
  const reduced = useReducedMotion();
  const [gone, setGone] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-8);

  useEffect(() => {
    if (reduced) { opacity.value = 1; translateY.value = 0; }
    else {
      opacity.value = withTiming(1, { duration: 150 });
      translateY.value = withTiming(0, { duration: 150 });
    }
    const t = setTimeout(() => {
      if (reduced) setGone(true);
      else {
        opacity.value = withTiming(0, { duration: 150 }, () => runOnJS(setGone)(true));
        translateY.value = withTiming(-8, { duration: 150 });
      }
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration]);

  const anim = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ translateY: translateY.value }] }));
  if (gone || !message) return null;

  const lines = String(message).split("\n");
  const xpLine = lines.length > 1 && lines[0].startsWith("+") && lines[0].endsWith("XP");

  return (
    <Animated.View
      style={[anim, {
        position: "absolute", left: 16, right: 16, top: 8, zIndex: 100,
        backgroundColor: isError ? c.dangerSoft : c.surfaceRaised,
        borderRadius: radius.control, padding: 12,
        flexDirection: "row", alignItems: "flex-start",
      }, isError ? {} : c.cardStyle]}
    >
      <View style={{ marginRight: 10, marginTop: 1 }}>
        {renderIcon(isError ? "circle-alert" : "sparkles", isError ? c.danger : c.accentText, 20)}
      </View>
      <View style={{ flex: 1 }}>
        {lines.map((line, i) => (
          <Text key={i} style={[
            xpLine && i === 0
              ? { fontFamily: "Roboto-Variable", fontSize: 15, fontWeight: "700", color: c.accentText }
              : xpLine ? type.caption : type.label,
            { color: c.text, textAlign: "left" },
          ]}>{line}</Text>
        ))}
      </View>
    </Animated.View>
  );
}

export default Message;
