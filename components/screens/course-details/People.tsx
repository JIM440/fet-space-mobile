// components/screens/course-details/People.tsx
import ProfileCard from "@/components/commons/cards/ProfileCard";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import ThemedText from "@/components/commons/typography/ThemedText";
import { useGetCoursePersons } from "@/hooks/api/courses";
import React from "react";
import { StyleSheet, View } from "react-native";

const People = ({ courseId }: { courseId: number }) => {
  const {
    data: persons,
    isLoading,
    isError,
    error,
  } = useGetCoursePersons(courseId);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError || !persons) {
    return (
      <ThemedText>
        Error: {error?.message || "Failed to load people"}
      </ThemedText>
    );
  }

  return (
    <View style={{ ...styles.container }}>
      <ThemedText variant="h3" style={styles.header}>
        Teachers
      </ThemedText>
      {persons.teachers.map((teacher: any) => (
        <ProfileCard key={teacher.id} user={teacher} type="teacher" />
      ))}
      <ThemedText variant="h3" style={{ ...styles.header, marginTop: 30 }}>
        Students
      </ThemedText>
      {persons.students.map((student: any) => (
        <ProfileCard key={student.id} user={student} type="student" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default People;
