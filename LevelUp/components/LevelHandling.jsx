import AsyncStorage from "@react-native-async-storage/async-storage";

// Key for storing the level in AsyncStorage
const LEVEL_KEY = "level";

// Function to get the level from AsyncStorage
export const getLevel = async () => {
  try {
    const storedLevel = await AsyncStorage.getItem(LEVEL_KEY);
    return storedLevel ? parseInt(storedLevel, 10) : 1; // Default to 0 if no level is found
  } catch (error) {
    console.error("Failed to fetch level from AsyncStorage:", error);
    return 0; // Return 0 in case of an error
  }
};

// Function to set the level in AsyncStorage
export const setLevel = async (level) => {
  try {
    await AsyncStorage.setItem(LEVEL_KEY, level.toString());
  } catch (error) {
    console.error("Failed to save level to AsyncStorage:", error);
  }
};
