import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#150067",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          fontFamily: "SpaceGrotesk",
        },
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
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: "transparent" }} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Game",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              color={color}
              size={size}
            />
          ),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: "transparent" }} />
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
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: "transparent" }} />
          ),
        }}
      ></Tabs.Screen>
      {/* options={{ tabBarLabel: "Profile" }} */}
    </Tabs>
  );
}
