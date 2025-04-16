import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import renderIcon from "../../assets/styles/renderIcon";
import { useNavigation } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export const AddBoss = ({ onClose }) => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const navigator = useNavigation();

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
          minHeight: 450,
          maxHeight: "100%",
          width: "100%",
          alignItems: "center",
          backgroundColor: isDarkmode ? "#09090b" : "white",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#1f1f21",
        }}
      >
        <ScrollView>
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
              Add Boss Battle
            </Text>
          </View>
          {AddQuestContent(isDarkmode, onClose)}
        </ScrollView>
      </View>
    </View>
  );
};

const AddQuestContent = (isDarkmode, onClose) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 40,
      }}
    >
      <View style={{ width: "90%", marginBottom: 10 }}>
        <Text style={{ color: isDarkmode ? "#404040" : "black" }}>
          Boss Title
        </Text>
      </View>

      <TextInput
        style={[
          {
            width: "90%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            borderRadius: 10,
            color: isDarkmode ? "#404040" : "black",
            backgroundColor: isDarkmode ? "black" : "white",
          },
        ]}
        placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
        placeholder="e.g. Learn Spanish Basics"
      />

      <View
        style={{
          width: "90%",
          marginTop: 20,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "48%" }}>
          <Text style={{ color: isDarkmode ? "#404040" : "black" }}>
            Description
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 40,
          width: "100%",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "red",
        }}
      >
        <TextInput
          style={[
            {
              width: "90%",
              height: 80,
              borderWidth: 1,
              borderColor: isDarkmode ? "white" : "black",
              borderRadius: 10,
              color: isDarkmode ? "#404040" : "black",
              backgroundColor: isDarkmode ? "black" : "white",
            },
          ]}
          placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
          placeholder="e.g. Learn Spanish Basics"
        />
      </View>
      <View
        style={{
          width: "90%",
          marginTop: 20,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: isDarkmode ? "#404040" : "black" }}>
          Due Date & Time
        </Text>
      </View>

      <Pressable
        style={{
          width: "90%",
          height: 40,
          borderWidth: 1,
          borderColor: isDarkmode ? "white" : "black",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          flexDirection: "row",
        }}
        onPress={setShowDatePicker}
      >
        {renderIcon(
          "calendar",
          isDarkmode ? colors.textDark : colors.textLight,
          21
        )}
        <Text
          style={{
            color: isDarkmode ? colors.textDark : colors.textLight,
            textAlign: "center",
          }}
        >
          {new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            year: "numeric",
            month: "long", // e.g., "April"
            day: "2-digit",
          }).format(date)}
        </Text>
      </Pressable>

      <View
        style={{
          width: "90%",
          flexDirection: "row",
          marginTop: 40,
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            height: 40,
            width: "48%",
            borderRadius: 5,
            justifyContent: "center",
          }}
          onPress={() => onClose()}
        >
          <Text
            style={{
              color: isDarkmode ? "white" : "black",
              fontFamily: "Roboto-Variable",
              textAlign: "center",
            }}
          >
            Cancel
          </Text>
        </Pressable>
        <Pressable
          style={{
            height: 40,
            width: "48%",
            borderRadius: 5,
            justifyContent: "center",
            backgroundColor: colors.purple,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Roboto-Variable",
              textAlign: "center",
            }}
          >
            Create Quest
          </Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          onChange={onChangeDate}
          themeVariant="light"
        />
      )}
      {/* <TextInput
        style={[
          {
            width: "90%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            borderRadius: 10,
            color: isDarkmode ? "#404040" : "black",
            backgroundColor: isDarkmode ? "black" : "white",
          },
        ]}
        placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
        placeholder="What needs to be done?"
      /> */}
    </View>
  );
};

// const DateTimePicker = ({ isDarkmode, style = {} }) => {
//   return <View style={style}></View>;
// };
