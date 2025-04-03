import {
  Platform,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import FirstQuestPage from "../../components/FirstQuestPage";
import { FadeIn } from "../../assets/styles/Animations/Animations";
import { colors } from "../../assets/styles/common";
import { useSearchParams } from "expo-router/build/hooks";

const Quests = () => {
  let params = useSearchParams();

  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <FadeIn speed={300}>
        {params.get("newQuest") ? (
          <View>
            <Text style={styles.header}>New Quest</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.header}>Quests {params}</Text>
          </View>
        )}
      </FadeIn>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontFamily: "SpaceGrotesk",
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    width: "100%",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: "SpaceGrotesk",
    textAlign: "left",
    width: "80%",
  },
  count: {
    fontSize: 18,
    color: "white",
    fontFamily: "SpaceGrotesk",
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
