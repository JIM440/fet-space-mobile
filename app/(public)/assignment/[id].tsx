import AttachFileBtn from "@/components/commons/buttons/AttachFileBtn";
import Button from "@/components/commons/buttons/Button";
import FileCard from "@/components/commons/cards/FileCard";
import PageContainers from "@/components/commons/containers/PageContainer";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { api } from "@/constants/appBaseUrl";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { fileProps } from "@/types";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

interface Assignment {
  id: string;
  title: string;
  description?: string;
  files?: fileProps[];
  dueDate?: string;
}

interface SubmissionData {
  assignmentId: string;
  attachments: { url: string; file_type: string }[];
}

const AssignmentDetails: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<DocumentPicker.DocumentResult[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Get assignment ID from route params
  const { id: assignmentId } = useLocalSearchParams<{ id: string }>();

  // Fetch assignment details
  const {
    data: assignment,
    isLoading,
    error,
  } = useQuery<Assignment, Error>({
    queryKey: ["assignment", assignmentId],
    queryFn: async () => {
      const response = await api.get(
        `/student/assignments/${assignmentId}/details`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for submitting assignment
  const mutation = useMutation<unknown, Error, SubmissionData>({
    mutationFn: async (data) => {
      const response = await api.post(
        `/student/assignments/${data.assignmentId}/submit`,
        {
          attachments: data.attachments,
          assignmentId,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignment", assignmentId] });
      Alert.alert("Success", "Assignment submitted successfully!");
      setFiles([]);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  // Allowed file types
  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "video/mp4",
    "video/quicktime",
  ];

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: allowedFileTypes,
        multiple: true,
      });

      if (result.type === "cancel") {
        return;
      }

      const invalidFiles = result.assets.filter(
        (file) => !allowedFileTypes.includes(file.mimeType || "")
      );

      if (invalidFiles.length > 0) {
        setUploadError(
          "Please upload files in PDF, DOCX, Image, PPT, or Video format."
        );
        setFiles([]);
      } else {
        setUploadError(null);
        setFiles(result.assets);
      }
    } catch (err) {
      setUploadError("Failed to pick files. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!assignment || mutation.isPending || files.length === 0) return;

    setUploadError(null);

    try {
      // Upload files to Cloudinary
      const uploadedAttachments = await Promise.all(
        files.map((file) =>
          uploadToCloudinary(
            {
              uri: file.uri,
              type: file.mimeType,
              name: file.name || "file",
            },
            "assignments"
          )
        )
      ).then((results) =>
        results.map(({ url, file_type }) => ({ url, file_type }))
      );

      // Trigger mutation
      mutation.mutate({
        assignmentId: assignment.id,
        attachments: uploadedAttachments,
      });
    } catch (error) {
      setUploadError("Failed to upload attachments. Please try again.");
      Alert.alert("Error", "Failed to upload attachments. Please try again.");
    }
  };

  if (isLoading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;

  return (
    <PageContainers>
      <BackHeader title={assignment.title || "New Assignment"} />
      <ScrollView style={{ paddingVertical: 16 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
            marginBottom: 20,
          }}
        >
          <View style={[styles.container, { paddingHorizontal: 20 }]}>
            <ThemedText
              variant="h2"
              style={{ marginBottom: 8, color: colors.neutralTextPrimary }}
            >
              {assignment.title}
            </ThemedText>
            {assignment.description && (
              <ThemedText variant="body" style={{ marginBottom: 16 }}>
                {assignment.description}
              </ThemedText>
            )}
            {assignment.files && assignment.files.length > 0 && (
              <View style={{ marginBottom: 16, gap: 8 }}>
                <ThemedText
                  variant="body"
                  style={{ color: colors.neutralTextSecondary }}
                >
                  Attached Files:
                </ThemedText>
                {assignment.files.map((file, index) => (
                  <FileCard key={index} file={file} />
                ))}
              </View>
            )}
            <AttachFileBtn
              title="Upload Assignment"
              onPress={handleFilePick}
              accessibilityLabel="Upload assignment files"
            />
            {files.length > 0 && (
              <View style={{ marginTop: 8, gap: 4 }}>
                {files.map((file, index) => (
                  <ThemedText
                    key={index}
                    style={{ color: colors.neutralTextSecondary }}
                  >
                    {file.name}
                  </ThemedText>
                ))}
              </View>
            )}
            {uploadError && (
              <ThemedText style={{ color: colors.error, marginTop: 8 }}>
                {uploadError}
              </ThemedText>
            )}
            <Button
              title={mutation.isPending ? "Submitting..." : "Submit Assignment"}
              variant="primary"
              onPress={handleSubmit}
              disabled={
                mutation.isPending || !!uploadError || files.length === 0
              }
              accessibilityLabel="Submit assignment"
            />
          </View>
        </View>
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
});

export default AssignmentDetails;
