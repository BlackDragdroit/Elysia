import { ThemeContext } from "../../components/Contexts/ThemeProvider";
import renderIcon from "../../assets/styles/renderIcon";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
export default function RootLayout() {
  const theme = useContext(ThemeContext);

  const router = useRouter();

  const isDarkmode = true;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkmode ? "#171717" : "#ffffff",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#6b57c8",
        tabBarLabelStyle: {
          fontFamily: "SpaceGrotesk",
        },
      }}
    >
      {/* options={{ tabBarLabel: "Home" }} */}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default behavior of tab press
            navigation.navigate("Quests"); // Navigate to the Quests screen with newQuest param
          },
        })}
      ></Tabs.Screen>

      <Tabs.Screen
        name="NewQuest"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => renderIcon("newQuest", "#6b57c8", 48),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: "transparent" }} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default behavior of tab press
            router.replace("/(tabs)/Quests?newQuest=true"); // Navigate to the Quests tab with newQuest query param
          },
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
          tabBarLabel: "Pro",
          tabBarIcon: ({ color, size }) => renderIcon("profile", color, size),
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: "transparent" }} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
