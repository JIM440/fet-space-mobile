import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { assignmentProps } from "@/types";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../typography/ThemedText";

const AssignmentCard = ({ assignment }: { assignment: assignmentProps }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.neutralBorder,
      }}
      onPress={() => {
        router.push(`/assignment/${assignment.id}` as RelativePathString);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ maxWidth: "80%" }}>
          <ThemedText variant="h4" numberOfLines={1}>
            {assignment.title}
          </ThemedText>
          <ThemedText variant="caption" numberOfLines={1}>
            {assignment.description}
          </ThemedText>
        </View>
        <ThemedText
          variant="caption"
          numberOfLines={1}
          style={{ width: "auto" }}
        >
          {assignment.date}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default AssignmentCard;
