import React from "react";
import { View, Text } from "react-native";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import renderIcon from "@/assets/styles/renderIcon";
import { colors } from "@/assets/styles/common";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const AccountButton = ({ size = 48, animated = false, onPress = () => {} }) => {
  const { theme } = useContext(ThemeContext);
  const { profile } = useData();

  const isDarkmode = theme === "dark" ? true : false;
  const level = profile?.level ?? 1;
  const icon = profile?.equipped?.icon || "person-standing";

  const bounce = useSharedValue(0);
  useEffect(() => {
    if (animated) {
      bounce.value = withDelay(
        50,
        withRepeat(withTiming(6, { duration: 1200 }), -1, true)
      );
    }
  }, [animated]);
  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  const badge = (
    <View
      style={{
        width: animated ? size / 2.3 : size / 2.5,
        height: animated ? size / 2.3 : size / 2.5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: colors.purple,
        borderRadius: 360,
      }}
    >
      <Text
        style={{
          color: isDarkmode ? "white" : "black",
          fontSize: size / 4.5,
          fontWeight: "bold",
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {level}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: isDarkmode ? "#e5e5e5" : "#262626",
        borderRadius: 360,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        alignContent: "center",
        marginRight: 10,
      }}
    >
      {animated ? (
        <Animated.View
          style={[
            bounceStyle,
            { position: "absolute", bottom: -2, right: -2 },
          ]}
        >
          {badge}
        </Animated.View>
      ) : (
        <View style={{ position: "absolute", top: -2, right: -2 }}>
          {badge}
        </View>
      )}
      {renderIcon(icon, isDarkmode ? "black" : "white", size / 2)}
    </View>
  );
};

export default AccountButton;
