import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useThemeColor';
import { validatePassword } from '@/utils/validations/inputValidation';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ThemedInput from '../ThemedInput';

interface InputPasswordProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onValidChange?: (isValid: boolean) => void;
  placeholder?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  label,
  value,
  onChangeText,
  onValidChange,
  placeholder = 'Enter your password',
}) => {
  const [isValid, setIsValid] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const { currentTheme } = useTheme();
  const colors = currentTheme === 'light' ? COLORS.light : COLORS.dark;

  useEffect(() => {
    const valid = validatePassword(value);
    setIsValid(valid);
    onValidChange?.(valid);
  }, [value, onValidChange]);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View>
      <ThemedInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        isValid={isValid}
        errorMessage="Password must be at least 8 characters long"
      />
      <TouchableOpacity style={styles.iconContainer} onPress={toggleSecureEntry}>
        <Feather
          name={isSecure ? 'eye-off' : 'eye'}
          size={16}
          color={colors.neutralTextPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: 36,
    padding: 4,
  },
});

export default InputPassword;