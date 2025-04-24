import { Redirect, Slot } from "expo-router";
import "react-native-reanimated";
import "react-native-gesture-handler";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
  ThemeContext,
  ThemeProvider,
} from "@/components/Contexts/ThemeProvider";
import { styles, colors } from "@/assets/styles/common";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import logo from "@/assets/images/Logo(Purple).png";
import auth from "@react-native-firebase/auth";
import { useFonts } from "expo-font";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    "Audiowide-Regular": require("@/assets/fonts/Audiowide-Regular.ttf"),
  });

  const signUp = async () => {
    setLoading(true);
    try {
      const userCred = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      userCred.user.updateProfile({ displayName: username });
      console.log("Creating User...");
    } catch (e) {
      const err = e;
      console.log("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size={small} />;
  }

  return (
    <ThemeProvider>
      <Content
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        passwordVerification={passwordVerification}
        setPasswordVerification={setPasswordVerification}
        signUp={signUp}
        loading={loading}
      ></Content>
    </ThemeProvider>
  );
};

const Content = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  passwordVerification,
  setPasswordVerification,
  signUp,
  loading,
}) => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  return (
    <GestureHandlerRootView>
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
                color: isDarkmode ? colors.textDark : colors.textLight,
                fontFamily: "Audiowide-Regular",
                fontSize: 40,
              }}
            >
              Elysia
            </Text>
          </View>
          <TextInput
            style={[
              {
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: isDarkmode ? "white" : "black",
                borderRadius: 5,
                color: isDarkmode ? colors.textDark : colors.textLight,
                backgroundColor: isDarkmode ? "black" : "white",
                textAlign: "center",
              },
            ]}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
            placeholder="Username"
          />
          <TextInput
            style={[
              {
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: isDarkmode ? "white" : "black",
                borderRadius: 5,
                color: isDarkmode ? colors.textDark : colors.textLight,
                backgroundColor: isDarkmode ? "black" : "white",
                textAlign: "center",
              },
            ]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
            placeholder="Email"
          />
          <TextInput
            style={[
              {
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: isDarkmode ? "white" : "black",
                borderRadius: 5,
                color: isDarkmode ? colors.textDark : colors.textLight,
                backgroundColor: isDarkmode ? "black" : "white",
                textAlign: "center",
              },
            ]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
            placeholder="Password"
          />

          <TextInput
            style={[
              {
                width: "90%",
                height: 40,
                borderWidth: 1,
                borderColor: isDarkmode ? "white" : "black",
                borderRadius: 5,
                color: isDarkmode ? colors.textDark : colors.textLight,
                backgroundColor: isDarkmode ? "black" : "white",
                textAlign: "center",
              },
            ]}
            value={passwordVerification}
            onChangeText={setPasswordVerification}
            secureTextEntry
            placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
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
                flexDirection: "row",
                marginTop: 50,
              }}
            >
              <Pressable
                style={{
                  width: "20%",
                  borderWidth: 1,
                  borderColor: isDarkmode ? "white" : "black",
                  borderRadius: 5,
                  justifyContent: "center",
                  height: 40,
                  backgroundColor: isDarkmode ? "black" : "white",
                }}
                onPress={() => {
                  if (password != passwordVerification) {
                    console.log("Passwords do not match!");
                  } else {
                    signUp();
                  }
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isDarkmode ? colors.textDark : colors.textLight,
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          )}
        </KeyboardAvoidingView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default SignUp;
