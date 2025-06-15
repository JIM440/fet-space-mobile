import * as SecureStore from 'expo-secure-store';

export const getTokenFromStorage = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error retrieving ${key} from storage:`, error);
    return null;
  }
};

export const setTokenInStorage = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error storing ${key} in storage:`, error);
    throw error;
  }
};

export const removeTokenFromStorage = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
    throw error;
  }
};

export const setUserInStorage = async (user: any) => {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user in storage:', error);
    throw error;
  }
};

export const getUserFromStorage = async () => {
  try {
    const userData = await SecureStore.getItemAsync('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user from storage:', error);
    return null;
  }
};

export const removeUserFromStorage = async () => {
  try {
    await SecureStore.deleteItemAsync('user');
  } catch (error) {
    console.error('Error removing user from storage:', error);
    throw error;
  }
};