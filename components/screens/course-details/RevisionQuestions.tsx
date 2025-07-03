// components/screens/course-details/RevisionQuestions.tsx
import FileCard from "@/components/commons/cards/FileCard";
import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import ThemedText from '@/components/commons/typography/ThemedText';
import { useGetCourseRevisionQuestions } from '@/hooks/api/courses';
import React from "react";
import { View } from "react-native";

const RevisionQuestions = ({ courseId }: { courseId: number }) => {
  const { data: revisionQuestions, isLoading, isError, error } = useGetCourseRevisionQuestions(courseId);

  console.log(revisionQuestions)

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError || !revisionQuestions) {
    return <ThemedText>Error: {error?.message || 'Failed to load revision questions'}</ThemedText>;
  }

  if (revisionQuestions.length === 0 && !isLoading) {
    return <ThemedText style={{textAlign: 'center'}}>No revision questions available for this course.</ThemedText>;
  }

  return (
    <View style={{ flex: 1, gap: 24, marginBottom: 20, paddingHorizontal: 20 }}>
      {revisionQuestions.flatMap((content: any) =>
        content.attachments.map((attachment: any, index: number) => (
          <FileCard
            key={`${content.content_id}-${index}`}
            file={{
              url: attachment.url,
              file_type: attachment.file_type,
              size: undefined,
              pages: undefined,
              created_at: attachment.created_at,
            }}
          />
        ))
      )}
    </View>
  );
};

export default RevisionQuestions;