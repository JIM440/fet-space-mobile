import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";

interface curriculumProps {
    name: string,
    pdf: string;
}

const CurriculumCard = ({ curriculum }: { curriculum: curriculumProps }) => {
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
        router.push({
          pathname: "/curriculum-viewer" as RelativePathString,
          params: { pdf: curriculum.pdf }
        });
      }}

    >
      <ThemedText variant="h4">
        {curriculum.name}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default CurriculumCard;
