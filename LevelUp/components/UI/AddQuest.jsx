import React, { useContext, useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import renderIcon from "../../assets/styles/renderIcon";
import { useNavigation } from "expo-router";

export const AddQuest = ({ onClose }) => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const navigator = useNavigation();

  const [focus, setFocus] = useState(0);

  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        style={{
          height: "60%",
          width: "100%",
          alignItems: "center",
          backgroundColor: isDarkmode ? "#09090b" : "white",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#1f1f21",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "20%",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              top: 20,
              right: 10,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
            onPress={() => onClose()}
          >
            {renderIcon("x", "gray", 16)}
          </Pressable>
          <Text
            style={[
              styles.subTitle,
              {
                color: isDarkmode ? colors.textDark : colors.textLight,
                textAlign: "center",
                fontWeight: "bold",
              },
            ]}
          >
            Add New Quest
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "90%" }}>
            <Text style={{ color: isDarkmode ? "#404040" : "black" }}>
              Quest Title
            </Text>
          </View>

          <TextInput
            style={[
              {
                width: "90%",
                borderWidth: 1,
                borderColor: isDarkmode ? "white" : "black",
                borderRadius: 10,
                color: isDarkmode ? "#404040" : "black",
                backgroundColor: isDarkmode ? "black" : "white",
              },
            ]}
            placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
            placeholder="What needs to be done?"
          />
        </View>
      </View>
    </View>
  );
};
