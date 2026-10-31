import React, { useEffect } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, Modal, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useReducedMotion, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useTheme, type, radius } from "@/assets/styles/theme";
import renderIcon from "@/assets/styles/renderIcon";
import IconButton from "@/components/UI/IconButton";
import { formatDueDate } from "@/services/filters";

export function Sheet({ title, onClose, children }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();
  const ty = useSharedValue(reduced ? 0 : 40);
  const op = useSharedValue(reduced ? 1 : 0);
  useEffect(() => {
    ty.value = withTiming(0, { duration: 200 });
    op.value = withTiming(1, { duration: 200 });
  }, []);
  const anim = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ translateY: ty.value }] }));

  return (
    <Modal transparent visible animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(0,0,0,0.5)" }]} onPress={onClose} accessibilityLabel="Close" accessibilityRole="button" />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Animated.View style={[anim, { backgroundColor: c.surface, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, padding: 20, paddingBottom: 20 + insets.bottom, maxHeight: "90%" }]}>
            <View style={{ alignSelf: "center", width: 36, height: 4, borderRadius: 2, backgroundColor: c.border, marginBottom: 12 }} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Text style={[type.sectionTitle, { color: c.text }]}>{title}</Text>
              <IconButton icon="x" accessibilityLabel="Close" onPress={onClose} />
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
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
