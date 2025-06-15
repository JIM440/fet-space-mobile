import { COLORS } from "@/constants/colors";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { useTheme } from "../../../hooks/useThemeColor";
import PageContainers from "../containers/PageContainer";
import { BackHeader } from "../navigation/BackHeader";

interface SpinnerProps {
  size?: "small" | "large";
  color?: string;
}

export const OverlaySpinner: React.FC<SpinnerProps> = ({ color }) => {
  const { resolvedTheme } = useTheme();
  const defaultColor =
    resolvedTheme === "light"
      ? COLORS.light.primaryBase
      : COLORS.dark.primaryBase;

  return (
    <Modal animationType="fade" transparent>
      <View style={styles.overlay}>
        <ActivityIndicator size={56} color={color || defaultColor} />
      </View>
    </Modal>
  );
};

export const InlineSpinner: React.FC<SpinnerProps> = ({ color }) => {
  const { resolvedTheme } = useTheme();
  const defaultColor =
    resolvedTheme === "light"
      ? COLORS.light.primaryBase
      : COLORS.dark.primaryBase;
  return <ActivityIndicator size={48} color={color || defaultColor} />;
};

export const FullPageSpinner: React.FC<SpinnerProps> = ({ color }) => {
  const { resolvedTheme } = useTheme();
  const defaultColor =
    resolvedTheme === "light"
      ? COLORS.light.primaryBase
      : COLORS.dark.primaryBase;

  return (
    <PageContainers>
      <BackHeader title="" />
      <View style={styles.fullPage}>
        <ActivityIndicator
          size={48}
          color={color || defaultColor}
          style={{ marginTop: -40 }}
        />
      </View>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  fullPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
