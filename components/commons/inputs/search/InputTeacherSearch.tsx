import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedInput from "../ThemedInput";

interface InputTeacherSearchProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onValidChange?: (isValid: boolean) => void;
  onSearch: () => void;
  placeholder?: string;
}

const InputTeacherSearch: React.FC<InputTeacherSearchProps> = ({
  label,
  value,
  onChangeText,
  onValidChange,
  onSearch,
  placeholder = "Enter teacher name",
}) => {
  const [isValid, setIsValid] = useState(false);
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  useEffect(() => {
    // Validate name (min 3 chars)
    const isValidLength = value.trim().length >= 3;
    setIsValid(isValidLength);
    onValidChange?.(isValidLength);
  }, [value, onValidChange]);

  return (
    <View>
      <ThemedInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="search"
        onSubmitEditing={onSearch}
        isValid={isValid}
        errorMessage="Name must be at least 3 characters long"
      />
      <TouchableOpacity style={styles.iconContainer} onPress={onSearch}>
        <Feather
          name="search"
          size={18}
          color={isValid ? colors.neutralTextSecondary : colors.neutralTextTertiary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    right: 12,
    top: 36,
    padding: 4,
  },
});

export default InputTeacherSearch;