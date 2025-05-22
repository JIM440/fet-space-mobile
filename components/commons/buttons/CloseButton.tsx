import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CloseButtonProps {
  onPress: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <TouchableOpacity
      style={[
        styles.closeButton,
        { backgroundColor: colors.backgroundNeutral },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="window-close"
        size={24}
        color={colors.neutralTextSecondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 4,
    paddingHorizontal: 6,
    borderRadius: 100,
  },
});

export default CloseButton;