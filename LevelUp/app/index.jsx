import { router } from "expo-router";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import Message from "@/components/UI/Message";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import logo from "@/assets/images/Logo(Purple).png";

// Server-mode login screen.
export default function Login() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { settings, loginServer, switchToLocal } = useData();

  const [serverUrl, setServerUrl] = useState(settings?.serverUrl || "");
  const [username, setUsername] = useState(settings?.username || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const signIn = async () => {
    if (!serverUrl.trim() || !username.trim() || !password) {
      setError(true);
      setMessage("Fill in server URL, username and password");
      return;
    }
    setLoading(true);
    try {
      await loginServer(serverUrl, username, password);
      router.replace("/(tabs)/Home");
    } catch (e) {
      setError(true);
      setMessage(e.message || "Login failed");
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
          <Text style={[type.body, { color: c.textMuted, marginTop: 8 }]}>Sign in to your server</Text>
        </View>
        <TextField label="Server URL" value={serverUrl} onChangeText={setServerUrl}
          autoCapitalize="none" keyboardType="url" placeholder="http://192.168.1.10:3001" />
        <TextField label="Username" value={username} onChangeText={setUsername}
          autoCapitalize="none" placeholder="Username" style={{ marginTop: 12 }} />
        <TextField label="Password" value={password} onChangeText={setPassword}
          secureTextEntry placeholder="Password" style={{ marginTop: 12 }} />
        <Button title="Sign in" fullWidth loading={loading} onPress={signIn} style={{ marginTop: 20 }} />
        <Pressable onPress={() => router.replace("/SignUp")} hitSlop={8}
          style={{ minHeight: 48, justifyContent: "center", alignItems: "center" }}>
          <Text style={[type.label, { color: c.accentText }]}>Create an account</Text>
        </Pressable>
        <Pressable onPress={switchToLocal} hitSlop={8}
          style={{ minHeight: 48, justifyContent: "center", alignItems: "center" }}>
          <Text style={[type.label, { color: c.accentText }]}>Use offline instead</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
