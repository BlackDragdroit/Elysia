import renderIcon from "../../assets/styles/renderIcon";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { Pressable, View } from "react-native";
import Header from "../../components/UI/Header";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { OutcomeToast } from "@/components/Contexts/DataProvider";
import { font, colors } from "@/assets/styles/common";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return <ThemedTabs />;
}

function ThemedTabs() {
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark";

  return (
    <View style={{ flex: 1, backgroundColor: isDarkmode ? "#0f0f12" : "#f4f4f6" }}>
      <StatusBar style={isDarkmode ? "light" : "dark"} />
      <Header />
      <OutcomeToast />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkmode ? "#18181c" : "#ffffff",
            borderTopWidth: 1,
            borderTopColor: isDarkmode ? "#2a2a31" : "#e4e4e7",
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: "transparent",
          },
          tabBarActiveTintColor: colors.purple,
          tabBarInactiveTintColor: isDarkmode ? "#a3a3a3" : "#737373",
          tabBarLabelStyle: {
            fontFamily: font,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => renderIcon("house", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="Quests"
          options={{
            tabBarLabel: "Quests",
            tabBarIcon: ({ color, size }) =>
              renderIcon("square-check-big", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="NewQuest"
          options={{
            tabBarLabel: "",
            tabBarIcon: () => <NewQuestButton size={50} />,
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="Bosses"
          options={{
            tabBarLabel: "Bosses",
            tabBarIcon: ({ color, size }) => renderIcon("swords", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) =>
              renderIcon("person-standing", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </View>
  );
}
