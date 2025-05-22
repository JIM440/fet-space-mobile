import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageContainersProps {
  children: React.ReactNode;
}

const PageContainers: React.FC<PageContainersProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      <StatusBar
        barStyle={resolvedTheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={resolvedTheme === "light" ? "#fff" : "#000"}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default PageContainers;
