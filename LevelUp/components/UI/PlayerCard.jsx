import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import renderIcon from "@/assets/styles/renderIcon";
import Chip from "./Chip";
import ProgressBar from "./ProgressBar";
import { radius, type } from "@/assets/styles/theme";

export default function PlayerCard({ profile }) {
  const pct = profile.xpForNext > 0 ? profile.xpIntoLevel / profile.xpForNext : 0;
  return (
    <LinearGradient
      colors={["#6b57ea", "#4a38c9"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{ borderRadius: radius.card, padding: 20 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(255,255,255,0.22)", alignItems: "center", justifyContent: "center" }}>
          {renderIcon(profile.equipped?.icon || "person-standing", "#ffffff", 30)}
        </View>
        <View style={{ marginLeft: 14, flex: 1 }}>
          <Text style={[type.stat, { fontSize: 20, color: "#ffffff" }]} numberOfLines={1}>{profile.displayName}</Text>
          {profile.username ? <Text style={[type.caption, { color: "rgba(255,255,255,0.75)" }]}>@{profile.username}</Text> : null}
          {profile.equipped?.title ? (
            <View style={{ marginTop: 6 }}><Chip label={profile.equipped.title} color="#ffffff" bg="rgba(255,255,255,0.22)" /></View>
          ) : null}
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
        <Text style={[type.label, { color: "#ffffff" }]}>Level {profile.level}</Text>
        <Text style={[type.label, { color: "rgba(255,255,255,0.85)" }]}>{profile.xpIntoLevel} / {profile.xpForNext} XP</Text>
      </View>
      <ProgressBar progress={pct} trackColor="rgba(255,255,255,0.3)" fillColor="#ffffff" />
    </LinearGradient>
  );
}
