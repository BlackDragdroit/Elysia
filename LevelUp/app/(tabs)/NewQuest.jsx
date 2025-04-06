import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

const NewQuest = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>New Quest</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

export default NewQuest;
