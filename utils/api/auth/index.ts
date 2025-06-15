import { ACCESS_TOKEN_KEY, BASE_URL, REFRESH_TOKEN_KEY } from '@/constants/index';
import { getTokenFromStorage, removeTokenFromStorage, removeUserFromStorage, setTokenInStorage, setUserInStorage } from '@/utils/api/auth/tokens/tokenStorage';
import axios from 'axios';

export const login = async (identifier: string, password: string, role: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { identifier, password, role });
    const { accessToken, refreshToken, user } = response.data;
    await setTokenInStorage(ACCESS_TOKEN_KEY, accessToken.replace('Bearer ', ''));
    await setTokenInStorage(REFRESH_TOKEN_KEY, refreshToken.replace('Bearer ', ''));
    await setUserInStorage(user);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    await removeTokenFromStorage(ACCESS_TOKEN_KEY);
    await removeTokenFromStorage(REFRESH_TOKEN_KEY);
    await removeUserFromStorage();
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const refreshTokens = async () => {
    try {
        const refreshToken = await getTokenFromStorage(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        console.log('Refreshing tokens');
        const response = await axios.post(
            `${BASE_URL}/auth/refresh`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        await setTokenInStorage(ACCESS_TOKEN_KEY, newAccessToken.replace('Bearer ', ''));
        await setTokenInStorage(REFRESH_TOKEN_KEY, newRefreshToken.replace('Bearer ', ''));
        return response.data;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

const checkIfLoggedIn = async () => {
  const accessToken = await getTokenFromStorage(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return false;
  }
  return true;
};

export { checkIfLoggedIn };
