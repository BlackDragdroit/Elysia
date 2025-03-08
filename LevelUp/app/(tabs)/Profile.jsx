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
        <StatusBar translucent />
      </View>
    </LinearGradient>
  );
};

export default Profile;
