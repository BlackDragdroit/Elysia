import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "../../assets/styles/Animations/Animations";
import { useSearchParams } from "expo-router/build/hooks";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { styles, colors } from "@/assets/styles/common";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import renderIcon from "../../assets/styles/renderIcon";

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
              All Quests
            </Text>
            <View style={{ marginRight: 10 }}>
              <NewQuestButton />
            </View>
          </View>
        </View>
        {taskMapper(textColor)}
      </FadeIn>
    </LinearGradient>
  );
};

const taskMapper = (textColor) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "80%",
          height: 35,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#f5f5f4",
          borderRadius: 5,
        }}
      >
        <View style={localStyles.textContainer}>
          {renderIcon("calendar", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Today</Text>
        </View>
        <View style={localStyles.textContainer}>
          {renderIcon("upcoming", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Upcoming</Text>
        </View>
        <View style={localStyles.textContainer}>
          {renderIcon("completed", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>
            Completed
          </Text>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    width: "28%",
    height: "80%",
    flexDirection: "row",
    marginVertical: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontFamily: "Roboto-Variable",
    fontWeight: "200",
  },
});

export default Quests;
