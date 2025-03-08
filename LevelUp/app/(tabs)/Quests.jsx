import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import commonStyles from "../../assets/styles/common";
import { LinearGradient } from "expo-linear-gradient";
import FirstQuestPage from "../../components/FirstQuestPage";

const Quests = () => {
  return (
    <LinearGradient
      translucent
      colors={["#5E1C59", "#150067"]}
      style={commonStyles.container}
    >
      <View style={commonStyles.container}>
        <StatusBar translucent />
        <FirstQuestPage />
      </View>
    </LinearGradient>
  );
};

export default Quests;
