import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import renderIcon from "@/assets/styles/renderIcon";
import Box from "@/components/UI/Box";
import { LevelBar } from "@/components/UI/LevelBar";
import { AddBoss } from "@/components/UI/AddBoss";

const Bosses = () => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [newBossUI, setNewBossUI] = useState(false);
  const { bosses } = useData();

  const sorted = [...bosses].sort((a, b) => a.defeated - b.defeated);

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
            {sorted.length === 0 ? (
              <Box>No active boss battles. Create a new challenge!</Box>
            ) : (
              sorted.map((b) => <BossCard key={b.id} boss={b} />)
            )}
          </View>
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
};

const BossCard = ({ boss }) => {
  const { theme } = useContext(ThemeContext);
  const { completeBossStep, deleteBoss } = useData();
  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;
  const subColor = isDarkmode ? "#a3a3a3" : "#737373";

  const done = boss.steps.filter((s) => s.completed).length;

  return (
    <Box style={{ flexDirection: "column", alignItems: "stretch" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          {renderIcon("swords", boss.defeated ? colors.purple : textColor, 20)}
          <Text
            style={{
              color: textColor,
              fontFamily: "Roboto-Variable",
              fontWeight: "bold",
              fontSize: 16,
              flexShrink: 1,
            }}
          >
            {boss.title}
          </Text>
        </View>
        <Pressable onPress={() => deleteBoss(boss.id)} style={{ padding: 6 }}>
          {renderIcon("trash-2", subColor, 18)}
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 6,
        }}
      >
        <Text style={{ color: subColor, fontSize: 12 }}>
          {boss.defeated ? "Defeated!" : `${done}/${boss.steps.length} steps`}
        </Text>
      </View>
      <LevelBar
        prog={(done / boss.steps.length) * 100}
        style={{ width: "100%", marginTop: 4, marginBottom: 8 }}
      />

      {boss.steps
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((s) => (
          <View
            key={s.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 6,
              borderTopWidth: 1,
              borderColor: isDarkmode ? "#27272a" : "#e7e5e4",
            }}
          >
            <Pressable
              onPress={() =>
                !s.completed && !boss.defeated && completeBossStep(boss.id, s.id)
              }
              style={{
                width: 24,
                height: 24,
                borderRadius: 360,
                borderWidth: 2,
                borderColor: s.completed ? colors.purple : subColor,
                backgroundColor: s.completed ? colors.purple : "transparent",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {s.completed && renderIcon("check", "white", 14)}
            </Pressable>
            <Text
              style={{
                color: s.completed ? subColor : textColor,
                fontSize: 14,
                textDecorationLine: s.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {s.text}
            </Text>
          </View>
        ))}
    </Box>
  );
};

export default Bosses;
