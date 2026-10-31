import React from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme, type, radius } from "@/assets/styles/theme";
import renderIcon from "@/assets/styles/renderIcon";
import IconButton from "@/components/UI/IconButton";
import { formatDueDate } from "@/services/filters";

export function Sheet({ title, onClose, children }) {
  const { c } = useTheme();
  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
      <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} onPress={onClose} accessibilityLabel="Close" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={{ backgroundColor: c.surface, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, padding: 20, paddingBottom: 32 }}>
          <View style={{ alignSelf: "center", width: 36, height: 4, borderRadius: 2, backgroundColor: c.border, marginBottom: 12 }} />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={[type.sectionTitle, { color: c.text }]}>{title}</Text>
            <IconButton icon="x" accessibilityLabel="Close" onPress={onClose} />
          </View>
          <ScrollView style={{ maxHeight: 560 }} keyboardShouldPersistTaps="handled">{children}</ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export function DueDateRow({ date, setDate, showPicker, setShowPicker, c }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[type.label, { color: c.textMuted, marginBottom: 6 }]}>Due date</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={() => setShowPicker(true)}
          accessibilityRole="button" accessibilityLabel="Pick a due date"
          style={{ flexDirection: "row", alignItems: "center", height: 48, paddingHorizontal: 14, borderRadius: radius.control, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, flex: 1 }}>
          {renderIcon("calendar", c.textMuted, 18)}
          <Text style={[type.body, { color: date ? c.text : c.textMuted, marginLeft: 10 }]}>
            {date ? formatDueDate(date.toISOString()) : "None"}
          </Text>
        </Pressable>
        {date ? <IconButton icon="x" accessibilityLabel="Clear due date" onPress={() => setDate(null)} /> : null}
      </View>
      {showPicker ? (
        <DateTimePicker value={date || new Date()} onChange={(_, d) => { setShowPicker(false); if (d) setDate(d); }} themeVariant="light" />
      ) : null}
    </View>
  );
}

