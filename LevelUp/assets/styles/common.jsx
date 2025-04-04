import { Platform, StatusBar, StyleSheet } from "react-native";

let titleFont = "Audiowide-Regular";
let font = "SpaceGrotesk";

export const colors = {
  background: "#181818",
  gradientLight1: "#f4f4f4",
  gradientLight2: "#e5e5e5",
  gradientDark1: "#181818",
  gradientDark2: "#252525",
  primary: "#FF6347",
  secondary: "#4CAF50",
  text: "#FFFFFF",
  border: "#FFFFFF",
};

export const commonStyles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: "20%",
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
    justifyContent: "center",
    // borderColor: "white",
    // borderWidth: 1,
  },
  title: {
    // fontSize: 38,
    // // marginTop: 20,
    // fontFamily: titleFont,
    color: "white",
    fontSize: 24,
    fontFamily: font,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: font,
    textAlign: "center",
  },
});
