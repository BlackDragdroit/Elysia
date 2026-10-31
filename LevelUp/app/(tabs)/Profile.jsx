import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { styles, colors } from "@/assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import Box from "@/components/UI/Box";
import renderIcon from "@/assets/styles/renderIcon";
import { Achievement } from "@/components/UI/Achievement";
import AccountButton from "@/components/UI/AccountButton";
import TitleBadge from "@/components/UI/TitleBadge";
import { LevelBar } from "../../components/UI/LevelBar";
import Message from "@/components/UI/Message";

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const { profile, achievements } = useData();
  const isDarkmode = theme === "dark";

  const textColor = isDarkmode ? colors.textDark : colors.textLight;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <LinearGradient
      colors={
        isDarkmode
          ? [colors.gradientDark1, colors.gradientDark2]
          : [colors.gradientLight1, colors.gradientLight2]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <FadeIn speed={100}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                marginTop: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text style={[styles.subTitle, { color: textColor }]}>
                Your Profile
              </Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Box style={{ flexDirection: "column" }}>
                <AccountButton size={80} animated={true} />
                <Text
                  style={[styles.subTitle, { marginTop: 20, color: textColor }]}
                >
                  {profile?.displayName || "Adventurer"}
                </Text>
                {profile?.username ? (
                  <Text style={[{ color: textColor, marginBottom: 10 }]}>
                    @{profile.username}
                  </Text>
                ) : null}
                {profile?.equipped?.title ? (
                  <View
                    style={{
                      justifyContent: "center",
                      gap: 5,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 20,
                    }}
                  >
                    <TitleBadge title={profile.equipped.title} />
                  </View>
                ) : null}
                <View
                  style={{
                    width: "72%",
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: textColor }}>Level Progress</Text>
                  <Text style={{ color: textColor }}>
                    {profile?.xpIntoLevel ?? 0}/{profile?.xpForNext ?? 1000} XP
                  </Text>
                </View>
                <LevelBar
                  prog={
                    profile
                      ? (profile.xpIntoLevel / profile.xpForNext) * 100
                      : 0
                  }
                  style={{ marginBottom: 10 }}
                />
              </Box>
              <Box
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {renderIcon("trophy", textColor, 48)}
                <Text style={{ color: textColor, marginTop: 12 }}>Total XP</Text>
                <Text style={[styles.subTitle, { color: textColor }]}>
                  {profile?.totalXP ?? 0}
                </Text>
              </Box>
              <Box
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {renderIcon("badge-check", textColor, 48)}
                <Text style={{ color: textColor, marginTop: 12 }}>
                  Quests Completed
                </Text>
                <Text style={[styles.subTitle, { color: textColor }]}>
                  {profile?.stats?.questsCompleted ?? 0}
                </Text>
              </Box>
              <Box
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {renderIcon("award", textColor, 48)}
                <Text style={{ color: textColor, marginTop: 12 }}>
                  Achievements
                </Text>
                <Text style={[styles.subTitle, { color: textColor }]}>
                  {unlockedCount}
                </Text>
              </Box>
              <ProfileTabs
                textColor={textColor}
                back1={isDarkmode ? "#27272a" : "#f5f5f4"}
                back2={isDarkmode ? "black" : "white"}
              />
            </View>
          </View>
        </FadeIn>
      </ScrollView>
    </LinearGradient>
  );
};

const ProfileTabs = ({ textColor, back1, back2 }) => {
  const [sel, setSel] = useState(0);

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View
        style={{
          width: "90%",
          height: 35,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: back1,
          marginTop: 10,
          paddingRight: 5,
          paddingLeft: 5,
          borderRadius: 5,
        }}
      >
        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: sel == 0 ? back2 : "transparent", width: "32%" },
          ]}
          onPress={() => setSel(0)}
        >
          {renderIcon("award", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>
            Achievements
          </Text>
        </Pressable>

        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: sel == 1 ? back2 : "transparent", width: "32%" },
          ]}
          onPress={() => setSel(1)}
        >
          {renderIcon("backpack", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Inventory</Text>
        </Pressable>

        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: sel == 2 ? back2 : "transparent", width: "32%" },
          ]}
          onPress={() => setSel(2)}
        >
          {renderIcon("settings-2", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Settings</Text>
        </Pressable>
      </View>
      {sel == 0 && <AchievementsTab />}
      {sel == 1 && <InventoryTab textColor={textColor} />}
      {sel == 2 && <SettingsTab textColor={textColor} back1={back1} />}
    </View>
  );
};

const AchievementsTab = () => {
  const { achievements } = useData();
  return (
    <Box>
      {achievements.map((a) => (
        <View key={a.id} style={{ opacity: a.unlocked ? 1 : 0.35 }}>
          <Achievement title={a.title} descr={a.description} icon={a.icon} />
        </View>
      ))}
    </Box>
  );
};

const InventoryTab = ({ textColor }) => {
  const { theme } = useContext(ThemeContext);
  const { inventory, useItem, equipItem } = useData();
  const isDarkmode = theme === "dark";
  const subColor = isDarkmode ? "#a3a3a3" : "#737373";

  if (inventory.length === 0) {
    return <Box>Your inventory is empty. Complete quests to earn items!</Box>;
  }

  return (
    <Box style={{ flexDirection: "column", alignItems: "stretch" }}>
      {inventory.map((entry) => (
        <View
          key={entry.item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderColor: isDarkmode ? "#27272a" : "#e7e5e4",
          }}
        >
          {renderIcon(entry.item.icon, colors.pink, 24)}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ color: textColor, fontSize: 14, fontWeight: "bold" }}>
              {entry.item.name}
              {entry.quantity > 1 ? ` x${entry.quantity}` : ""}
            </Text>
            <Text style={{ color: subColor, fontSize: 12 }}>
              {entry.item.description}
            </Text>
          </View>
          {entry.item.type === "consumable" ? (
            <Pressable
              onPress={() => useItem(entry.item.id)}
              style={{
                borderWidth: 1,
                borderColor: colors.purple,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text style={{ color: colors.purple, fontSize: 13 }}>Use</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => !entry.equipped && equipItem(entry.item.id)}
              style={{
                borderWidth: 1,
                borderColor: entry.equipped ? subColor : colors.purple,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  color: entry.equipped ? subColor : colors.purple,
                  fontSize: 13,
                }}
              >
                {entry.equipped ? "Equipped" : "Equip"}
              </Text>
            </Pressable>
          )}
        </View>
      ))}
    </Box>
  );
};

const SettingsTab = ({ textColor, back1 }) => {
  const { theme } = useContext(ThemeContext);
  const {
    settings,
    profile,
    updateProfile,
    switchToServer,
    switchToLocal,
    logout,
  } = useData();
  const isDarkmode = theme === "dark";
  const subColor = isDarkmode ? "#a3a3a3" : "#737373";

  const [name, setName] = useState(profile?.displayName || "");
  const [serverUrl, setServerUrl] = useState(settings?.serverUrl || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const inputStyle = {
    borderWidth: 1,
    borderColor: isDarkmode ? "white" : "black",
    width: "90%",
    height: 40,
    textAlign: "center",
    backgroundColor: back1,
    borderRadius: 10,
    color: textColor,
  };

  const saveName = async () => {
    if (!name.trim()) {
      setError(true);
      setMessage("Name cannot be empty");
      return;
    }
    try {
      await updateProfile({ displayName: name.trim() });
      setError(false);
      setMessage("Saved");
    } catch (e) {
      setError(true);
      setMessage("Could not save");
    }
  };

  const isServer = settings?.mode === "server";

  return (
    <Box style={{ gap: 20, paddingTop: 20, paddingBottom: 20 }}>
      {message != "" && <Message isError={error} message={message} />}
      <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
        <Text style={{ color: textColor, fontWeight: "bold" }}>
          Display Name
        </Text>
        <TextInput
          style={inputStyle}
          value={name}
          onChangeText={setName}
          placeholderTextColor={subColor}
          placeholder="Your name"
        />
        <Pressable onPress={saveName}>
          <Text style={{ color: colors.purple }}>Save</Text>
        </Pressable>
      </View>

      <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
        <Text style={{ color: textColor, fontWeight: "bold" }}>Data Mode</Text>
        <Text style={{ color: subColor, fontSize: 12, textAlign: "center" }}>
          {isServer
            ? `Connected to ${settings.serverUrl} as @${settings.username}`
            : "Local mode: your data is stored on this device."}
        </Text>
        {isServer ? (
          <>
            <Pressable onPress={logout}>
              <Text style={{ color: colors.purple }}>Log out</Text>
            </Pressable>
            <Pressable onPress={switchToLocal}>
              <Text style={{ color: colors.purple }}>Switch to offline mode</Text>
            </Pressable>
          </>
        ) : (
          <>
            <TextInput
              style={inputStyle}
              value={serverUrl}
              onChangeText={setServerUrl}
              autoCapitalize="none"
              keyboardType="url"
              placeholderTextColor={subColor}
              placeholder="Server URL (e.g. http://192.168.1.10:3001)"
            />
            <Pressable onPress={() => switchToServer(serverUrl)}>
              <Text style={{ color: colors.purple }}>Connect to server</Text>
            </Pressable>
          </>
        )}
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            fontStyle: "italic",
            fontSize: 12,
            paddingHorizontal: 20,
          }}
        >
          Data is not migrated when switching between local and server mode.
        </Text>
      </View>
    </Box>
  );
};

const localStyles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    width: "49%",
    height: "80%",
    flexDirection: "row",
    marginVertical: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-Variable",
    fontWeight: "200",
  },
});

export default Profile;
