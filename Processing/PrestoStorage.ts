// Handles the storage of data. This class is made so that PrestoAPI.ts can remain the same accross React Native and React Web.
// React native implementation
import AsyncStorage from '@react-native-async-storage/async-storage';
export class PrestoStorage {
    public static async getItem(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    }
    public static async setItem(key: string, value: string): Promise <void> {
        await AsyncStorage.setItem(key, value);
    }

    public static async removeItem(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }
}