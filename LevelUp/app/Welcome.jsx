import { router } from "expo-router";
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

// First-launch screen for local mode: ask for a display name.
export default function Welcome() {
  const { theme } = useContext(ThemeContext);
  const { updateProfile } = useData();
  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;

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
        <Text style={{ color: textColor, fontSize: 16 }}>
          What should we call you, adventurer?
        </Text>
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
          value={name}
          onChangeText={setName}
          placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
          placeholder="Your name"
        />
        {loading ? (
          <ActivityIndicator size="small" style={{ margin: 28 }} />
        ) : (
          <Pressable
            style={{
              height: 40,
              width: "40%",
              borderRadius: 10,
              justifyContent: "center",
              backgroundColor: colors.purple,
              marginTop: 30,
            }}
            onPress={start}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Start your journey
            </Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
