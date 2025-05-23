import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

interface AddCommentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  type_id?: string;
  type?: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const AddCommentInput: React.FC<AddCommentInputProps> = ({
  value,
  onChangeText,
  onSubmit,
  type_id,
  type,
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
      {value.trim().length > 0 && (
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primaryBase }]}
          onPress={onSubmit}
          disabled={disabled}
        >
          <Ionicons name="send" size={16} color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    textAlignVertical: "bottom",
  },
  submitButton: {
    marginLeft: 4,
    borderRadius: 20,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddCommentInput;
