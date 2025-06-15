import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { USER_KEY } from "../constants";

interface User {
  id: string;
  name: string;
  role: string;
  // Add other user properties as needed
}

interface AuthContextType {
  role: string | null;
  user: any;
}

export const AuthContext = createContext<AuthContextType>({
  role: null,
  user: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userData = await SecureStore.getItemAsync(USER_KEY);
        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
          setRole(parsedUser.role);
        }
      } catch (error) {
        console.error("Error loading auth state from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
