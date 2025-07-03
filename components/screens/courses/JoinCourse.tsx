import Button from "@/components/commons/buttons/Button";
import CloseButton from "@/components/commons/buttons/CloseButton";
import ThemedInput from "@/components/commons/inputs/ThemedInput";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useJoinCourse } from "@/hooks/api/student"; // Adjust import path as needed
import { useTheme } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  View,
} from "react-native";

interface JoinCourseModalProps {
  visible: boolean;
  onClose: () => void;
}

const JoinCourseModal: React.FC<JoinCourseModalProps> = ({
  visible,
  onClose,
}) => {
  const { width, height } = Dimensions.get("screen");
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate, isPending } = useJoinCourse();

  const handleClose = () => {
    setJoinCode("");
    setError(null);
    setSuccess(null);
    onClose();
  };

  const handleJoinCourse = () => {
    if (joinCode.length === 0) {
      setError("Please enter a join code");
      return;
    }
    setError(null);
    setSuccess(null);
    mutate(joinCode, {
      onSuccess: (data) => {
        setSuccess("Successfully joined the course!");
        setTimeout(handleClose, 2000); // Auto-close after 2 seconds
      },
      onError: (error) => {
        setError(error.message || "Failed to join course");
      },
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View
        style={{
          ...styles.modalView,
          width: width,
          height: height,
          backgroundColor: colors.backgroundMain,
        }}
      >
        <CloseButton onPress={handleClose} />
        <ThemedText variant="h3" style={{ marginBottom: 30 }}>
          Join Course
        </ThemedText>
        <ThemedText style={{ marginBottom: 16 }}>
          Enter the code shared to you by your instructor. Note: This is not the
          same as the course code (e.g. CEF 201).
        </ThemedText>
        <ThemedInput
          label="Code"
          placeholder="Enter code e.g. YERCEF"
          value={joinCode}
          onChangeText={setJoinCode}
          error={error}
        />
        {error && (
          <ThemedText style={{ color: colors.error, marginTop: 8 }}>
            {error}
          </ThemedText>
        )}
        {success && (
          <ThemedText style={{ color: colors.success, marginTop: 8 }}>
            {success}
          </ThemedText>
        )}
        <Button
          title={
            isPending ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              "Join Course"
            )
          }
          variant="primary"
          disabled={joinCode.length === 0 || isPending}
          style={{ marginTop: 20 }}
          onPress={handleJoinCourse}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // Replace with actual background color or remove
    padding: 20,
    paddingBottom: 100,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 4,
    paddingHorizontal: 6,
    borderRadius: 100,
  },
});

export default JoinCourseModal;
