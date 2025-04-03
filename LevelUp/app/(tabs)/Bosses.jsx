import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "../../assets/styles/Animations/Animations";
import { commonStyles, colors } from "../../assets/styles/common";
const Profile = () => {
  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <FadeIn speed={300}>
        <View style={commonStyles.container}>
          <StatusBar translucent />
        </View>
      </FadeIn>
    </LinearGradient>
  );
};

export default Profile;
