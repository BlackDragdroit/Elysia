import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Link href="./components/Home">
        <Text>Go to Home</Text>
      </Link>
    </View>
  );
}
