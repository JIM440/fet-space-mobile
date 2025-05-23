import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedInput from "../ThemedInput";

interface InputStudentSearchProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onValidChange?: (isValid: boolean) => void;
  onSearch: () => void;
  placeholder?: string;
}

const InputStudentSearch: React.FC<InputStudentSearchProps> = ({
  label,
  value,
  onChangeText,
  onValidChange,
  onSearch,
  placeholder = "Enter matricule or name",
}) => {
  const [isValid, setIsValid] = useState(false);
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  useEffect(() => {
    // Validate input (non-empty)
    const valid = value.trim().length > 0;
    setIsValid(valid);
    onValidChange?.(valid);
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
        errorMessage="Enter at least one character to search"
      />
      <TouchableOpacity style={styles.iconContainer} onPress={onSearch}>
        <Feather name="search" size={18} color={colors.neutralTextSecondary} />
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

export default InputStudentSearch;
