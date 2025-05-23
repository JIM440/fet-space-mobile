import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";

interface AttachFileBtnProps {
  onPress: () => void;
  title: string
}

const AttachFileBtn: React.FC<AttachFileBtnProps> = ({ onPress, title }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        paddingVertical: 16,
      }}
      onPress={onPress}
    >
      <ThemedText>{title}</ThemedText>
      <Feather name="upload" size={18} color={colors.neutralTextTertiary} />
    </TouchableOpacity>
  );
};

export default AttachFileBtn;
