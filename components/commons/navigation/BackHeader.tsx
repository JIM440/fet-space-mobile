import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BackHeaderProps {
  title: string;
}

export const BackHeader: React.FC<BackHeaderProps> = ({ title = "" }) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const handleBack = () => {
    router.back();
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: colors.backgroundMain }}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <MaterialIcons name="arrow-back" size={24} color={colors.neutralTextSecondary} />
        <Text style={{...styles.title, color: colors.neutralTextSecondary}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 400,
  },
});

export default BackHeader;
