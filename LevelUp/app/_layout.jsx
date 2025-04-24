import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user) => {
    console.log("State changed", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (user && !inTabsGroup) {
      router.replace("/(tabs)/Home");
    } else if (!user && inTabsGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
    </Stack>
  );
}
