import Button from "@/components/commons/buttons/Button";
import CloseButton from "@/components/commons/buttons/CloseButton";
import InputCourseCode from "@/components/commons/inputs/InputCourseCode";
import InputDescription from "@/components/commons/inputs/InputDescription";
import InputTitle from "@/components/commons/inputs/InputTitle";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  View
} from "react-native";

interface AddCourseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  visible,
  onClose,
}) => {
  const { width, height } = Dimensions.get("screen");
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [courseCode, setCourseCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCourseCodeValid, setIsCourseCodeValid] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  const handleClose = () => {
    setCourseCode("");
    setTitle("");
    setDescription("");
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
          Add Course
        </ThemedText>
        <InputCourseCode
          label="Course Code"
          value={courseCode}
          onChangeText={setCourseCode}
          onValidChange={setIsCourseCodeValid}
        />
        <InputTitle
          label="Title"
          value={title}
          onChangeText={setTitle}
          onValidChange={setIsTitleValid}
          />
        <InputDescription
          label="Description"
          value={description}
          onChangeText={setDescription}
          onValidChange={setIsDescriptionValid}
        />
        <Button
          title="Add Course"
          variant="primary"
          disabled={!(isTitleValid && isCourseCodeValid && isDescriptionValid)}
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

export default AddCourseModal;
