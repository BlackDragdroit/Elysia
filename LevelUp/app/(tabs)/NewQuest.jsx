import { AddQuest } from "@/components/UI/AddQuest";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useContext } from "react";
import { View } from "react-native";
import { router } from "expo-router";

const NewQuest = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme == "dark" ? "black" : "white",
      }}
    >
      <AddQuest onClose={backHandling} />
    </View>
  );
};

const backHandling = () => {
  router.back();
};

export default NewQuest;
