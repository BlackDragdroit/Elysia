import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import renderIcon from "../../assets/styles/renderIcon";
import DateTimePicker from "@react-native-community/datetimepicker";

export const AddBoss = ({ onClose }) => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

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
        <ScrollView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              height: 60,
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
          <AddBossContent isDarkmode={isDarkmode} onClose={onClose} />
        </ScrollView>
      </View>
    </View>
  );
};

const AddBossContent = ({ isDarkmode, onClose }) => {
  const { createBoss } = useData();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());
  const [hasDate, setHasDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [padding, setPadding] = useState(50);
  const paddingAdjust = 5;

  const [steps, setSteps] = useState([
    { id: Date.now(), text: "" },
    { id: Date.now() + 1, text: "" },
  ]);

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setHasDate(true);
    }
    setShowDatePicker(false);
  };

  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, { id: Date.now(), text: "" }]);
    setPadding(padding + paddingAdjust);
  };

  const removeStep = (id) => {
    setSteps((prevSteps) => {
      if (prevSteps.length > 2) {
        setPadding(padding - paddingAdjust);
        return prevSteps.filter((step) => step.id !== id);
      }
      return prevSteps;
    });
  };

  const updateStepText = (id, text) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === id ? { ...step, text } : step))
    );
  };

  const submit = async () => {
    if (!title.trim()) {
      setError("A boss needs a title");
      return;
    }
    const stepTexts = steps.map((s) => s.text.trim()).filter((t) => t.length > 0);
    if (stepTexts.length < 2) {
      setError("A boss battle needs at least 2 steps");
      return;
    }
    try {
      await createBoss({
        title: title.trim(),
        dueDate: hasDate ? date.toISOString() : null,
        steps: stepTexts,
      });
      onClose();
    } catch (e) {
      setError(e.message || "Could not create boss");
    }
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: padding,
      }}
    >
      <View style={{ width: "90%" }}>
        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text
            style={{ color: isDarkmode ? colors.textDark : colors.textLight }}
          >
            Boss Title
          </Text>
        </View>

        <TextInput
          style={[
            {
              width: "100%",
              height: 40,
              borderWidth: 1,
              borderColor: isDarkmode ? "white" : "black",
              borderRadius: 10,
              color: isDarkmode ? colors.textDark : colors.textLight,
              backgroundColor: isDarkmode ? "black" : "white",
              padding: 5,
            },
          ]}
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
          placeholder="e.g. Learn Spanish Basics"
        />

        <View style={{ width: "100%", marginTop: 20 }}>
          <Text
            style={{ color: isDarkmode ? colors.textDark : colors.textLight }}
          >
            Boss Battle Steps (at least 2 required)
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            justifyContent: "center",
            alignContent: "center",
            gap: 5,
            marginTop: 10,
          }}
        >
          {steps.map((step) => (
            <Step
              key={step.id}
              id={step.id}
              text={step.text}
              isDarkmode={isDarkmode}
              onRemove={removeStep}
              onUpdateText={updateStepText}
            />
          ))}
        </View>

        <Pressable
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: isDarkmode ? "white" : "black",
            justifyContent: "center",
            borderRadius: 10,
            height: 40,
            marginTop: 10,
          }}
          onPress={addStep}
        >
          <Text
            style={{
              color: isDarkmode ? colors.textDark : colors.textLight,
              textAlign: "center",
            }}
          >
            + Add Step
          </Text>
        </Pressable>

        <View
          style={{
            width: "100%",
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
            width: "100%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? colors.textDark : colors.textLight,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
          }}
          onPress={() => setShowDatePicker(true)}
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
            {hasDate
              ? new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(date)
              : "Pick a due date (optional)"}
          </Text>
        </Pressable>

        {error != "" && (
          <Text style={{ color: "#ef4444", marginTop: 10 }}>{error}</Text>
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: isDarkmode ? colors.textDark : colors.textLight,
              height: 40,
              width: "48%",
              borderRadius: 5,
              justifyContent: "center",
            }}
            onPress={() => onClose()}
          >
            <Text
              style={{
                color: isDarkmode ? colors.textDark : colors.textLight,
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
            onPress={submit}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto-Variable",
                textAlign: "center",
              }}
            >
              Create Boss
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
      </View>
    </View>
  );
};

const Step = ({ id, text, isDarkmode, onRemove, onUpdateText }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={[
          {
            width: "90%",
            height: 40,
            borderWidth: 1,
            borderColor: isDarkmode ? colors.textDark : colors.textLight,
            borderRadius: 10,
            color: isDarkmode ? colors.textDark : colors.textLight,
            backgroundColor: isDarkmode ? "black" : "white",
            textAlign: "left",
            textAlignVertical: "top",
            flexShrink: 0,
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
            padding: 5,
            paddingTop: 10,
          },
        ]}
        placeholderTextColor={isDarkmode ? "#a3a3a3" : "#737373"}
        placeholder="e.g. Complete alphabet lessons"
        value={text}
        onChangeText={(newText) => onUpdateText(id, newText)}
      />
      <Pressable
        style={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "21%",
          flexShrink: 0,
        }}
        onPress={() => onRemove(id)}
      >
        {renderIcon("x", isDarkmode ? colors.textDark : colors.textLight, 21)}
      </Pressable>
    </View>
  );
};
