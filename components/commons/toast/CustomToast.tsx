import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import ThemedText from "../typography/ThemedText";

interface CustomToastProps extends BaseToastProps {
  type?: "success" | "error" | "info";
}

const CustomToast: React.FC<CustomToastProps> = ({
  type = "info",
  text1,
  text2,
  hide,
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return { borderColor: colors.error };
      case "error":
        return { borderColor: colors.error };
      case "info":
        return { borderColor: colors.error };
      default:
        return { borderColor: colors.error };
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
        getToastStyle(),
      ]}
    >
      <View style={styles.content}>
        {text1 && (
          <ThemedText
            style={[styles.text1, { color: colors.neutralTextPrimary }]}
          >
            {text1}
          </ThemedText>
        )}
        {text2 && <ThemedText style={[styles.text2]}>{text2}</ThemedText>}
      </View>
      <TouchableOpacity onPress={hide} style={styles.closeButton}>
        <Entypo name="cross" size={20} color={colors.neutralTextSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: "500",
  },
  text2: {
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
  },
});

export default CustomToast;
