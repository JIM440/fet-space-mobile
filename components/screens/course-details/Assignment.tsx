// components/screens/course-details/Assignments.tsx
import AssignmentCard from "@/components/commons/cards/AssignmentCard";
import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import ThemedText from '@/components/commons/typography/ThemedText';
import { useGetCourseAssignments } from '@/hooks/api/courses';
import React from "react";
import { View } from "react-native";

const Assignments = ({ courseId }: { courseId: number }) => {
  const { data: assignments, isLoading, isError, error } = useGetCourseAssignments(courseId);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <ThemedText>Error: {error?.message || 'Failed to load assignments'}</ThemedText>;
  }

  if (!assignments || assignments.length === 0) {
    return <ThemedText style={{textAlign: 'center'}}>No assignments posted for this course!</ThemedText>;
  }

  return (
    <View style={{ paddingHorizontal: 20 }}>
      {assignments.map((assignment: any, index: number) => (
        <AssignmentCard key={index} assignment={assignment} />
      ))}
    </View>
  );
};

export default Assignments;