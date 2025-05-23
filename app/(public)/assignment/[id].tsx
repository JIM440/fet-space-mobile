import AttachFileBtn from "@/components/commons/buttons/AttachFileBtn";
import FileCard from "@/components/commons/cards/FileCard";
import CommentInput from "@/components/commons/comments/CommentInputRow";
import CommentList from "@/components/commons/comments/CommentsList";
import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { mockComments } from "@/constants/static-data/comments";
import { useTheme } from "@/hooks/useThemeColor";
import { fileProps } from "@/types";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface Assignment {
  id: string;
  title?: string;
  description?: string;
  files?: fileProps[];
  comments?: number;
  dueDate?: string;
}

const mockAssignment: Assignment = {
  id: "assignment-1",
  title: "Homework 1",
  description: "Complete the exercises in Chapter 1.",
  files: [
    { name: "Chapter1.pdf", type: "pdf", pages: 8, size: "900 KB" },
    { name: "Notes.ppt", type: "ppt", pages: 12, size: "1.8 MB" },
  ],
  comments: 2,
};

const AssignmentDetails = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const handleUpload = () => {
    console.log(`Uploading assignment for ${mockAssignment.id}`);
    // Implement file picker or API call here
  };

  return (
    <PageContainers>
      <BackHeader title={mockAssignment.title || "New Assignment"} />
      <ScrollView style={{ paddingVertical: 16 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
            marginBottom: 20,
          }}
        >
          <View style={{ ...styles.container, paddingHorizontal: 20 }}>
            <ThemedText
              variant="h2"
              style={{ marginBottom: 8, color: colors.neutralTextPrimary }}
            >
              {mockAssignment.title || "New Assignment"}
            </ThemedText>
            {mockAssignment.description && (
              <ThemedText variant="body" style={{ marginBottom: 16 }}>
                {mockAssignment.description}
              </ThemedText>
            )}
            {mockAssignment.files && mockAssignment.files.length > 0 && (
              <View style={{ marginBottom: 16, gap: 8 }}>
                <ThemedText
                  variant="body"
                  style={{ color: colors.neutralTextSecondary }}
                >
                  Attached Files:
                </ThemedText>
                {mockAssignment.files.map((file, index) => (
                  <FileCard key={index} file={file} />
                ))}
              </View>
            )}
            <AttachFileBtn
              title="Upload Assignment
"
              onPress={handleUpload}
            />
            <ThemedText
              variant="small"
              style={{
                color: colors.neutralTextTertiary,
                marginVertical: 16,
                textAlign: "right",
              }}
            >
              {mockAssignment.comments || 0} comments
            </ThemedText>
          </View>
        </View>
        <CommentList comments={mockComments} />
      </ScrollView>
      <CommentInput type_id={mockAssignment.id} type="assignment" />
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
});

export default AssignmentDetails;
