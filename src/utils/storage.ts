import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStorageShape } from "../types/models";

const STORAGE_KEY = "mindfulness-com-leticia-storage";

export async function loadAppState(): Promise<AppStorageShape> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        profile: null,
        checkIns: [],
        sessions: [],
        recommendations: [],
      };
    }

    return JSON.parse(raw) as AppStorageShape;
  } catch {
    return {
      profile: null,
      checkIns: [],
      sessions: [],
      recommendations: [],
    };
  }
}

export async function saveAppState(data: AppStorageShape) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function clearAllStoredData() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
