import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PageContainers from "@/components/commons/containers/PageContainer";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const { currentTheme, resolvedTheme, setTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const handleLogout = () => {
    console.log("Logout pressed");
  };

  return (
    <PageContainers>
      {/* back header */}
      <BackHeader title="Settings" />
      {/* theme switcher */}
      <View
        style={[styles.container, { backgroundColor: colors.backgroundMain }]}
      >
        <View style={{ flex: 1, gap: 24 }}>
          <ThemedText
            style={{ color: colors.neutralTextSecondary, fontWeight: 600 }}
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
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextPrimary },
                  ]}
                >
                  Automatic
                </Text>
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
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextPrimary },
                  ]}
                >
                  Light
                </Text>
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
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.neutralTextPrimary },
                  ]}
                >
                  Dark
                </Text>
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
        </View>
        {/* logout button */}
        <TouchableOpacity style={[styles.logoutButton]} onPress={handleLogout}>
          <Text style={{ ...styles.logoutText, color: colors.error }}>
            Sign Out
          </Text>
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
    // flex: 1,
    // height: 100,
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
  note: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },
  logoutButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
