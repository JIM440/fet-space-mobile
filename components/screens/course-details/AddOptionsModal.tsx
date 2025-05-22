import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface AddOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  courseId?: string;
}

const options = [
  "announcement",
  "poll",
  "content",
  "assignment",
  "teacher",
  "student",
];

const AddOptionsModal: React.FC<AddOptionsModalProps> = ({
  visible,
  onClose,
  courseId,
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View
          style={[
            styles.modalView,
            { backgroundColor: colors.backgroundSecondary },
          ]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                {
                  borderBottomColor:
                    options.length === index - 1
                      ? "transparent"
                      : colors.neutralBorder,
                },
                // { backgroundColor: colors.backgroundNeutral },
              ]}
              onPress={() => {
                router.push({
                  pathname: `/create/${option}` as RelativePathString,
                  params: { courseId },
                });
                onClose();
              }}
            >
              <ThemedText
                variant="body"
                style={{ color: colors.neutralTextSecondary }}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 0,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  optionButton: {
    padding: 16,
    paddingVertical: 20,
    // borderRadius: 10,
    // marginVertical: 5,
    width: "100%",
    // alignItems: "center",
    borderBottomWidth: 1,
  },
});

export default AddOptionsModal;
