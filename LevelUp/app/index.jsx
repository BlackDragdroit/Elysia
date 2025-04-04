import { Redirect, Slot } from "expo-router";
import "react-native-reanimated";
import "react-native-gesture-handler";

const StartPage = () => {
  return <Redirect href="./(tabs)/Home" />;
};

export default StartPage;
