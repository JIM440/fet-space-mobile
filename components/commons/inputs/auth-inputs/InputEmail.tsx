import { validateEmail } from "@/utils/validations/inputValidation";
import React, { useEffect, useState } from "react";
import ThemedInput from "../ThemedInput";

interface InputEmailProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onValidChange?: (isValid: boolean) => void;
  placeholder?: string;
}

const InputEmail: React.FC<InputEmailProps> = ({
  label,
  value,
  onChangeText,
  onValidChange,
  placeholder = "Enter your email",
}) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = validateEmail(value);
    setIsValid(valid);
    onValidChange?.(valid);
  }, [value, onValidChange]);

  return (
    <ThemedInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="email-address"
      autoCapitalize="none"
      isValid={isValid}
      errorMessage="Please enter a valid email address"
    />
  );
};

export default InputEmail;
