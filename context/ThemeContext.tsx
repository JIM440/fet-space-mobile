import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'automatic';

interface ThemeContextType {
  currentTheme: Theme;
  resolvedTheme: 'light' | 'dark'; // effective theme in use
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // optional helper
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme() ?? 'light';
  const [currentTheme, setCurrentTheme] = useState<Theme>('automatic');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(systemTheme);

  // Load theme from AsyncStorage or default to automatic
  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'automatic') {
        setCurrentTheme(storedTheme);
      } else {
        setCurrentTheme('automatic');
      }
    };

    loadStoredTheme();
  }, []);

  // Resolve the theme based on current setting and system preference
  useEffect(() => {
    if (currentTheme === 'automatic') {
      setResolvedTheme(systemTheme === 'dark' ? 'dark' : 'light');
    } else {
      setResolvedTheme(currentTheme);
    }
  }, [currentTheme, systemTheme]);

  const setTheme = async (theme: Theme) => {
    setCurrentTheme(theme);
    await AsyncStorage.setItem('theme', theme);
  };

  // Optional: toggle between light → dark → automatic
  const toggleTheme = () => {
    const nextTheme: Theme =
      currentTheme === 'light' ? 'dark' :
      currentTheme === 'dark' ? 'automatic' :
      'light';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
