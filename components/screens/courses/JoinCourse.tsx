import Button from "@/components/commons/buttons/Button";
import CloseButton from "@/components/commons/buttons/CloseButton";
import ThemedInput from "@/components/commons/inputs/ThemedInput";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";

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
  const [courseCode, setCourseCode] = useState("");

  const handleClose = () => {
    setCourseCode("");
    onClose();
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
          placeholder="Enter code"
          value={courseCode}
          onChangeText={setCourseCode}
        />
        <Button
          title="Join Course"
          variant="primary"
          disabled={courseCode.length === 0}
          style={{ marginTop: 40 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "red",
    padding: 20,
    alignItems: "center",
    paddingTop: 80,
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
