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

// Server-mode login screen.
export default function Login() {
  const { theme } = useContext(ThemeContext);
  const { settings, loginServer, switchToLocal } = useData();
  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [serverUrl, setServerUrl] = useState(settings?.serverUrl || "");
  const [username, setUsername] = useState(settings?.username || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const showError = (msg) => {
    setError(true);
    setMessage(msg);
  };

  const signIn = async () => {
    if (!serverUrl.trim() || !username.trim() || !password) {
      showError("Fill in server URL, username and password");
      return;
    }
    setLoading(true);
    try {
      await loginServer(serverUrl, username, password);
      router.replace("/(tabs)/Home");
    } catch (e) {
      showError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
          gap: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
            flexDirection: "column",
          }}
        >
          <Image
            source={logo}
            style={{ width: 100, height: 100 }}
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
          style={{
            width: "90%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            borderRadius: 10,
            color: textColor,
            textAlign: "center",
          }}
          value={serverUrl}
          onChangeText={setServerUrl}
          autoCapitalize="none"
          keyboardType="url"
          placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
          placeholder="Server URL (e.g. http://192.168.1.10:3001)"
        />
        <TextInput
          style={{
            width: "90%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            borderRadius: 10,
            color: textColor,
            textAlign: "center",
          }}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
          placeholder="Username"
        />
        <TextInput
          style={{
            width: "90%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            borderRadius: 10,
            color: textColor,
            textAlign: "center",
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
          placeholder="Password"
        />

        {loading ? (
          <ActivityIndicator size={"small"} style={{ margin: 28 }} />
        ) : (
          <View style={{ width: "100%", flexDirection: "column", gap: 10 }}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                flexDirection: "row",
                marginTop: 30,
              }}
            >
              <Pressable
                style={{
                  height: 40,
                  width: "25%",
                  borderWidth: 1,
                  borderColor: isDarkmode ? "white" : "black",
                  borderRadius: 10,
                  justifyContent: "center",
                }}
                onPress={signIn}
              >
                <Text style={{ textAlign: "center", color: textColor }}>
                  Sign In
                </Text>
              </Pressable>
              <Pressable
                style={{
                  height: 40,
                  width: "25%",
                  borderWidth: 1,
                  borderColor: isDarkmode ? "white" : "black",
                  borderRadius: 10,
                  justifyContent: "center",
                }}
                onPress={() => router.replace("/SignUp")}
              >
                <Text style={{ textAlign: "center", color: textColor }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={switchToLocal} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: colors.purple,
                  fontSize: 14,
                }}
              >
                Use offline instead
              </Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
