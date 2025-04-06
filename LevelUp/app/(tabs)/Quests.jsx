import {
  Platform,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "../../assets/styles/Animations/Animations";
import { useSearchParams } from "expo-router/build/hooks";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { font, colors } from "@/assets/styles/common";

const Quests = () => {
  let params = useSearchParams();

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
      <FadeIn speed={300}>
        {params.get("newQuest") ? (
          <View>
            <Text style={[styles.header, { color: textColor }]}>New Quest</Text>
          </View>
        ) : (
          <View>
            <Text style={[styles.header, { color: textColor }]}>Quests</Text>
          </View>
        )}
      </FadeIn>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontFamily: font,
    // fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: font,
    textAlign: "left",
    width: "80%",
  },
  count: {
    fontSize: 18,
    color: "white",
    fontFamily: font,
    textAlign: "left",
    marginRight: "10%",
    width: 18,
  },
  headerItem: {
    marginTop: 20,
    // width: 300,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    // width: "90%",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 5,
    paddingLeft: "10%",
  },
});

export default Quests;
