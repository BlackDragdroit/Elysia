import { Platform, StatusBar, StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginTop: 20,
    fontFamily: "Audiowide-Regular",
    color: "white",
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    color: "white",
    fontFamily: "Audiowide-Regular",
  },
});

export default commonStyles;
