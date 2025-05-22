import React, { useEffect, useState } from "react";
import ThemedInput from "./ThemedInput";

interface InputCourseCodeProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onValidChange?: (isValid: boolean) => void;
  placeholder?: string;
}

const InputCourseCode: React.FC<InputCourseCodeProps> = ({
  label,
  value,
  onChangeText,
  onValidChange,
  placeholder = "e.g., ABC 123",
}) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate course code: 3 letters, space, 3 numbers (e.g., "ABC 123")
    const isValidCode = /^[A-Z]{3}\s[0-9]{3}$/.test(value);
    setIsValid(isValidCode);
    onValidChange?.(isValidCode);
  }, [value, onValidChange]);

  return (
    <ThemedInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="characters"
      isValid={isValid}
      errorMessage="Course code must be 3 letters, a space, then 3 numbers (e.g., ABC 123)"
    />
  );
};

export default InputCourseCode;