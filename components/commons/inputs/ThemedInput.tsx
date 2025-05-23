import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import ThemedText from "../typography/ThemedText";

interface ThemedInputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  errorMessage?: string;
  isValid?: boolean;
  onValidChange?: (isValid: boolean) => void;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  placeholder,
  style,
  value,
  onChangeText,
  errorMessage,
  isValid = true,
  onValidChange,
  ...rest
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const inputStyle = StyleSheet.flatten([
    styles.input,
    {
      backgroundColor: colors.backgroundNeutral,
      borderColor: isValid
        ? colors.backgroundNeutral
        : value && value.length > 0
        ? colors.error
        : colors.backgroundNeutral,
    },
    style,
  ]);

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  return (
    <View style={{ ...styles.container }}>
      <ThemedText
        variant="body"
        style={{ color: colors.neutralTextSecondary, marginBottom: 6 }}
      >
        {label}:
      </ThemedText>
      <TextInput
        style={{ ...inputStyle, color: colors.neutralTextSecondary }}
        placeholder={placeholder}
        placeholderTextColor={colors.neutralTextSecondary}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {!isValid && errorMessage && value && value.length > 0 && (
        <ThemedText variant="small" style={{ color: colors.error }}>
          {errorMessage}
        </ThemedText>
      )}
      {/* {isValid && value && value.length > 0 && (
        <ThemedText
          variant="small"
          style={{ color: colors.neutralTextTertiary }}
        >
          {" "}
        </ThemedText>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
});

export default ThemedInput;
