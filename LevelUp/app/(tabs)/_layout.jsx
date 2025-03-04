import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#5E1C59",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "white",
      }}
    >
      {/* options={{ tabBarLabel: "Home" }} */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="accessibility-outline"
              color={color}
              size={size}
            ></Ionicons>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Quests"
        options={{
          tabBarLabel: "Manage Quests",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" color={color} size={size} />
          ),
        }}
      ></Tabs.Screen>
      {/* options={{ tabBarLabel: "Profile" }} */}
    </Tabs>
  );
}
