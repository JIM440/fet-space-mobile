import Button from "@/components/commons/buttons/Button";
import ThemedInput from "@/components/commons/inputs/ThemedInput";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Switch, View } from "react-native";

const AddPollAnnouncement = () => {
  const { width, height } = Dimensions.get("screen");
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [files, setFiles] = useState<{ name: string; type: string }[]>([]);
  const [isQuestionValid, setIsQuestionValid] = useState(false);

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

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., API call)
    router.back();
  };

  const isPollValid = () => {
    return (
      question.trim().length > 0 &&
      options.every((opt) => opt.trim().length > 0) &&
      options.length >= 2
    );
  };

  return (
    <View
      style={{
        ...styles.pageView,
        width,
        height,
        backgroundColor: colors.backgroundMain,
      }}
    >
      <BackHeader title="Create Poll" />
      <ScrollView style={{ width: "100%" }}>
        <ThemedInput
          label="Question"
          value={question}
          onChangeText={setQuestion}
          placeholder="Enter poll question"
          isValid={isQuestionValid}
          onValidChange={setIsQuestionValid}
          errorMessage="Question cannot be empty"
        />
        {options.map((option, index) => (
          <ThemedInput
            key={index}
            label={`Option ${index + 1}`}
            value={option}
            onChangeText={(text) => handleOptionChange(index, text)}
            placeholder={`Enter option ${index + 1}`}
            isValid={option.trim().length > 0}
            errorMessage="Option cannot be empty"
            style={{ marginBottom: 8 }}
          />
        ))}
        <Button
          title="Add Option"
          variant="primary"
          onPress={handleAddOption}
          style={{ marginBottom: 16 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <ThemedText
            variant="body"
            style={{ color: colors.neutralTextSecondary, marginRight: 10 }}
          >
            Allow multiple answers
          </ThemedText>
          <Switch
            value={allowMultiple}
            onValueChange={setAllowMultiple}
            trackColor={{ false: colors.neutralBorder, true: colors.primaryBase }}
            thumbColor={colors.neutralTextPrimary}
          />
        </View>
        <Button
          title="Upload File"
          variant="primary"
          onPress={handleFileUpload}
          style={{ marginBottom: 16 }}
        />
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
          title="Create Poll"
          variant="primary"
          onPress={handleSubmit}
          disabled={!isPollValid()}
          style={{ marginTop: 40 }}
        />
      </ScrollView>
    </View>
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

export default AddPollAnnouncement;
