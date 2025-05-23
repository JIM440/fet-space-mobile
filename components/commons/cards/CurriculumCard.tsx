import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";

interface curriculumProps {
    name: string
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
        // flexDirection: 'row',
        // alignItems: 'flex-start'
      }}
      onPress={() => {
        // router.push(`/curriculum/${curriculum.id}` as RelativePathString);
      }}
    >
      {/* <View style={{flex: 1}}> */}
      <ThemedText variant="h4">
        {curriculum.name}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default CurriculumCard;
