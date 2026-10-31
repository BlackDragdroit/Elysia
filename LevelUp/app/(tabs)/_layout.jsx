import renderIcon from "../../assets/styles/renderIcon";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddQuest } from "@/components/UI/AddQuest";
import Header from "../../components/UI/Header";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import { OutcomeToast } from "@/components/Contexts/DataProvider";
import { useTheme } from "@/assets/styles/theme";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return <ThemedTabs />;
}

const tabButton = (label) => (props) => (
  <Pressable {...props} android_ripple={{ color: "transparent" }} accessibilityLabel={label} />
);

function ThemedTabs() {
  const { isDark, c } = useTheme();
  const insets = useSafeAreaInsets();
  const [questSheetOpen, setQuestSheetOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Header />
      <OutcomeToast />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: c.surface,
            borderTopWidth: 1,
            borderTopColor: c.border,
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: "transparent",
            height: 64 + insets.bottom,
            paddingBottom: 8 + insets.bottom,
            paddingTop: 8,
          },
          tabBarActiveTintColor: c.accent,
          tabBarInactiveTintColor: c.textMuted,
          tabBarLabelStyle: {
            fontFamily: "Roboto-Variable",
            fontSize: 12,
            fontWeight: "500",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => renderIcon("house", color, size),
            tabBarButton: tabButton("Home"),
          }}
        />
        <Tabs.Screen
          name="Quests"
          options={{
            tabBarLabel: "Quests",
            tabBarIcon: ({ color, size }) => renderIcon("square-check-big", color, size),
            tabBarButton: tabButton("Quests"),
          }}
        />
        <Tabs.Screen
          name="NewQuest"
          options={{
            tabBarLabel: "",
            tabBarIcon: () => <NewQuestButton />,
            tabBarButton: ({ href, onPress, ...props }) => (
              <Pressable
                {...props}
                onPress={() => setQuestSheetOpen(true)}
                android_ripple={{ color: "transparent" }}
                accessibilityLabel="New quest"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Bosses"
          options={{
            tabBarLabel: "Bosses",
            tabBarIcon: ({ color, size }) => renderIcon("swords", color, size),
            tabBarButton: tabButton("Bosses"),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => renderIcon("person-standing", color, size),
            tabBarButton: tabButton("Profile"),
          }}
        />
      </Tabs>
      {questSheetOpen && <AddQuest onClose={() => setQuestSheetOpen(false)} />}
    </View>
  );
}
