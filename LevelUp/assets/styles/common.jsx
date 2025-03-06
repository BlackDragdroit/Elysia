import { Platform, StatusBar, StyleSheet } from "react-native";
let titleFont = "Audiowide-Regular";
let font = "SpaceGrotesk";

const commonStyles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
    width: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 10,
    marginTop: 20,
    width: "100%",
    height: "80%",
    // borderWidth: 3,
    borderBlockColor: "white",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    // fontSize: 38,
    // // marginTop: 20,
    // fontFamily: titleFont,
    color: "white",
    fontSize: 24,
    fontFamily: font,
    color: "white",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: font,
  },
});

export default commonStyles;
