import React, { useContext, useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import renderIcon from "../../assets/styles/renderIcon";
import { useNavigation } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export const AddQuest = ({ onClose }) => {
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
          height: 450,
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
        {AddQuestContent(isDarkmode, onClose)}
      </View>
    </View>
  );
};

const AddQuestContent = (isDarkmode, onClose) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("core");
  const [items, setItems] = useState([
    { label: "Core Quest", value: "core" },
    { label: "Optional Quest", value: "optional" },
  ]);
  const [openDif, setOpenDif] = useState(false);
  const [valueDif, setValueDif] = useState("100");
  const [itemsDif, setItemsDif] = useState([
    { label: "Easy", value: "100" },
    { label: "Medium", value: "300" },
    { label: "Hard", value: "500" },
    { label: "Epic", value: "1000" },
  ]);
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
      }}
    >
      <View style={{ width: "90%", marginBottom: 10 }}>
        <Text
          style={{ color: isDarkmode ? colors.textDark : colors.textLight }}
        >
          Quest Title
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
            color: isDarkmode ? colors.textDark : colors.textLight,
            backgroundColor: isDarkmode ? "black" : "white",
          },
        ]}
        placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
        placeholder="What needs to be done?"
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
          <Text
            style={{ color: isDarkmode ? colors.textDark : colors.textLight }}
          >
            Quest Type
          </Text>
        </View>
        <View style={{ width: "48%" }}>
          <Text
            style={{ color: isDarkmode ? colors.textDark : colors.textLight }}
          >
            Difficulty
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 40,
          width: "90%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "48%" }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholderStyle={{
              color: isDarkmode ? colors.textDark : colors.textLight,
            }}
            style={{
              minHeight: 40,
              width: "100%",
              backgroundColor: isDarkmode ? "black" : "white",
              borderWidth: 1,
              borderColor: isDarkmode ? "white" : "black",
            }}
            dropDownContainerStyle={{
              backgroundColor: isDarkmode ? "black" : "white",
              marginTop: 5,
              width: "100%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: isDarkmode ? "white" : "black",
              justifyContent: "center",
            }}
            textStyle={{
              color: isDarkmode ? "white" : "black",
            }}
            selectedItemContainerStyle={{
              backgroundColor: isDarkmode ? "#27272a" : "lightgray",
            }}
            tickIconStyle={{
              tintColor: isDarkmode ? colors.textDark : colors.textLight,
            }}
            arrowIconStyle={{
              tintColor: isDarkmode ? colors.textDark : colors.textLight,
            }}
          />
        </View>
        <View style={{ width: "48%" }}>
          <DropDownPicker
            open={openDif}
            value={valueDif}
            items={itemsDif}
            setOpen={setOpenDif}
            setValue={setValueDif}
            setItems={setItemsDif}
            placeholderStyle={{
              color: isDarkmode ? colors.textDark : colors.textLight,
            }}
            style={{
              minHeight: 40,
              width: "100%",
              backgroundColor: isDarkmode ? "black" : "white",
              borderWidth: 1,
              borderColor: isDarkmode ? "white" : "black",
            }}
            dropDownContainerStyle={{
              backgroundColor: isDarkmode ? "black" : "white",
              marginTop: 5,
              width: "100%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: isDarkmode ? "white" : "black",
              justifyContent: "center",
            }}
            textStyle={{
              color: isDarkmode ? "white" : "black",
            }}
            selectedItemContainerStyle={{
              backgroundColor: isDarkmode ? "#27272a" : "lightgray",
            }}
            tickIconStyle={{
              tintColor: isDarkmode ? colors.textDark : colors.textLight,
            }}
            arrowIconStyle={{
              tintColor: isDarkmode ? colors.textDark : colors.textLight,
            }}
          />
        </View>
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
        <Text
          style={{ color: isDarkmode ? colors.textDark : colors.textLight }}
        >
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
            color: isDarkmode ? colors.textDark : colors.textLight,
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
