import {
  Button,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import Box from "@/components/UI/Box";
import renderIcon from "@/assets/styles/renderIcon";
import { Achievement } from "@/components/UI/Achievement";
import AccountButton from "@/components/UI/AccountButton";
import TitleBadge from "@/components/UI/TitleBadge";
import { LevelBar } from "../../components/UI/LevelBar";
import auth from "@react-native-firebase/auth";

const Profile = () => {
  const user = auth().currentUser;
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark" ? true : false;

  const textColor = isDarkmode ? colors.textDark : colors.textLight;

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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <FadeIn speed={300}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                marginTop: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text style={[styles.subTitle, { color: textColor }]}>
                Your Profile
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box style={{ flexDirection: "column" }}>
                <AccountButton size={80} animated={true} />
                <Text
                  style={[styles.subTitle, { marginTop: 20, color: textColor }]}
                >
                  {user.displayName}
                </Text>
                <Text style={[{ color: textColor, marginBottom: 10 }]}>
                  @{user.displayName.toLowerCase().replace(" ", "")}
                </Text>
                <View
                  style={{
                    justifyContent: "center",
                    gap: 5,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  <TitleBadge title="God of Leveling" />
                  <TitleBadge title="God of Business" />
                  <TitleBadge title="God of Marketing" />
                  <TitleBadge title="God of Manipulation" />
                  <TitleBadge title="God of Success" />
                  <TitleBadge title="God of Mastery" />
                </View>
                <View
                  style={{
                    width: "72%",
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: textColor }}>Level Progress</Text>
                  <Text style={{ color: textColor }}>
                    {148}/{1000} XP
                  </Text>
                </View>
                <LevelBar
                  prog={(250 * 100) / 1000}
                  style={{ marginBottom: 10 }}
                />
              </Box>
              <Box
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {renderIcon("trophy", textColor, 48)}
                <Text style={{ color: textColor, marginTop: 12 }}>
                  Total XP
                </Text>
                <Text style={[styles.subTitle, { color: textColor }]}>
                  12.599
                </Text>
              </Box>
              <Box
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {renderIcon("badge-check", textColor, 48)}
                <Text style={{ color: textColor, marginTop: 12 }}>
                  Tasks Completed
                </Text>
                <Text style={[styles.subTitle, { color: textColor }]}>240</Text>
              </Box>
              <Box
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {renderIcon("award", textColor, 48)}
                <Text style={{ color: textColor, marginTop: 12 }}>
                  Achievements
                </Text>
                <Text style={[styles.subTitle, { color: textColor }]}>7</Text>
              </Box>
              {achievementMapper(
                textColor,
                isDarkmode ? "#27272a" : "#f5f5f4",
                isDarkmode ? "black" : "white",
                user
              )}
            </View>
          </View>
        </FadeIn>
      </ScrollView>
    </LinearGradient>
  );
};

const achievementMapper = (textColor, back1, back2, user) => {
  const [sel, setSel] = useState(0);

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View
        style={{
          width: "90%",
          height: 35,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: back1,
          marginTop: 10,
          paddingRight: 5,
          paddingLeft: 5,
          borderRadius: 5,
        }}
      >
        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: sel == 0 ? back2 : "transparent" },
          ]}
          onPress={() => setSel(0)}
        >
          {renderIcon("award", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>
            Achievements
          </Text>
        </Pressable>

        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: sel == 1 ? back2 : "transparent" },
          ]}
          onPress={() => setSel(1)}
        >
          {renderIcon("settings-2", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Settings</Text>
        </Pressable>
      </View>
      {sel == 0 && (
        <Box>
          <Achievement title="Chef in Training" descr="yooo" icon="chef-hat" />
          <Achievement
            title="The Rizzler"
            descr="Meet with at least 10 girls"
            icon="key"
          />
          <Achievement title="Chef in Training" descr="yooo" icon="chef-hat" />
          <Achievement title="Chef in Training" descr="yooo" icon="chef-hat" />
          <Achievement title="Chef in Training" descr="yooo" icon="chef-hat" />
          <Achievement title="Chef in Training" descr="yooo" icon="chef-hat" />
          <Achievement title="Chef in Training" descr="yooo" icon="chef-hat" />
        </Box>
      )}
      {sel == 1 && (
        <Box style={{ gap: 20, paddingTop: 20, paddingBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              width: "90%",
              height: 40,
              textAlign: "center",
              backgroundColor: back1,
              borderRadius: 10,
              color: textColor,
            }}
          >
            {user.email}
          </TextInput>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              width: "90%",
              height: 40,
              textAlign: "center",
              backgroundColor: back1,
              borderRadius: 10,
              color: textColor,
            }}
            secureTextEntry={true}
          >
            Test21312312312
          </TextInput>
          <Pressable onPress={() => auth().signOut()}>
            <Text style={{ color: textColor }}>Log out</Text>
          </Pressable>
          <Text
            style={{ textAlign: "center", color: "gray", fontStyle: "italic" }}
          >
            Whatever you wanna do, forget it. This isn't the production version
            brother
          </Text>
        </Box>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    width: "49%",
    height: "80%",
    flexDirection: "row",
    marginVertical: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-Variable",
    fontWeight: "200",
  },
});

export default Profile;
