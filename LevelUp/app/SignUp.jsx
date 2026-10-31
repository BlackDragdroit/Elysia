import { router } from "expo-router";
import "react-native-reanimated";
import "react-native-gesture-handler";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import { colors } from "@/assets/styles/common";
import Message from "@/components/UI/Message";
import logo from "@/assets/images/Logo(Purple).png";

// Server-mode registration screen.
export default function SignUp() {
  const { theme } = useContext(ThemeContext);
  const { settings, registerServer, switchToLocal } = useData();
  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [serverUrl, setServerUrl] = useState(settings?.serverUrl || "");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const showError = (msg) => {
    setError(true);
    setMessage(msg);
  };

  const signUp = async () => {
    if (
      !serverUrl.trim() ||
      !displayName.trim() ||
      !username.trim() ||
      !password ||
      !passwordVerification
    ) {
      showError("No field can remain blank");
      return;
    }
    if (password !== passwordVerification) {
      showError("Passwords must match");
      return;
    }
    setLoading(true);
    try {
      await registerServer(serverUrl, username, password, displayName);
      router.replace("/(tabs)/Home");
    } catch (e) {
      showError(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: isDarkmode ? "white" : "black",
    borderRadius: 10,
    color: textColor,
    textAlign: "center",
  };
  const placeholderColor = isDarkmode ? "#a3a3a3" : "#737373";

  return (
    <LinearGradient
      colors={
        isDarkmode
          ? [colors.gradientDark1, colors.gradientDark2]
          : [colors.gradientLight1, colors.gradientLight2]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {message != "" && <Message isError={error} message={message} />}
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
            flexDirection: "column",
          }}
        >
          <Image
            source={logo}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: textColor,
              fontFamily: "Audiowide-Regular",
              fontSize: 40,
            }}
          >
            Elysia
          </Text>
        </View>
        <TextInput
          style={inputStyle}
          value={serverUrl}
          onChangeText={setServerUrl}
          autoCapitalize="none"
          keyboardType="url"
          placeholderTextColor={placeholderColor}
          placeholder="Server URL"
        />
        <TextInput
          style={inputStyle}
          value={displayName}
          onChangeText={setDisplayName}
          placeholderTextColor={placeholderColor}
          placeholder="Display name"
        />
        <TextInput
          style={inputStyle}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor={placeholderColor}
          placeholder="Username"
        />
        <TextInput
          style={inputStyle}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={placeholderColor}
          placeholder="Password"
        />
        <TextInput
          style={inputStyle}
          value={passwordVerification}
          onChangeText={setPasswordVerification}
          secureTextEntry
          placeholderTextColor={placeholderColor}
          placeholder="Verify Password"
        />

        {loading ? (
          <ActivityIndicator size={"small"} style={{ margin: 28 }} />
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 30,
            }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Pressable
                style={{
                  height: 40,
                  width: 100,
                  borderWidth: 1,
                  borderColor: isDarkmode ? "white" : "black",
                  borderRadius: 10,
                  justifyContent: "center",
                }}
                onPress={() => router.replace("/")}
              >
                <Text style={{ textAlign: "center", color: textColor }}>
                  Back
                </Text>
              </Pressable>
              <Pressable
                style={{
                  height: 40,
                  width: 100,
                  borderWidth: 1,
                  borderColor: isDarkmode ? "white" : "black",
                  borderRadius: 10,
                  justifyContent: "center",
                }}
                onPress={signUp}
              >
                <Text style={{ textAlign: "center", color: textColor }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={switchToLocal} style={{ marginTop: 15 }}>
              <Text style={{ textAlign: "center", color: colors.purple }}>
                Use offline instead
              </Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
