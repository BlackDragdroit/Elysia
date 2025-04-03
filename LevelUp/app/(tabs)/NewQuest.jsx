import { useEffect } from "react";
import { useRouter } from "expo-router";

const NewQuest = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Quests tab on mount
    router.replace("/(tabs)/Quests");
  }, [router]);
};

export default NewQuest;
