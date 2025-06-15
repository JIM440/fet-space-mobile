import { login, logout, refreshTokens } from '@/utils/api/auth/index';
import { useMutation } from '@tanstack/react-query';

// Define types
interface LoginInput {
  identifier: string;
  password: string;
  role: 'Student' | 'Teacher' | 'Admin' | 'SuperAdmin';
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: number;
    role: 'Student' | 'Teacher' | 'Admin' | 'SuperAdmin';
    [key: string]: any;
  };
}

// Mutation to login
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: ({ identifier, password, role }) => login(identifier, password, role),
    onSuccess: async (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Error during login:', error);
    },
  });
};

// Mutation to logout
export const useLogout = () => {
  return useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: async () => {
      console.log('Logout successful');
    },
    onError: (error) => {
      console.error('Error during logout:', error);
    },
  });
};

// Mutation to refresh tokens
export const useRefreshTokens = () => {
  return useMutation<{ accessToken: string; refreshToken: string }, Error>({
    mutationFn: refreshTokens,
    onSuccess: (data) => {
      console.log('Token refresh successful:', data);
    },
    onError: (error) => {
      console.error('Error during token refresh:', error);
    },
  });
};
