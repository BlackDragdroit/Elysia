import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyles from "../../assets/styles/common";
import { LinearGradient } from "expo-linear-gradient";
const Profile = () => {
  return (
    <LinearGradient
      colors={["#5E1C59", "#150067"]}
      style={commonStyles.container}
    >
      <View style={commonStyles.container}>
        <StatusBar
          translucent
          backgroundColor="black"
          barStyle="light-content"
        />
        <View style={commonStyles.header}>
          <Text style={commonStyles.text}>Profile</Text>
        </View>
        <View style={commonStyles.contentContainer}></View>
      </View>
    </LinearGradient>
  );
};

export default Profile;
