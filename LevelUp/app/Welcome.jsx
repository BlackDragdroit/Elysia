import { router } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import Message from "@/components/UI/Message";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import logo from "@/assets/images/Logo(Purple).png";

// First-launch screen for local mode: ask for a display name.
export default function Welcome() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { updateProfile } = useData();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const start = async () => {
    if (!name.trim()) {
      setError(true);
      setMessage("Please enter a name");
      return;
    }
    setLoading(true);
    try {
      await updateProfile({ displayName: name.trim() });
      router.replace("/(tabs)/Home");
    } catch (e) {
      setError(true);
      setMessage("Could not save your name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {message ? <Message isError={error} message={message} /> : null}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}>
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Image source={logo} style={{ width: 72, height: 72 }} resizeMode="contain" />
          <Text style={[type.pageTitle, { fontSize: 36, color: c.text }]}>Elysia</Text>
          <Text style={[type.body, { color: c.textMuted, marginTop: 8 }]}>What should we call you?</Text>
        </View>
        <TextField label="Display name" placeholder="Your name" value={name} onChangeText={setName} />
        <Button title="Start your journey" fullWidth loading={loading} onPress={start} style={{ marginTop: 20 }} />
      </KeyboardAvoidingView>
    </View>
  );
}
