import { AddQuest } from "@/components/UI/AddQuest";
import { useTheme } from "@/assets/styles/theme";
import { View } from "react-native";
import { router } from "expo-router";

const NewQuest = () => {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <AddQuest onClose={() => router.back()} />
    </View>
  );
};

export default NewQuest;
