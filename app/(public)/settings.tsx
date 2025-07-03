import PageContainers from "@/components/commons/containers/PageContainer";
import { OverlaySpinner } from "@/components/commons/loaders/spinners";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useChangePassword, useLogout } from "@/hooks/api/auth";
import { useTheme } from "@/hooks/useThemeColor";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const SettingsScreen: React.FC = () => {
  const { currentTheme, resolvedTheme, setTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { mutate: changePassword, isPending: isChangePasswordPending } =
    useChangePassword();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  // Real-time validation for password matching
  useEffect(() => {
    if (confirmPassword.length > 0) {
      setPasswordMatch(newPassword === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [newPassword, confirmPassword]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: async () => {
        Toast.show({
          type: "success",
          text1: "Logout Successful",
          text2: "You have been signed out",
        });
        router.replace("/login");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Logout Failed",
          text2: error.message || "Unable to sign out",
        });
      },
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "New password and confirm password do not match",
      });
      return;
    }

    changePassword(
      { currentPassword, newPassword, confirmPassword },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Password Changed",
            text2: "Your password has been updated successfully",
          });
          setModalVisible(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setPasswordMatch(null);
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Password Change Failed",
            text2: error.message || "Unable to change password",
          });
        },
      }
    );
  };

  return (
    <PageContainers>
      {/* Overlay Spinner */}
      {(isLogoutPending || isChangePasswordPending) && <OverlaySpinner />}
      {/* Back header */}
      <BackHeader title="Settings" />
      {/* Modal for Change Password */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.modalOverlay,
            { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          ]}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.backgroundMain },
            ]}
          >
            <ThemedText
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Change Password
            </ThemedText>
            <View style={styles.inputContainer}>
              <ThemedText
                style={[styles.label, { color: colors.neutralTextSecondary }]}
              >
                Current Password:
              </ThemedText>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.backgroundNeutral,
                      color: colors.neutralTextSecondary,
                    },
                  ]}
                  placeholder="Enter current password"
                  placeholderTextColor={colors.neutralTextTertiary}
                  secureTextEntry={!showCurrentPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  accessibilityLabel="Current Password"
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <Feather
                    name={showCurrentPassword ? "eye-off" : "eye"}
                    size={16}
                    color={colors.neutralTextSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <ThemedText
                style={[styles.label, { color: colors.neutralTextSecondary }]}
              >
                New Password:
              </ThemedText>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.backgroundNeutral,
                      color: colors.neutralTextSecondary,
                    },
                  ]}
                  placeholder="Enter new password"
                  placeholderTextColor={colors.neutralTextTertiary}
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  accessibilityLabel="New Password"
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Feather
                    name={showNewPassword ? "eye-off" : "eye"}
                    size={16}
                    color={colors.neutralTextSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <ThemedText
                style={[styles.label, { color: colors.neutralTextSecondary }]}
              >
                Confirm New Password:
              </ThemedText>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.backgroundNeutral,
                      color: colors.neutralTextSecondary,
                    },
                  ]}
                  placeholder="Confirm new password"
                  placeholderTextColor={colors.neutralTextTertiary}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  accessibilityLabel="Confirm New Password"
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Feather
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={16}
                    color={colors.neutralTextSecondary}
                  />
                </TouchableOpacity>
              </View>
              {passwordMatch !== null && (
                <ThemedText
                  style={[
                    styles.validationText,
                    { color: passwordMatch ? colors.success : colors.error },
                  ]}
                >
                  {passwordMatch ? "Passwords match" : "Passwords do not match"}
                </ThemedText>
              )}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText style={{ color: colors.neutralTextPrimary }}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={handleChangePassword}
                disabled={isChangePasswordPending}
              >
                <ThemedText style={{ color: colors.primaryBase }}>
                  Submit
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Main Content */}
      <View
        style={[styles.container, { backgroundColor: colors.backgroundMain }]}
      >
        <View style={{ flex: 1, gap: 24 }}>
          <ThemedText
            style={{ color: colors.neutralTextSecondary, fontWeight: "600" }}
          >
            Theme
          </ThemedText>
          <View
            style={[
              styles.card,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.option,
                { borderBottomColor: colors.backgroundNeutral },
              ]}
              onPress={() => setTheme("automatic")}
            >
              <View style={styles.optionContent}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={24}
                  color={colors.neutralTextPrimary}
                  style={styles.icon}
                />
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextPrimary },
                  ]}
                >
                  Automatic
                </ThemedText>
              </View>
              <View
                style={[
                  styles.radio,
                  { borderColor: colors.neutralTextSecondary },
                ]}
              >
                {currentTheme === "automatic" && (
                  <View
                    style={[
                      styles.radioSelected,
                      { backgroundColor: colors.neutralTextSecondary },
                    ]}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                { borderBottomColor: colors.neutralBorder },
              ]}
              onPress={() => setTheme("light")}
            >
              <View style={styles.optionContent}>
                <Entypo
                  name="light-down"
                  size={24}
                  style={styles.icon}
                  color={colors.neutralTextPrimary}
                />
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextPrimary },
                  ]}
                >
                  Light
                </ThemedText>
              </View>
              <View
                style={[
                  styles.radio,
                  { borderColor: colors.neutralTextSecondary },
                ]}
              >
                {currentTheme === "light" && (
                  <View
                    style={[
                      styles.radioSelected,
                      { backgroundColor: colors.neutralTextSecondary },
                    ]}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, { borderBottomColor: "transparent" }]}
              onPress={() => setTheme("dark")}
            >
              <View style={styles.optionContent}>
                <Ionicons
                  name="moon-outline"
                  size={18}
                  color={colors.neutralTextPrimary}
                  style={styles.icon}
                />
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextPrimary },
                  ]}
                >
                  Dark
                </ThemedText>
              </View>
              <View
                style={[
                  styles.radio,
                  { borderColor: colors.neutralTextSecondary },
                ]}
              >
                {currentTheme === "dark" && (
                  <View
                    style={[
                      styles.radioSelected,
                      { backgroundColor: colors.neutralTextSecondary },
                    ]}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {/* Change Password Option */}
          <ThemedText
            style={{ color: colors.neutralTextSecondary, fontWeight: "600" }}
          >
            Account
          </ThemedText>
          <View>
            <TouchableOpacity
              style={{ borderBottomColor: "transparent" }}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.optionContent}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={24}
                  color={colors.neutralTextSecondary}
                  style={styles.icon}
                />
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextSecondary },
                  ]}
                >
                  Change Password
                </ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLogoutPending}
        >
          <ThemedText style={[styles.logoutText, { color: colors.error }]}>
            Sign Out
          </ThemedText>
        </TouchableOpacity>
      </View>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    paddingTop: 0,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  logoutButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  validationText: {
    fontSize: 10,
    marginTop: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
});

export default SettingsScreen;
