import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type TextVariant = "h2" | "h3" | "h4" | "body" | "small" | "caption";

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  multiline?: boolean;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  style,
  numberOfLines,
  multiline = false,
  children,
  ...rest
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const getVariantStyle = (variant: TextVariant): TextStyle => {
    switch (variant) {
      case "h2":
        return {
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 28,
          // letterSpacing: -0.2,
        };
      case "h3":
        return {
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 24,
          letterSpacing: -0.1,
        };
      case "h4":
        return {
          fontSize: 15,
          fontWeight: "600",
          lineHeight: 20,
          letterSpacing: 0,
        };
      case "body":
        return {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 20,
          letterSpacing: 0,
        };
      case "small":
        return {
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 18,
          letterSpacing: 0,
          color: colors.neutralTextTertiary,
        };
      case "caption":
        return {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 16,
          letterSpacing: 0.1,
          color: colors.neutralTextTertiary,
        };
      default:
        return styles.body;
    }
  };

  const textStyle = StyleSheet.flatten([
    { color: colors.neutralTextSecondary },
    getVariantStyle(variant),
    // { color: colors.neutralTextSecondary, fontFamily: "OpenSans-Regular" },
    style,
    multiline && { textAlign: "left" },
  ]);

  return (
    <Text
      style={textStyle}
      numberOfLines={multiline ? undefined : numberOfLines}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0,
  },
});

export default ThemedText;
