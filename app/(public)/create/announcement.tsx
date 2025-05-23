import AttachFileBtn from "@/components/commons/buttons/AttachFileBtn";
import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import InputDescription from "@/components/commons/inputs/InputDescription";
import InputTitle from "@/components/commons/inputs/InputTitle";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const AddCourseAnnouncement = () => {
  const { width, height } = Dimensions.get("screen");
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<{ name: string; type: string }[]>([]);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const handleFileUpload = () => {
    // Simulate file upload
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
      <BackHeader title="Create Announcement" />
      <ScrollView contentContainerStyle={{ width: "100%", paddingHorizontal: 20,marginTop: 30 }}>
        <InputTitle
          label="Title (Optional)"
          value={title}
          onChangeText={setTitle}
          onValidChange={setIsTitleValid}
          placeholder="Enter announcement title"
        />
        <InputDescription
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          onValidChange={setIsDescriptionValid}
          placeholder="Enter announcement description"
        />
        <AttachFileBtn title="Attach Files" onPress={handleFileUpload} />
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
          title="Create Announcement"
          variant="primary"
          onPress={handleSubmit}
          style={{ marginTop: 40 }}
        />
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: 80,
  },
});

export default AddCourseAnnouncement;
