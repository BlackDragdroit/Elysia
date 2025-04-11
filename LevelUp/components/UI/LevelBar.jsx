import { View } from "react-native";

export const LevelBar = ({ prog = 4 /*In percent*/, style = {} }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#e5e5e5",
          borderRadius: 10,
          justifyContent: "center",
          height: 12,
          width: "72%",
        },
        style,
      ]}
    >
      <View
        style={{
          borderRadius: 10,
          height: 12,
          width: prog + "%",
          backgroundColor: "#6b57ea",
        }}
      ></View>
    </View>
  );
};
