import { Stack, useRouter, useSegments } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  ThemeProvider,
  ThemeContext,
} from "@/components/Contexts/ThemeProvider";
import { DataProvider, DataContext } from "@/components/Contexts/DataProvider";
import { useTheme } from "@/assets/styles/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Gate />
      </DataProvider>
    </ThemeProvider>
  );
}

function Gate() {
  const { isDark, c } = useTheme();
  const { settings, profile, loading } = useContext(DataContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading || !settings) return;

    const section = segments[0];
    const inTabs = section === "(tabs)";
    const inAuth = section === "index" || section === "SignUp";
    const needsLogin = settings.mode === "server" && !settings.token;
    const needsName =
      settings.mode === "local" && profile !== null && !profile.displayName;

    if (needsLogin) {
      if (!inAuth) router.replace("/");
    } else if (needsName) {
      if (section !== "Welcome") router.replace("/Welcome");
    } else {
      if (inAuth || section === "Welcome" || !inTabs) {
        router.replace("/(tabs)/Home");
      }
    }
  }, [settings, profile, loading, segments]);

  if (loading || !settings) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: c.bg,
        }}
      >
        <ActivityIndicator size="large" color={c.accent} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
