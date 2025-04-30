import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import Box from "@/components/UI/Box";
import { AddBoss } from "@/components/UI/AddBoss";
const Bosses = () => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [newBossUI, setNewBossUI] = useState(false);

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
      {newBossUI ? <AddBoss onClose={setNewBossUI} /> : ""}
      <FadeIn speed={100}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
              <Text
                style={[styles.subTitle, { color: textColor, marginLeft: 0 }]}
              >
                Boss Battles
              </Text>
              <View style={{ marginRight: 10 }}>
                <Pressable onPress={setNewBossUI}>
                  <NewQuestButton />
                </Pressable>
              </View>
            </View>
            <Box>No active boss battles. Create a new challenge!</Box>
          </View>
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
};

export default Bosses;
