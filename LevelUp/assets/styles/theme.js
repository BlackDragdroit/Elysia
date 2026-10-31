import { useContext } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";

const dark = {
  bg: "#0f0f12",
  surface: "#18181c",
  surfaceRaised: "#202026",
  border: "#2a2a31",
  text: "#f4f4f6",
  textMuted: "#a1a1aa",
  accent: "#6b57ea",
  accentSoft: "rgba(107,87,234,0.18)",
  accentText: "#a99bff",
  onAccent: "#ffffff",
  track: "#2a2a31",
  danger: "#ef4444",
  dangerSoft: "rgba(239,68,68,0.15)",
  difficulty: { easy: "#22c55e", medium: "#60a5fa", hard: "#f59e0b", epic: "#c084fc" },
  cardStyle: { borderWidth: 1, borderColor: "#2a2a31" },
};

const light = {
  bg: "#f4f4f6",
  surface: "#ffffff",
  surfaceRaised: "#f4f4f5",
  border: "#e4e4e7",
  text: "#18181b",
  textMuted: "#52525b",
  accent: "#6b57ea",
  accentSoft: "#ede9fe",
  accentText: "#5b45e0",
  onAccent: "#ffffff",
  track: "#e4e4e7",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  difficulty: { easy: "#15803d", medium: "#1d4ed8", hard: "#b45309", epic: "#7e22ce" },
  cardStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const space = { 4: 4, 8: 8, 12: 12, 16: 16, 20: 20, 24: 24, 32: 32 };
export const radius = { card: 16, control: 12, sheet: 24, pill: 999 };
export const font = "Roboto-Variable";
export const titleFont = "Audiowide-Regular";
export const type = {
  pageTitle: { fontFamily: titleFont, fontSize: 26 },
  sectionTitle: { fontFamily: font, fontSize: 18, fontWeight: "700" },
  body: { fontFamily: font, fontSize: 16, fontWeight: "400" },
  label: { fontFamily: font, fontSize: 14, fontWeight: "500" },
  caption: { fontFamily: font, fontSize: 13, fontWeight: "400" },
  stat: { fontFamily: font, fontSize: 22, fontWeight: "700" },
};

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return { isDark, c: isDark ? dark : light, toggleTheme };
}
