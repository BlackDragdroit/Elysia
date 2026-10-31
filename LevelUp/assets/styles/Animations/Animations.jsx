import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export function FadeIn({ children, speed = 1000 }) {
  const opacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      opacity.value = withTiming(1, { duration: speed });
      return () => {
        opacity.value = 0;
      };
    }, [speed])
  );

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={style}>{children}</Animated.View>;
}

export function FadeInOut({ children, duration = 1000, delay = 0 }) {
  const opacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      let hide;
      opacity.value = 0;
      const show = setTimeout(() => {
        opacity.value = withTiming(1, { duration });
        hide = setTimeout(() => {
          opacity.value = withTiming(0, { duration });
        }, duration);
      }, delay);
      return () => {
        clearTimeout(show);
        if (hide) clearTimeout(hide);
      };
    }, [duration, delay])
  );

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[styles.container, style]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
