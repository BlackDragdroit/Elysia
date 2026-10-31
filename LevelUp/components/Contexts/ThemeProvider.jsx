import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || "light"); // Default to system theme

  const [fontsLoaded] = useFonts({
    "Audiowide-Regular": require("@/assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("@/assets/fonts/SpaceGrotesk.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Variable": require("@/assets/fonts/Roboto-Variable.ttf"),
  });

  // Load saved theme from AsyncStorage on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme); // Use saved theme if available
        }
      } catch (error) {
        console.error("Failed to load theme from AsyncStorage:", error);
      }
    };

    loadTheme();

    // Listen for system theme changes as a fallback
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme((prevTheme) => prevTheme || colorScheme); // Only update if no saved theme
    });

    return () => listener.remove();
  }, []);

  // Toggle theme and save to AsyncStorage
  const toggleTheme = async () => {
    try {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      await AsyncStorage.setItem("theme", newTheme); // Save the user's preference
    } catch (error) {
      console.error("Failed to save theme to AsyncStorage:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
