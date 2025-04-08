import { Platform, StatusBar, StyleSheet } from "react-native";

export const titleFont = "Audiowide-Regular";
export const font = "Roboto-Variable";

export const titleSize = 36;
export const subTitleSize = 24;

export const colors = {
  background: "#181818",
  gradientLight1: "#f4f4f4",
  gradientLight2: "#e5e5e5",
  gradientDark1: "#181818",
  gradientDark2: "#252525",
  primary: "#FF6347",
  secondary: "#4CAF50",
  textLight: "black",
  textDark: "white",
  border: "#FFFFFF",
  purple: "#6b57ea",
  pink: "#a855f7",
};

export const styles = StyleSheet.create({
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
    fontFamily: titleFont,
    color: "white",
    textAlign: "center",
  },
  subTitle: {
    fontSize: subTitleSize,
    fontFamily: font,
    fontWeight: "bold",
    marginLeft: 10,
  },

  subTitleView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  subTitleText: {
    fontFamily: font,
    color: colors.purple,
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: font,
    textAlign: "center",
  },
});
