import { MotiView } from "moti";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export function FadeIn({ children, speed = 1000 }) {
  const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      console.log("FadeIn effect triggered");
      setKey((prev) => prev + 1);
    }, [])
  );

  return (
    <MotiView
      key={key}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: speed }}
    >
      {children}
    </MotiView>
  );
}

export function FadeInOut({ children, duration = 1000, delay = 0 }) {
  const [visible, setVisible] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), delay);
    }, [delay])
  );

  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), duration);
    }
  }, [visible, duration]);

  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        type: "timing",
        duration: duration,
        delay: delay,
      }}
    >
      {children}
    </MotiView>
  );
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
