// Legacy exports kept only for the unrouted leftover screens
// (components/HomeIntro.jsx, components/FirstQuestPage.jsx).
import { StyleSheet } from "react-native";

export const font = "Roboto-Variable";

export const colors = {
  purple: "#6b57ea",
  gradientDark1: "#2c2c54",
  gradientDark2: "#0f0f12",
  gradientLight1: "#ede9fe",
  gradientLight2: "#f4f4f6",
  textDark: "#f4f4f6",
  textLight: "#18181b",
};

export const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontFamily: "Audiowide-Regular" },
  text: { fontSize: 18, fontFamily: font, fontWeight: "bold" },
});

export const commonStyles = styles;
