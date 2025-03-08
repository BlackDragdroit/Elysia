import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";

import commonStyles from "../assets/styles/common";

const FirstHome = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Text style={commonStyles.title}>This is your Home Page</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "white",
  },
});

export default FirstHome;
