import { Redirect, router, Slot } from "expo-router";
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

const StartPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log("Logging in");
    } catch (e) {
      const err = e;
      console.log("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <LoginSignup
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signIn={signIn}
        loading={loading}
        setLoading={setLoading}
      ></LoginSignup>
    </ThemeProvider>
  );
};

const LoginSignup = ({
  email,
  setEmail,
  password,
  setPassword,
  signIn,
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
                onPress={signIn}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isDarkmode ? colors.textDark : colors.textLight,
                  }}
                >
                  Sign In
                </Text>
              </Pressable>

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
                onPress={() => router.replace("/SignUp")}
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

export default StartPage;
