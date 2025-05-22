import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

interface MoreItemsButtonProps {
  onPress: () => void;
}

const MoreItemsButton: React.FC<MoreItemsButtonProps> = ({ onPress }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <Pressable
      style={{ padding: 10, paddingVertical: 4, borderRadius: 16 }}
      onPress={onPress}
    >
      <FontAwesome6
        name="ellipsis-vertical"
        size={18}
        color={colors.neutralTextSecondary}
      />
    </Pressable>
  );
};

export default MoreItemsButton;
