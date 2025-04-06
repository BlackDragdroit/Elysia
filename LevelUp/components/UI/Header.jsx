import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { titleFont } from "@/assets/styles/common";
import renderIcon from "@/assets/styles/renderIcon";
import logo from "../../assets/images/Logo(Purple).png";
import { useContext } from "react";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import AccountButton from "@/components/UI/AccountButton";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark";

  return (
    <View
      style={{
        flex: 0.08,
        flexDirection: "row",
        justifyContent: "space",
        alignItems: "center",
        paddingLeft: 10,
        backgroundColor: isDarkmode ? "#171717" : "#ffffff",
      }}
    >
      <Image
        source={logo}
        style={{ width: 48, height: 48 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "heavy",
          color: isDarkmode ? "white" : "black",
          fontFamily: titleFont,
          left: 10,
        }}
      >
        Elysia
      </Text>
      <Pressable
        style={{
          height: 38,
          width: 38,
          backgroundColor: isDarkmode ? "#262626" : "#f5f5f5",
          borderRadius: 360,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: 10,
        }}
        onPress={() => {
          toggleTheme();
        }}
      >
        {renderIcon(
          isDarkmode ? "lightmode" : "darkmode",
          isDarkmode ? "white" : "black",
          20
        )}
      </Pressable>
      <AccountButton />
    </View>
  );
};

export default Header;
