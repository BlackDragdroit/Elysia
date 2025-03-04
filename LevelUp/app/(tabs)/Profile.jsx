import { StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyles from "../../assets/styles/common";
import { LinearGradient } from "expo-linear-gradient";
const Profile = () => {
  return (
    <LinearGradient
      colors={["#150067", "#5E1C59"]}
      style={commonStyles.container}
    >
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Profile</Text>
      </View>
    </LinearGradient>
  );
};

export default Profile;
