import { router } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import Message from "@/components/UI/Message";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import logo from "@/assets/images/Logo(Purple).png";

// Server-mode registration screen.
export default function SignUp() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { settings, registerServer, switchToLocal } = useData();

  const [serverUrl, setServerUrl] = useState(settings?.serverUrl || "");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const signUp = async () => {
    if (!serverUrl.trim() || !displayName.trim() || !username.trim() || !password || !passwordVerification) {
      setError(true);
      setMessage("No field can remain blank");
      return;
    }
    if (password !== passwordVerification) {
      setError(true);
      setMessage("Passwords must match");
      return;
    }
    setLoading(true);
    try {
      await registerServer(serverUrl, username, password, displayName);
      router.replace("/(tabs)/Home");
    } catch (e) {
      setError(true);
      setMessage(e.message || "Registration failed");
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
          <Text style={[type.body, { color: c.textMuted, marginTop: 8 }]}>Create an account on your server</Text>
        </View>
        <TextField label="Server URL" value={serverUrl} onChangeText={setServerUrl}
          autoCapitalize="none" keyboardType="url" placeholder="http://192.168.1.10:3001" />
        <TextField label="Display name" value={displayName} onChangeText={setDisplayName}
          placeholder="Display name" style={{ marginTop: 12 }} />
        <TextField label="Username" value={username} onChangeText={setUsername}
          autoCapitalize="none" placeholder="Username" style={{ marginTop: 12 }} />
        <TextField label="Password" value={password} onChangeText={setPassword}
          secureTextEntry placeholder="Password" style={{ marginTop: 12 }} />
        <TextField label="Confirm password" value={passwordVerification} onChangeText={setPasswordVerification}
          secureTextEntry placeholder="Password" style={{ marginTop: 12 }} />
        <Button title="Create account" fullWidth loading={loading} onPress={signUp} style={{ marginTop: 20 }} />
        <Pressable onPress={() => router.replace("/")} hitSlop={8}
          style={{ minHeight: 48, justifyContent: "center", alignItems: "center" }}>
          <Text style={[type.label, { color: c.accentText }]}>Sign in instead</Text>
        </Pressable>
        <Pressable onPress={switchToLocal} hitSlop={8}
          style={{ minHeight: 48, justifyContent: "center", alignItems: "center" }}>
          <Text style={[type.label, { color: c.accentText }]}>Use offline instead</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
