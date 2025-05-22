import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LocalSvg } from "react-native-svg/css";

interface FloatingAddCourseBtnProps {
  onPress: () => void;
}

const FloatingAddCourseBtn: React.FC<FloatingAddCourseBtnProps> = ({ onPress }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.primaryBase },
      ]}
      onPress={onPress}
    >
      <LocalSvg asset={require('@/assets/icons/add_course.svg')} height={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FloatingAddCourseBtn;