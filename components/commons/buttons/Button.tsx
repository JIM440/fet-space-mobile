import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import ThemedText from "../typography/ThemedText";

type ButtonVariant = "primary" | "regular" | "outlined";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title: string;
  style?: ViewStyle | ViewStyle[];
}

const Button: React.FC<ButtonProps> = ({
  variant = "regular",
  title,
  style,
  onPress,
  disabled,
  ...rest
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const getVariantStyle = (variant: ButtonVariant): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primaryBase,
          borderWidth: 0,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 100,
          width: "100%",
        };
      case "regular":
        return {
          borderWidth: 0,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 100,
          width: "100%",
        };
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.neutralTextPrimary,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 100,
          width: "100%",
        };
      default:
        return styles.regular;
    }
  };

  const buttonStyle = StyleSheet.flatten([
    styles.base,
    getVariantStyle(variant),
    style,
    disabled && { opacity: 0.5 },
  ]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...rest}
    >
      <ThemedText
        variant="body"
        style={{
          color:
            variant === "primary" ? colors.white : colors.neutralTextPrimary,
          fontWeight: 600,
        }}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  regular: {
    backgroundColor: COLORS.light.backgroundSecondary,
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
  },
});

export default Button;
