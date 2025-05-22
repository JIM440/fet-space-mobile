import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import InputDescription from "@/components/commons/inputs/InputDescription";
import InputTitle from "@/components/commons/inputs/InputTitle";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const AddAssignment = () => {
  const { width, height } = Dimensions.get("screen");
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [files, setFiles] = useState<{ name: string; type: string }[]>([]);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const handleFileUpload = () => {
    // Simulate file upload (replace with actual file picker in production)
    const newFile = { name: `file-${files.length + 1}.pdf`, type: "application/pdf" };
    setFiles([...files, newFile]);
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., API call)
    router.back();
  };

  return (
    <PageContainers    >
      <BackHeader title="Add Assignment" />
      <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
        <InputTitle
          label="Title (Optional)"
          value={title}
          onChangeText={setTitle}
          onValidChange={setIsTitleValid}
          placeholder="Enter assignment title"
        />
        <InputDescription
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          onValidChange={setIsDescriptionValid}
          placeholder="Enter assignment description"
        />
        <ThemedText variant="body" style={{ color: colors.neutralTextSecondary, marginBottom: 4 }}>
          Due Date
        </ThemedText>
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setDueDate(selectedDate || dueDate)}
          style={{ marginBottom: 16 }}
        />
        <Button
          title="Upload File"
          variant="primary"
          onPress={handleFileUpload}
          style={{ marginBottom: 16 }}
        />
        {files.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <ThemedText variant="body" style={{ color: colors.neutralTextSecondary }}>
              Attached Files:
            </ThemedText>
            {files.map((file, index) => (
              <ThemedText key={index} variant="small" style={{ color: colors.neutralTextPrimary }}>
                {file.name} ({file.type})
              </ThemedText>
            ))}
          </View>
        )}
        <Button
          title="Create Assignment"
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

export default AddAssignment;