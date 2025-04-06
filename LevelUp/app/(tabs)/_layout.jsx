import renderIcon from "../../assets/styles/renderIcon";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { Pressable, View } from "react-native";
import Header from "../../components/UI/Header";
import {
  ThemeProvider,
  ThemeContext,
} from "@/components/Contexts/ThemeProvider";
import { font } from "@/assets/styles/common";

export default function TabsLayout() {
  return (
    <ThemeProvider>
      <ThemedTabs />
    </ThemeProvider>
  );
}

function ThemedTabs() {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const isDarkmode = theme === "dark"; // Determine if dark mode is active

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkmode ? "#171717" : "#ffffff", // Dynamic background color
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: "transparent",
          },
          tabBarActiveTintColor: isDarkmode ? "#6b57c8" : "#6b57c8", // Dynamic active tint color
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
            tabBarIcon: ({ color, size }) => renderIcon("tasks", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="NewQuest"
          options={{
            tabBarLabel: "",
            tabBarIcon: () => (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#6b57c8",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                {renderIcon("newQuest", "white", 30)}
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="Bosses"
          options={{
            tabBarLabel: "Bosses",
            tabBarIcon: ({ color, size }) => renderIcon("bosses", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => renderIcon("profile", color, size),
            tabBarButton: (props) => (
              <Pressable {...props} android_ripple={{ color: "transparent" }} />
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </View>
  );
}
