import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    console.log("State changed", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
