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
import commonStyles from "../../assets/styles/common";
import { LinearGradient } from "expo-linear-gradient";
import FirstQuestPage from "../../components/FirstQuestPage";
import { FadeIn } from "../../assets/styles/Animations/Animations";

const Quests = () => {
  let quests = true;

  const DATA = [
    { title: "Main", data: ["First Quest", "Second Quest", "Third Quest"] },
    { title: "Side", data: ["Fourth Quest", "Fifth Quest", "Sixth Quest"] },
    {
      title: "Bonus",
      data: ["Kill a Boss", "Eighth Quest", "Ninth Quest"],
    },
    {
      title: "Daily",
      data: ["Tenth Quest", "Eleventh Quest", "Twelfth Quest"],
    },
  ];

  return (
    <LinearGradient
      translucent
      colors={["#5E1C59", "#150067"]}
      style={commonStyles.container}
    >
      {quests && (
        <FadeIn speed={300}>
          <View style={commonStyles.container}>
            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => (
                <View style={styles.item}>
                  <Text style={styles.count}>{index + 1}.</Text>
                  <Text style={styles.text}>{item}</Text>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
              // renderSectionFooter={({ section }) => (
              //   <View style={styles.footerItem}></View>
              // )}
            ></SectionList>
          </View>
        </FadeIn>
      )}
      {!quests && (
        <>
          <StatusBar translucent />
          <FirstQuestPage />
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontFamily: "SpaceGrotesk",
    // fontWeight: "bold",
    color: "white",
    textAlign: "left",
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
