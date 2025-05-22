import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { courseProps } from "@/types";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";

const CourseCard = ({ course }: { course: courseProps }) => {
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
        router.push(`/course/${course.id}` as RelativePathString);
      }}
    >
      {/* <View style={{flex: 1}}> */}
      <ThemedText variant="h4">
        {course.courseCode + ": " + course.title}
      </ThemedText>
      <ThemedText variant="caption" numberOfLines={1}>
        {course.instructor}
      </ThemedText>
      {/* </View> */}
      {/* <MoreItemsButton onPress={()=>{alert(course.title)}} /> */}
    </TouchableOpacity>
  );
};

export default CourseCard;
