import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";

interface AddCommentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const AddCommentInput: React.FC<AddCommentInputProps> = ({
  value,
  onChangeText,
  placeholder = "Add comment",
  style,
  disabled = false,
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const inputStyle = StyleSheet.flatten([
    styles.input,
    {
      backgroundColor: colors.backgroundNeutral,
      color: colors.neutralTextSecondary,
    },
    disabled && { backgroundColor: colors.backgroundNeutral, opacity: 0.5 },
    style,
  ]);

  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor={colors.neutralTextSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
  },
  input: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    textAlignVertical: "bottom",
  },
});

export default AddCommentInput;
