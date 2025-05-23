import AttachFileBtn from "@/components/commons/buttons/AttachFileBtn";
import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import BackHeader from "../../../components/commons/navigation/BackHeader";

const AddContent = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();
  const [files, setFiles] = useState<{ name: string; type: string }[]>([]);

  const handleFileUpload = () => {
    // Simulate file upload (replace with actual file picker)
    const types = [
      "image/png",
      "application/pdf",
      "video/mp4",
      "application/docx",
    ];
    const newFile = {
      name: `file-${files.length + 1}.${
        types[Math.floor(Math.random() * types.length)].split("/")[1]
      }`,
      type: types[Math.floor(Math.random() * types.length)],
    };
    setFiles([...files, newFile]);
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., API call)
    router.back();
  };

  return (
    <PageContainers>
      <BackHeader title="Add Content" />
      <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
        <ThemedText>
          Add study materials or handouts by uploading them here. You can upload
          PDF, Word documents, images, PowerPoint slides, or videos.
        </ThemedText>
        <AttachFileBtn title="Upload File" onPress={handleFileUpload} />
        {files.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              variant="body"
              style={{ color: colors.neutralTextSecondary }}
            >
              Attached Files:
            </ThemedText>
            {files.map((file, index) => (
              <ThemedText
                key={index}
                variant="small"
                style={{ color: colors.neutralTextPrimary }}
              >
                {file.name} ({file.type})
              </ThemedText>
            ))}
          </View>
        )}
        <Button
          title="Upload Content"
          variant="primary"
          onPress={handleSubmit}
          disabled={files.length === 0}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </PageContainers>
  );
};

export default AddContent;
