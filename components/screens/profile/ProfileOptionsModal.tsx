import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileOptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileOptionsModal: React.FC<ProfileOptionsModalProps> = ({
  visible,
  onClose,
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/edit-profile");
    onClose();
  };

  const handleSettings = () => {
    router.push("/settings");
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.modal,
            { backgroundColor: colors.backgroundSecondary },
          ]}
        >
          <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
            <Feather
              name="edit"
              size={18}
              color={colors.neutralTextSecondary}
            />
            <ThemedText variant="body" style={[styles.optionText]}>
              Edit Profile
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleSettings}>
            <Ionicons
              name="settings-outline"
              size={18}
              color={colors.neutralTextSecondary}
            />
            <ThemedText variant="body" style={[styles.optionText]}>
              Settings
            </ThemedText>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
  },
  modal: {
    margin: 20,
    gap: 2,
    paddingVertical: 8,
    paddingBottom: 12,
    borderRadius: 4,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 150,
    alignSelf: "flex-end",
    marginTop: 100,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    marginLeft: 12,
  },
});

export default ProfileOptionsModal;
